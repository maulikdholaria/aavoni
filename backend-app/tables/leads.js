var knex = require('../lib/mysql_knex');

var leads = {
  create_planner_lead: function(params) {
    const promise = knex('leads_planner').insert(params);
    return promise.then();
  }
};

module.exports = leads;