var express = require('express');
var router = express.Router();
var planners_model = require('../models/planners');
var geocoder = require('../lib/geocoder');
var config = require('../config');
var path = require('path');
var fs = require('fs');

router.get('/get/:id', function(req, res, next) {	 
  const destDir = config['IMAGE_BASE_DIR'] + '/images/planners/' + req.params.id + '/';  
  result = planners_model.get(req.params.id);
  result.then(function(resp){
    if(resp.length != 1 ) {
      res.send({'success': false});
      return;
    }
    resp[0].about = resp[0].about.toString('utf8');
    resp[0].images = Array();
    
    const files = fs.readdirSync(destDir);
    const imgPath = '/images/planners/' + req.params.id + "/";
    for (var i = 0; i < files.length; i++) {
      resp[0].images.push(imgPath + files[i]);
    }
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

  if (isNaN(req.params.id)) {
    res.send({'success': false, 'reason': 'INVALID_REQUEST'});
    return;
  }

  geocoder.geocode(req.body.address, function(gerr, gres) {
    req.body.city = gres[0].city;
    req.body.lat = gres[0].latitude;
    req.body.lng = gres[0].longitude;
    result = planners_model.edit(req.body);
    result.then(function(resp){
      res.send({'success': true, 'data': {'id': parseInt(req.body.id)}});
    });
    
  });

});

router.post('/upload/images/:id', function(req, res, next) {    
  if(!req.session.isAdmin) {
    res.send({'success': false, 'reason': 'USER_UNAUTHORIZED'});
    return;
  }

  if (isNaN(req.params.id)) {
    res.send({'success': false, 'reason': 'INVALID_REQUEST'});
    return;
  }

  const fileName = req.files.file.name;
  const destDir = config['IMAGE_BASE_DIR'] + '/images/planners/' + req.params.id + '/';
  const destFile = destDir + Date.now() + path.extname(fileName);
  
  if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
  }

  req.files.file.mv(destFile, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send({'success': true});
  });  
});

module.exports = router;
