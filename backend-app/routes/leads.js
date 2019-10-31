var express = require('express');
var router = express.Router();
var leads_model = require('../models/leads');
var leads_table = require('../tables/leads');
var lead_ips_table = require('../tables/lead_ips');
var planners_clicks_table = require('../tables/planners_clicks');
var search_questions_table = require('../tables/search_questions');
var planners_search_lead_match_table = require('../tables/planners_search_lead_match');
var photographers_search_lead_match_table = require('../tables/photographers_search_lead_match');
var email_lib = require('../lib/email.js');
var phone_lib = require('../lib/phone.js');
var config = require('../config');
const stripe = require("stripe")(config["STRIPE_SECRET_KEY"]);

router.post('/planner/create', function(req, res, next) {	
  const req_ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var total_leads = 0;


  result = leads_table.create_planner_lead(req.body);

  result.then(function(leadCreationResp){

  	ip_count_res = lead_ips_table.getByIP(req_ip);
  	ip_count_res.then(function(resp){
    	  //console.log(resp);
    	  if(resp.length != 1 ) {
        	ip_create_res = lead_ips_table.create({ip: req_ip, totalLeads: 1});
        	ip_create_res.then(function(resp){});
        } else {
        	total_leads = resp[0].totalLeads;
        	total_leads += 1;
        	ip_update_res = lead_ips_table.updateByIP(req_ip, {totalLeads: total_leads});	
        	ip_update_res.then(function(resp){});
        }

  	  if(total_leads < 50) {
  	  	leads_model.deliver_lead(req.body);
  	  } else {
        console.log("Max limit reached for ip " + req_ip);
      }
  	});
  	
  	res.send({success: true, data: {id: leadCreationResp[0]}});

  }).catch(function(error){
  	res.send({success: false, reason: 'UNEXPECTED_ERROR'});
  });
});

router.post('/planner/create-click', function(req, res, next) { 
  const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.body.ip = clientIp;
  
  result = planners_clicks_table.create_website_click(req.body);

  result.then(function(resp){
    res.send({success: true, data: {id: resp[0]}});
  }).catch(function(error){
    res.send({success: false, reason: 'UNEXPECTED_ERROR'});
  }); 
});


router.post('/search-questions/create', function(req, res, next) { 
  const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.body.ip = clientIp;

  console.log(req.body);

  let values = {email: req.body.email, 
                phone: req.body.phone,
                fname: req.body.fname,
                lname: req.body.lname,
                guests: req.body.guests,
                budget: req.body.budget,
                date: req.body.date,
                planner: (req.body.service_needed.includes("1"))? 1 : 0,
                venue: (req.body.service_needed.includes("2"))? 1 : 0,
                photographer: (req.body.service_needed.includes("3"))? 1 : 0,
                catering: (req.body.service_needed.includes("4"))? 1 : 0,
                makeup: (req.body.service_needed.includes("5"))? 1 : 0,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                lat: req.body.lat,
                lng: req.body.lng,
                forCountry: req.body.forCountry,
                message: req.body.message}
  
  console.log(values);
  result = search_questions_table.create(values);

  result.then(function(resp){
    res.send({success: true, data: {id: resp[0]}});
  }).catch(function(error){
    console.log(error);
    res.send({success: false, reason: 'UNEXPECTED_ERROR'});
  }); 
});

router.get('/planners-search-lead-match/:uuid', function(req, res, next) { 
  let uuid = req.params.uuid;
  let searchQuestionId = 0;
  let matched_search_lead = {};

  result = planners_search_lead_match_table.getByUUID(uuid);
  result.then(function(resp){
    if(resp.length != 1) {
      res.send({success: false, reason: 'ENTITY_NOT_EXSIT'});
      return;
    }
    searchQuestionId = resp[0]['searchQuestionId'];
    matched_search_lead = resp[0];

   return search_questions_table.get(matched_search_lead['searchQuestionId']);
  })
  .then(sq_resp => {
    search_question = sq_resp[0];
    if(search_question.message == null) {
      search_question.message = '';
    }
    if(search_question.lname == null) {
      search_question.lname = '';
    }
    search_question.message = search_question.message.toString('utf8');
    if(matched_search_lead['purchasedAt'] == null || matched_search_lead['purchasedAt'] == "") {
      search_question['email'] = email_lib.mask(search_question['email']);
      search_question['phone'] = phone_lib.mask(search_question['phone']);
      search_question['lname'] = search_question['lname'].substring(0, 3) + "****";
    }

    res.send({success: true, data: {"search_question_match": matched_search_lead, "search_question": search_question}});  
    return;
  })
  .catch(function(error){
    console.log(error);
    res.send({success: false, reason: 'UNEXPECTED_ERROR'});
    return;
  });
});

router.post('/planner/search-lead-purchase', async function(req, res, next) { 
  
  if(process.env.NODE_ENV != 'production') {
    req.body.deliveryEmail = 'rohit@aavoni.com';
    req.body.deliveryPhone = '9494124179';
  }
  
  if(!req.body.hasOwnProperty('leadPrice') || req.body['leadPrice'] <= 2.99 || req.body['leadPrice'] == "" || req.body['leadPrice'] == null) {
    res.send({success: false, errors: ['Unexpcted amt for lead price'], reason: 'UNEXPECTED_ERROR'});
    return;
  }

  req.body.amtToBeCharged = req.body.leadPrice * 100;

  try {
    var stripe_charge_resp = await stripe.charges.create({
        amount: req.body.amtToBeCharged,
        currency: "usd",
        description: "planners_search_lead_match: " + req.body.uuid,
        source: req.body.stripePaymentToken,
        metadata: req.body,
        receipt_email: req.body.deliveryEmail
    });
  } catch (e) {
    //console.log(e);
    res.send({success: false, errors:['Stripe error'], reason: 'UNEXPECTED_ERROR'});
    return;
  }
  
  const purchasedAtISOString = (new Date(Date.now())).toISOString(); 
  const purchasedAt = purchasedAtISOString.substring(0, 10) + ' ' + purchasedAtISOString.substring(11,19);


  if(stripe_charge_resp.hasOwnProperty('paid') && stripe_charge_resp['paid'] === true) {
    fields_to_be_updated = {id: req.body.leadMatchId, 
                            purchasedAt: purchasedAt, 
                            ccConfirmation: stripe_charge_resp.id,
                            amtPaid: req.body.amtToBeCharged,
                            deliveryEmail: req.body.deliveryEmail,
                            deliveryPhone: req.body.deliveryPhone};
    
    planners_search_lead_match_table.edit(fields_to_be_updated)
    .then(function(resp){
      console.log("Updated search_lead_match");
      return search_questions_table.get(req.body.leadId);
    })
    .then(function(sq_resp){
        console.log("Getting search question and delivering lead info");
        search_question = sq_resp[0];
        search_question.deliveryEmail = req.body.deliveryEmail;
        search_question.deliveryPhone = req.body.deliveryPhone;
        leads_model.deliver_purchased_lead(search_question);    
        res.send({success: true, data: {uuid: req.body.uuid, search_question: search_question}});      
        return null;
    }).catch(function(error){
        console.log(error);
        res.send({success: false, errors: ['Unable to update search_lead_match or get search question/deliver lead'],reason: 'UNEXPECTED_ERROR'});
        return null;
    });
  } else {
    res.send({success: false, errors:['Unable to capture cc charge'], reason: 'UNEXPECTED_ERROR'});
  }

});

router.get('/photographers-search-lead-match/:uuid', function(req, res, next) { 
  let uuid = req.params.uuid;
  let searchQuestionId = 0;
  let matched_search_lead = {};

  result = photographers_search_lead_match_table.getByUUID(uuid);
  result.then(function(resp){
    if(resp.length != 1) {
      res.send({success: false, reason: 'ENTITY_NOT_EXSIT'});
      return;
    }
    searchQuestionId = resp[0]['searchQuestionId'];
    matched_search_lead = resp[0];

   return search_questions_table.get(matched_search_lead['searchQuestionId']);
  })
  .then(sq_resp => {
    search_question = sq_resp[0];
    if(search_question.message == null) {
      search_question.message = '';
    }
    if(search_question.lname == null) {
      search_question.lname = '';
    }
    search_question.message = search_question.message.toString('utf8');
    if(matched_search_lead['purchasedAt'] == null || matched_search_lead['purchasedAt'] == "") {
      search_question['email'] = email_lib.mask(search_question['email']);
      search_question['phone'] = phone_lib.mask(search_question['phone']);
      search_question['lname'] = search_question['lname'].substring(0, 3) + "****";
    }

    res.send({success: true, data: {"search_question_match": matched_search_lead, "search_question": search_question}});  
    return;
  })
  .catch(function(error){
    console.log(error);
    res.send({success: false, reason: 'UNEXPECTED_ERROR'});
    return;
  });
});

router.post('/photographer/search-lead-purchase', async function(req, res, next) { 
  
  if(process.env.NODE_ENV != 'production') {
    req.body.deliveryEmail = 'rohit@aavoni.com';
    req.body.deliveryPhone = '9494124179';
  }
  
  if(!req.body.hasOwnProperty('leadPrice') || req.body['leadPrice'] <= 2.99 || req.body['leadPrice'] == "" || req.body['leadPrice'] == null) {
    res.send({success: false, errors: ['Unexpcted amt for lead price'], reason: 'UNEXPECTED_ERROR'});
    return;
  }

  req.body.amtToBeCharged = req.body.leadPrice * 100;

  try {
    var stripe_charge_resp = await stripe.charges.create({
        amount: req.body.amtToBeCharged,
        currency: "usd",
        description: "photographers_search_lead_match: " + req.body.uuid,
        source: req.body.stripePaymentToken,
        metadata: req.body,
        receipt_email: req.body.deliveryEmail
    });
  } catch (e) {
    //console.log(e);
    res.send({success: false, errors:['Stripe error'], reason: 'UNEXPECTED_ERROR'});
    return;
  }
  
  const purchasedAtISOString = (new Date(Date.now())).toISOString(); 
  const purchasedAt = purchasedAtISOString.substring(0, 10) + ' ' + purchasedAtISOString.substring(11,19);


  if(stripe_charge_resp.hasOwnProperty('paid') && stripe_charge_resp['paid'] === true) {
    fields_to_be_updated = {id: req.body.leadMatchId, 
                            purchasedAt: purchasedAt, 
                            ccConfirmation: stripe_charge_resp.id,
                            amtPaid: req.body.amtToBeCharged,
                            deliveryEmail: req.body.deliveryEmail,
                            deliveryPhone: req.body.deliveryPhone};
    
    photographers_search_lead_match_table.edit(fields_to_be_updated)
    .then(function(resp){
      console.log("Updated search_lead_match");
      return search_questions_table.get(req.body.leadId);
    })
    .then(function(sq_resp){
        console.log("Getting search question and delivering lead info");
        search_question = sq_resp[0];
        search_question.deliveryEmail = req.body.deliveryEmail;
        search_question.deliveryPhone = req.body.deliveryPhone;
        leads_model.deliver_purchased_lead(search_question);    
        res.send({success: true, data: {uuid: req.body.uuid, search_question: search_question}});      
        return null;
    }).catch(function(error){
        console.log(error);
        res.send({success: false, errors: ['Unable to update search_lead_match or get search question/deliver lead'],reason: 'UNEXPECTED_ERROR'});
        return null;
    });
  } else {
    res.send({success: false, errors:['Unable to capture cc charge'], reason: 'UNEXPECTED_ERROR'});
  }

});

module.exports = router;
