var knex = require('../lib/mysql_knex');

var users = {
  get_user_by_email: function(email) {
    const promise = knex('users').where({email: email});
    return promise.then();
  }
};

module.exports = users;