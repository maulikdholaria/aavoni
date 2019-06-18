var express = require('express');
var router = express.Router();
var leads_model = require('../models/leads');
var leads_table = require('../tables/leads');
var lead_ips_table = require('../tables/lead_ips');

router.post('/planner/create', function(req, res, next) {	
  const req_ip = req.ip;
  console.log(req_ip);
  var total_leads = 0;


  result = leads_table.create_planner_lead(req.body);

  result.then(function(leadCreationResp){

  	ip_count_res = lead_ips_table.getByIP(req_ip);
	ip_count_res.then(function(resp){
  	  //console.log(resp);
  	  if(resp.length != 1 ) {
      	ip_create_res = lead_ips_table.create({ip: req_ip, totalLeads: 1});
      	ip_create_res.then();
      } else {
      	total_leads = resp[0].totalLeads;
      	total_leads += 1;
      	ip_update_res = lead_ips_table.updateByIP(req_ip, {totalLeads: total_leads});	
      	ip_update_res.then();
      }

	  if(total_leads < 50) {
	  	leads_model.send_email(req.body);
	  }
	});
  	
  	res.send({success: true, data: {id: leadCreationResp[0]}});

  }).catch(function(error){
  	res.send({success: false, reason: 'UNEXPECTED_ERROR'});
  });

  
});

module.exports = router;