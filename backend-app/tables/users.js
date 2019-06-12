var knex = require('../lib/mysql_knex');
var tableName = 'users';

var users = {
  create: function(params) {
    const promise = knex(tableName).insert(params);
    return promise.then();
  },
  get_user_for_login: function(email, password) {
    const promise = knex(tableName).where({email: email, password: password}).select('id', 'fname', 'lname', 'email');
    return promise.then();
  },
  get_user_by_email: function(email) {
    const promise = knex(tableName).where({email: email});
    return promise.then();
  }
};

module.exports = users;