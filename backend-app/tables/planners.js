var knex = require('../lib/mysql_knex');
const tableName = 'planners';

var planners = {
  create: function(params) {
    const promise = knex(tableName).insert(params);
    return promise;
  },
  get: function(id) {
    const promise = knex(tableName).where({id: id});
    return promise;
  },
  edit: function(params) {
  	const allowed_fields = ['marketCity', 'name', 'address', 'city', 'lat', 'lng', 'fb', 'instagram', 'pinterest', 'website', 'about', 'images'];
  	
  	var obj_to_be_updated = {}
  	allowed_fields.map(function(field) {
    	obj_to_be_updated[field] = params[field]
	  });

  	const promise = knex(tableName).update(obj_to_be_updated, ['id'])
  					.where('id', '=', params['id']);
    return promise;
  },
  appendImage: function(id, imgName) {
  	const query = 'UPDATE ' + tableName + ' SET images = CONCAT(images, "' + imgName + ',") WHERE id = ' + id + ';';
    const promise = knex.raw(query);
    return promise;
  },
  clearImages: function(id) {
  	const promise = knex(tableName).update({'images': ''}, ['id'])
  					.where('id', '=', id);
    return promise;
  },
  getAll: function(whereClause, fields=null) {
  	let promise;
  	if(fields == null) {
  	  promise = knex(tableName).where(whereClause);
  	} else {
  	  promise = knex(tableName).where(whereClause).select(fields);
  	}
    return promise;
  }

};

module.exports = planners;