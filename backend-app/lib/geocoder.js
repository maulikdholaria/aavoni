var NodeGeocoder = require('node-geocoder');
var config = require('../config');

var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: config['GOOGLE_API_KEY'], // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

module.exports = geocoder;