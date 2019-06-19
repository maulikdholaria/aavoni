var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var config = require('../config');
var users_table = require('../tables/users');
const secret = 'aavoni-99';
const stripe = require("stripe")(config["STRIPE_SECRET_KEY"]);

router.get('/me', function(req, res, next) {
  if(req.session.isAuthenticated == undefined || req.session.isAuthenticated == null || req.session.isAuthenticated == false) {
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
  	const userId = resp[0];
   
    /*
      - Creating a stripe customer
    */
    stripe.customers.create({
      description: 'Customer for userId - ' + userId,
      email: req.body.email,
      metadata: {userId: userId}
    }, function(err, customer) {      
      /*
        - Updating stripe customer id in users table
      */
      updateResult = users_table.edit({id: userId, stripeCustomerId: customer.id});
      updateResult.then(function(resp){
        res.send({'success': true, 'data': {'id': parseInt(userId)}});
      }).catch(function(error) {
        res.send({'success': false, errors: ['Unable to create stripe customer'], 'reason': 'UNEXPECTED_ERROR'});
        return;
      });
    });
  }).catch(function(error) {
      res.send({'success': false, errors: ['Unable to create user'], 'reason': 'UNEXPECTED_ERROR'});
  	  return;
  });
});

router.post('/edit', function(req, res, next) {
  if(req.session.isAuthenticated == undefined || req.session.isAuthenticated == null || req.session.isAuthenticated == false) {
    res.send({'success': false, 'reason': 'USER_NOT_LOGGED_IN'});
  }
  else {
    const userId = req.session.user.id; 
    req.body.id = userId;
    updateResult = users_table.edit(req.body);
    updateResult.then(function(resp){
      res.send({'success': true, 'data': {'id': parseInt(userId)}});
    }).catch(function(error) {
      res.send({'success': false, errors: ['Unable to update user'], 'reason': 'UNEXPECTED_ERROR'});
      return;
    });
  }
});

router.post('/edit/stripe-source', function(req, res, next) {
  if(req.session.isAuthenticated == undefined || req.session.isAuthenticated == null || req.session.isAuthenticated == false) {
    res.send({'success': false, 'reason': 'USER_NOT_LOGGED_IN'});
  }
  else {
    const userId = req.session.user.id; 
    
    result = users_table.getUserById(userId);
    result.then(function(resp){
      if(resp.length != 1 ) {
        res.send({'success': false});
        return;
      } 

      const userInfo = resp[0];
      console.log(userInfo);
      console.log(userInfo['stripeCustomerId']);
      console.log(req.body.stripeSourceId);
      stripe.customers.createSource(userInfo['stripeCustomerId'], 
        {source: req.body.stripeSourceId},
        function(err, source) {
          stripe.customers.update(userInfo['stripeCustomerId'], 
            {default_source: req.body.stripeSourceId},
            function(err, customer) {
              res.send({'success': true, 'data': userId});
            });
        });
    });
  }
});

router.post('/login', function(req, res, next) {
  const entered_pass_hash = crypto.createHmac('sha256', secret)
						  .update(req.body.password)
               			  .digest('hex');
  result = users_table.getUserForLogin(req.body.email, entered_pass_hash);
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
