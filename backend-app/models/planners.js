var knex = require('../lib/mysql_knex');
const tableName = 'planners'

var planners = {
  create: function(params) {
    const promise = knex(tableName).insert(params);
    return promise.then();
  },
  get: function(id) {
    const promise = knex(tableName).where({id: id});
    return promise.then();
  },
  edit: function(params) {
  	const allowed_fields = ['name', 'address', 'city', 'state', 'lat', 'lng', 'fb', 'instagram', 'pinterest', 'website', 'about'];
  	
  	var obj_to_be_updated = {}
  	allowed_fields.map(function(field) {
    	obj_to_be_updated[field] = params[field]
	});

	console.log(obj_to_be_updated);

  	const promise = knex(tableName).update(obj_to_be_updated, ['id'])
  					.where('id', '=', params['id'])
    return promise.then();
  },
  

};

module.exports = planners;