var express = require('express');
var router = express.Router();
var leads_model = require('../models/leads');
var leads_table = require('../tables/leads');
var lead_ips_table = require('../tables/lead_ips');
var planners_clicks_table = require('../tables/planners_clicks');
var search_questions_table = require('../tables/search_questions');

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

  let values = {contact: (req.body.phone != "" && req.body.phone != null) ? req.body.phone : req.body.email,
                email: req.body.email, 
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
                forCountry: req.body.forCountry}
  
  console.log(values);
  result = search_questions_table.create(values);

  result.then(function(resp){
    res.send({success: true, data: {id: resp[0]}});
  }).catch(function(error){
    console.log(error);
    res.send({success: false, reason: 'UNEXPECTED_ERROR'});
  });

  
});

module.exports = router;
