var knex = require('../lib/mysql_knex');
var tableName = 'lead_ips';

var lead_ips = {
  create: function(params) {
    const promise = knex(tableName).insert(params);
    return promise;
  },
  getByIP: function(ip) {
    const promise = knex(tableName).where({ip: ip});
    return promise;
  },
  updateByIP: function(ip, params){
  	const promise = knex(tableName).update(params, ['id'])
  					.where('ip', '=', ip);
    return promise;
  }

};

module.exports = lead_ips;