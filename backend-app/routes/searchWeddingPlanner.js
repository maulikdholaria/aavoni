var express = require('express');
var router = express.Router();
var planners_table = require('../tables/planners');
var planner_model = require('../models/planner');
var fs = require('fs');

router.get('/', function(req, res, next) {	   
  result = planners_table.getAll({'marketCity': 'san-francisco'});
  result.then(function(resp){
  	let weddingPlanners = [];
  	let plannerObj;
  	for(var i = 0; i < resp.length; i++) {
  		plannerObj = new planner_model(resp[i]);
  		weddingPlanners.push(plannerObj.getInfo());
  	}
  	res.send({'success': true, 'data': {totalPlanners: weddingPlanners.length, planners: weddingPlanners}});
  });
});

router.get('/more', function(req, res, next) {
  res.send('respond with a resource more');
});


module.exports = router;
