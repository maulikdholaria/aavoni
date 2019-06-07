var knex = require('knex');
var config = require('../config');

var mysql_knex = knex({
  client: 'mysql',
  connection: config['mysql']
});

module.exports = mysql_knex;