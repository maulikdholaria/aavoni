var knex = require('../lib/mysql_knex');

var users = {
  get_user_for_login: function(email, password) {
    const promise = knex('users').where({email: email, password: password}).select('id', 'fname', 'lname', 'email');
    return promise.then();
  },
  get_user_by_email: function(email) {
    const promise = knex('users').where({email: email});
    return promise.then();
  }
};

module.exports = users;