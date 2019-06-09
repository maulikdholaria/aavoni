var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var users_model = require('../models/users');


router.get('/me', function(req, res, next) {
  if(req.session.user == undefined || req.session.user ==null) {
  	res.send({'success': false, 'reason': 'USER_NOT_LOGGED_IN'});
  }
  else {
  	res.send({'success': true, 'data': req.session.user});	
  }
});

router.post('/login', function(req, res, next) {
  result = users_model.get_user_by_email(req.body.email);
  result.then(function(resp){
  	if(resp.length != 1 ) {
  	  res.send({'success': false});
  	}

  	user = resp[0];

  	const secret = 'aavoni-99';
	const entered_pass_hash = crypto.createHmac('sha256', secret)
							  .update(req.body.password)
                   			  .digest('hex');

    if(entered_pass_hash != user.password) {
      res.send({'success': false}); 
    }

    req.session.user = user;
  	res.send({'success': true, 'data': resp[0]});
  });
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.send({'success': true});
});

module.exports = router;
