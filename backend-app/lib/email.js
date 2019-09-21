const sgMail = require('@sendgrid/mail');
var config = require('../config');
sgMail.setApiKey(config["SENDGRID_API_KEY"]);

var email = {
  send: function(msg) {
    sgMail.send(msg);
  },
  mask: function(email) {
  	let splitted_email = email.split("@");
	return splitted_email[0].substring(0,3) + "****" +  "@" + splitted_email[1]
  }
};

module.exports = email;