var knex = require('../lib/mysql_knex');
var tableName = 'planners_clicks';

var planners_clicks = {
  create_website_click: function(params) {
    const promise = knex(tableName).insert(params);
    return promise.then();
  }
};

module.exports = planners_clicks;