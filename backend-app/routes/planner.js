var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/:id', function(req, res, next) {	   
  var id = req.params.id;
  fs.readFile('resp/plannerDetail.json', 'utf8', function(err, contents) {
	var jsonContent = JSON.parse(contents);
	jsonContent.data.id = id;
	res.send(jsonContent);
  });
});

module.exports = router;
