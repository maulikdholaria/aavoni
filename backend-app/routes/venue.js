var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/:id', function(req, res, next) {	   
  var id = req.params.id;
  fs.readFile('resp/venueDetail.json', 'utf8', function(err, contents) {
	var jsonContent = JSON.parse(contents);
	jsonContent.data.id = id;
	res.send(jsonContent);
  });
});

router.get('/more', function(req, res, next) {
  res.send('respond with a resource more');
});


module.exports = router;
