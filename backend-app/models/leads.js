var express = require('express');
var app = express();
const pug = require('pug');
var users_table = require('../tables/users');
var planners_table = require('../tables/planners');
var email = require('../lib/email');

const guests =  ['Not Sure' , '0-50', '51-100' , '100-150' , '151-200', '200+'];
const budget =  ['Not Sure' , '$0-$5,000', '$5,000-$10,000' , '$10,000-$15,000',
                 '$15,000-$20,000', '$20,000-$30,000', '$30,000-$40,000', '$40,000-$50,000',
                 '$50,000-$75,000', '$75,000-$100,000', '$100,000-$200,000', '$200,000+'];

var leads = {
  send_email: function(leadInfo) {
    var msg = {
		  from: 'leads@aavoni.com'
		};

	console.log(leadInfo.plannerId);
	result = planners_table.get(leadInfo.plannerId);
  	result.then(function(resp){
      if(resp.length != 1 ) {
      	console.log("no planner found - " + leadInfo.plannerId);
      	return;
      }
     

      result = users_table.getUserById(resp[0].userId);
  	  result.then(function(resp){
  	  	if(resp.length != 1 ) {
      	  return;
      	}
      	
        msg.subject = leadInfo.fname + " " + leadInfo.lname + " - Requested on Aavoni";
        const html_file = app.get('views') + '/leads_email.pug';
        
        msg.html = pug.renderFile(html_file, {leadInfo: leadInfo, guests: guests, budget: budget});
        msg.text = leadInfo.fname + " " + leadInfo.lname +
                   "Email: " + leadInfo.email +
                   "Phone: <a href='tel:" + leadInfo.phone + "'>" + leadInfo.phone + " </a>"+
                   "Date: " + leadInfo.date +
                   "Guests: " + guests[leadInfo.guests] + 
                   "Budget: " + budget[leadInfo.budget] + 
                   "Message: " + leadInfo.message;
        
        
        msg.to = resp[0].email;
        //msg.to = 'rndpartnerscorp@gmail.com';
        
        //msg.to ='test-w9g0s@mail-tester.com';
        
        //console.log(msg);
  	  	email.send(msg);
  	  });
  	});
  }
};

module.exports = leads;