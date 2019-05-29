var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req, res, next) {	   
  fs.readFile('resp/searchVenue.json', 'utf8', function(err, contents) {
	res.send(contents);
  });
});

router.get('/more', function(req, res, next) {
  res.send('respond with a resource more');
});


module.exports = router;
