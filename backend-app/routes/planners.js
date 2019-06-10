var express = require('express');
var router = express.Router();
var planners_model = require('../models/planners');
var fs = require('fs');


router.get('/get/:id', function(req, res, next) {	   
  result = planners_model.get(req.params.id);
  result.then(function(resp){
    if(resp.length != 1 ) {
      res.send({'success': false});
      return;
    }
    resp[0].images = ["images/p1.jpg", "images/p2.jpg","images/p3.jpg"];
    resp[0].about = resp[0].about.toString('utf8');
    console.log(resp[0]);
    res.send({'success': true, 'data': resp[0]});
  });
});

router.post('/create', function(req, res, next) {	
  if(!req.session.isAdmin) {
    res.send({'success': false, 'reason': 'USER_UNAUTHORIZED'});
    return;
  }   
  if(req.body.userId == undefined || req.body.userId == null) {
    res.send({'success': false, 'reason': 'UNEXPECTED_ERROR'});
    return;
  }
  result = planners_model.create(req.body);
  result.then(function(resp){
  	res.send({'success': true, 'data': {'id': resp[0]}});
  });
});

router.post('/edit/:id', function(req, res, next) {    
  if(!req.session.isAdmin) {
    res.send({'success': false, 'reason': 'USER_UNAUTHORIZED'});
    return;
  }

  if (isNaN(req.body.id)) {
    res.send({'success': false, 'reason': 'INVALID_REQUEST'});
    return;
  }

  result = planners_model.edit(req.body);
  result.then(function(resp){
    res.send({'success': true, 'data': {'id': parseInt(req.body.id)}});
  });
});

module.exports = router;
