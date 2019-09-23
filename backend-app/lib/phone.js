var config = require('../config');
const fromNumber = config["twilio"]["NUMBER"];
const accountSid = config["twilio"]["ACCOUNT_SID"];
const authToken = config["twilio"]["AUTH_TOKEN"];
const client = require('twilio')(accountSid, authToken);

var phone = {
  send_sms: function(toNumber, msg) {

  	client.messages
  	.create({
     	body: msg,
     	from: fromNumber,
     	to: toNumber
   	})
  	.then(message => console.log("Phone sid: " + message.sid))
    .catch(error => console.log(error));
  },
  mask: function(phoneNum) {
  	return phoneNum.substring(0, 5) + "*****";
  }
};

module.exports = phone;  
