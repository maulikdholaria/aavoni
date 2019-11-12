var express = require('express');
var app = express();
const pug = require('pug');
var users_table = require('../tables/users');
var planners_table = require('../tables/planners');
var email = require('../lib/email');
var phone = require('../lib/phone');

const guests =  ['Not Sure' , '0-50', '51-100' , '100-150' , '151-200', '200+'];
const budget =  ['Not Sure' , '$0-$5,000', '$5,000-$10,000' , '$10,000-$15,000',
                 '$15,000-$20,000', '$20,000-$30,000', '$30,000-$40,000', '$40,000-$50,000',
                 '$50,000-$75,000', '$75,000-$100,000', '$100,000-$200,000', '$200,000+'];

var leads = {
  deliver_lead: function(leadInfo) {
    var msg = {
		  from: 'leads@aavoni.com'
		};

	  result = planners_table.get(leadInfo.plannerId);
  	result.then(function(resp){
      
      if(resp.length != 1 ) {
      	console.log("No planner found - " + leadInfo.plannerId);
      	return;
      }

      const plannerInfo = resp[0];

      result = users_table.getUserById(resp[0].userId);
  	  result.then(function(resp){
  	  	if(resp.length != 1 ) {
      	  return;
      	}

        if(resp[0].canReceiveLead != 1) {
          console.log("Not enabled to receive lead - " + resp[0].id);
          return;
        }

        msg.subject = leadInfo.fname + " " + leadInfo.lname + " - Requested on Aavoni";
        const html_file = app.get('views') + '/leads_email.pug';
        
        msg.html = pug.renderFile(html_file, {leadInfo: leadInfo, guests: guests, budget: budget});
        msg.text = "You received a new inquiry" + 
                   "\nName: " + leadInfo.fname + " " + leadInfo.lname +
                   "\nEmail: " + leadInfo.email +
                   "\nPhone: " + leadInfo.phone +
                   "\nDate: " + leadInfo.date +
                   "\nGuests: " + guests[leadInfo.guests] + 
                   "\nBudget: " + budget[leadInfo.budget] + 
                   "\nMessage: " + leadInfo.message;
        
        
        msg.to = plannerInfo.email;
        //msg.to ='test-w9g0s@mail-tester.com';
        
        //console.log(msg);
  	  	email.send(msg);
        phone.send_sms(plannerInfo.phone, msg.text);
  	  });
  	});
  },
  deliver_purchased_lead: function(leadInfo){
    var msg = {
      from: 'leads@aavoni.com'
    };
    msg.subject = leadInfo.fname + " " + leadInfo.lname + "'s wedding info";
    const html_file = app.get('views') + '/lead_purchase_email.pug';
    
    msg.html = pug.renderFile(html_file, {leadInfo: leadInfo, guests: guests, budget: budget});
    msg.text = "Wedding Info" + 
               "\nName: " + leadInfo.fname + " " + leadInfo.lname +
               "\nEmail: " + leadInfo.email +
               "\nPhone: " + leadInfo.phone +
               "\nDate: " + leadInfo.date +
               "\nGuests: " + guests[leadInfo.guests] + 
               "\nBudget: " + budget[leadInfo.budget] + 
               "\nLocation: " + leadInfo.city + ", " + leadInfo.state;
    
    
    msg.to = leadInfo.deliveryEmail;
    //msg.to ='test-w9g0s@mail-tester.com';
    
    //console.log(msg);
    email.send(msg);
    //phone.send_sms(leadInfo.deliveryPhone, msg.text);
  },
  get_pricing: function(leadInfo) {
    console.log(leadInfo);
    if(leadInfo['forCountry'].toLowerCase() == 'us') {
      return {localCurrency: 'usd', localCurrencySymbol: "$",localPrice: 3.00, chargePrice: 300};
    }
    else if(leadInfo['forCountry'].toLowerCase() == 'in') {
      return {localCurrency: 'inr', localCurrencySymbol: "₹", localPrice: 81.00, chargePrice: 100};
    } else {
      return {localCurrency: 'usd', localCurrencySymbol: "$", localPrice: 5.00, chargePrice: 500};
    }
  }
};

module.exports = leads;