var express = require('express');
var router = express.Router();
var leads_table = require('../tables/leads');

router.post('/planner/create', function(req, res, next) {	
  result = leads_table.create_planner_lead(req.body);
  result.then(function(resp){
  	res.send({'success': true, 'data': {'id': resp[0]}});
  });
});

module.exports = router;