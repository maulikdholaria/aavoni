var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var users_table = require('../tables/users');
const secret = 'aavoni-99';

router.get('/me', function(req, res, next) {
  if(req.session.user == undefined || req.session.user ==null) {
  	res.send({'success': false, 'reason': 'USER_NOT_LOGGED_IN'});
  }
  else {
  	res.send({'success': true, 'data': req.session.user});	
  }
});

router.post('/create', function(req, res, next) {
  if(!req.session.isAdmin) {
  	res.send({'success': false, 'reason': 'USER_UNAUTHORIZED'});
  	return;
  }

  req.body.password = crypto.createHmac('sha256', secret)
						.update(req.body.password)
						.digest('hex');

  result = users_table.create(req.body);
  result.then(function(resp){
  	res.send({'success': true, 'data': {'id': resp[0]}});
  }).catch(function(error) {
      res.send({'success': false, 'reason': 'UNEXPECTED_ERROR'});
  	  return;
  });
});

router.post('/login', function(req, res, next) {
  const entered_pass_hash = crypto.createHmac('sha256', secret)
						  .update(req.body.password)
               			  .digest('hex');
  result = users_table.get_user_for_login(req.body.email, entered_pass_hash);
  result.then(function(resp){
  	if(resp.length != 1 ) {
  	  res.send({'success': false});
  	  return;
  	}

    req.session.user = resp[0];
  	res.send({'success': true, 'data': resp[0]});
  });
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.send({'success': true});
});

module.exports = router;
