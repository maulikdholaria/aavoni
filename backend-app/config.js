var fs = require('fs');
var parsedConfig;
var config;

parsedConfig = JSON.parse(fs.readFileSync('config.json', 'UTF-8'));
config = parsedConfig[process.env.NODE_ENV];

module.exports = config;