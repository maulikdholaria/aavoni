const sgMail = require('@sendgrid/mail');
var config = require('../config');
sgMail.setApiKey(config["SENDGRID_API_KEY"]);

var email = {
  send: function(msg) {
  	console.log(msg);
    sgMail.send(msg);
  }
};

module.exports = email;