var knex = require('../lib/mysql_knex');
const tableName = 'planners_search_lead_match';

var planners_search_lead_match = {

  getByUUID: function(uuid) {
    const promise = knex(tableName).where({uuid: uuid});
    return promise;
  },
  edit: function(params) {
  	const allowed_fields = ['purchasedAt', 'ccConfirmation', 'amtPaid', 'deliveryEmail', 'deliveryPhone'];
  	
  	var obj_to_be_updated = {}
  	allowed_fields.map(function(field) {
    	obj_to_be_updated[field] = params[field]
	});

  	const promise = knex(tableName).update(obj_to_be_updated, ['id'])
  					.where('id', '=', params['id']);
    return promise;
  }

};

module.exports = planners_search_lead_match;
