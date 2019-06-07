var express = require('express');
var router = express.Router();
var leads_model = require('../models/leads');

router.post('/planner/create', function(req, res, next) {	
  result = leads_model.create_planner(req.body);
  result.then(function(resp){
  	res.send({'success': true, 'data': {'id': resp[0]}});
  });
});

module.exports = router;