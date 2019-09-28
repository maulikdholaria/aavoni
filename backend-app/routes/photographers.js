var express = require('express');
var router = express.Router();
var photographers_table = require('../tables/photographers');
var photographer_model = require('../models/photographer');
var geocoder = require('../lib/geocoder');
var config = require('../config');
var path = require('path');
var fs = require('fs');

router.get('/get/:id', function(req, res, next) {	 
  result = photographers_table.get(req.params.id);
  result.then(function(resp){
    if(resp.length != 1 ) {
      res.send({'success': false});
      return;
    }

    photographerObj = new photographer_model(resp[0]);
    res.send({'success': true, 'data': photographerObj.getInfo()});
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
  result = photographers_table.create(req.body);
  result.then(function(resp){
  	res.send({'success': true, 'data': {'id': resp[0]}});
  });
});

router.post('/edit/:id', function(req, res, next) {    
  if (isNaN(req.params.id)) {
    res.send({'success': false, 'reason': 'INVALID_REQUEST'});
    return;
  }

  req.body.email = req.body.email.toLowerCase();
  
  const currUserId = req.session.user.id;
  result = photographers_table.get(req.params.id);
  result.then(function(resp){
    if(resp.length != 1 ) {
      res.send({'success': false, 'errors': ['photographer entity does not exist'], 'resp': 'ENTITY_NOT_EXSIT'});
      return;
    }

    const photographer = resp[0];

    if(currUserId != photographer.userId && !req.session.isAdmin) {
      res.send({'success': false, 'reason': 'USER_UNAUTHORIZED'});
      return;
    } 

    return geocoder.geocode(req.body.address);
  }).then(function(gres) {
    req.body.city = gres[0].city;
    req.body.lat = gres[0].latitude;
    req.body.lng = gres[0].longitude;
    return photographers_table.edit(req.body);    
  }).then(function(resp){
    res.send({'success': true, 'data': {'id': parseInt(req.body.id)}});
    return;
  }).catch(function(error) {
    console.log(error);
    res.send({'success': false, 'reason': 'UNEXPECTED_ERROR'});
    return;
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
  const destDir = config['IMAGE_BASE_DIR'] + '/images/photographers/' + req.params.id + '/';
  const destFileName = Date.now() + path.extname(fileName);
  const destFile = destDir + destFileName;
  
  if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
  }

  req.files.file.mv(destFile, function(err) {
    if (err)
      return res.status(500).send(err);

    result = photographers_table.appendImage(req.params.id, destFileName);
    result.then(function(resp){
      res.send({'success': true});
    });
  });  
});

router.get('/clear/images/:id', function(req, res, next) {  
  result = photographers_table.clearImages(req.params.id);
  result.then(function(resp){
    console.log(resp);
    res.send({'success': true});
  });
});

module.exports = router;
