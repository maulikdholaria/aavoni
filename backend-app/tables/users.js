var knex = require('../lib/mysql_knex');
var tableName = 'users';

var users = {
  create: function(params) {
    const promise = knex(tableName).insert(params);
    return promise.then();
  },
  getUserForLogin: function(email, password) {
    const promise = knex(tableName).where({email: email, password: password}).select('id', 'fname', 'lname', 'email');
    return promise.then();
  },
  getUserByEmail: function(email) {
    const promise = knex(tableName).where({email: email});
    return promise.then();
  },
  getUserById: function(id) {
    const promise = knex(tableName).where({id: id});
    return promise.then();
  },
  edit: function(params) {
    const allowed_fields = ['password', 'stripeCustomerId', 'stripeSourceId'];
    
    var obj_to_be_updated = {}
    allowed_fields.map(function(field) {
      if(params.hasOwnProperty(field)) {
        obj_to_be_updated[field] = params[field];  
      }
    });

    console.log(obj_to_be_updated);

    const promise = knex(tableName).update(obj_to_be_updated, ['id'])
            .where('id', '=', params['id']);
    return promise;
  },
};

module.exports = users;