var knex = require('../lib/mysql_knex');
const tableName = 'planners_search_lead_match';

var planners_search_lead_match = {

  getByUUID: function(uuid) {
    const promise = knex(tableName).where({uuid: uuid});
    return promise;
  }

};

module.exports = planners_search_lead_match;
