var knex = require('../lib/mysql_knex');
var tableName = 'search_questions';

var search_questions = {
  create: function(params) {
    const promise = knex(tableName).insert(params);
    return promise.then();
  }
};

module.exports = search_questions;