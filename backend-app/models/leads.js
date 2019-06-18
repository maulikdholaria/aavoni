var users_table = require('../tables/users');
var planners_table = require('../tables/planners');
var email = require('../lib/email');

var leads = {
  send_email: function(leadInfo) {
    var msg = {
		  from: 'noreply@aavoni.com',
		  subject: 'Sending with Twilio SendGrid is Fun',
		  text: 'and easy to do anywhere, even with Node.js',
		  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
      	
      	msg.to = resp[0].email;
  	  	email.send(msg);
  	  });
  	});
  }
};

module.exports = leads;