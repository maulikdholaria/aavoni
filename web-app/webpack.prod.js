const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.ejs',
      filename: 'index.html',
      templateParameters: {'segmentApiKey': '42CI83ly0QjtNOAOcdYpsOfU71Xjcrrl',
  						   'googleMapsKey': 'AIzaSyAW9D6T9xGlWAUHlbciguD7QFtjvnPbE8g'}
    })
  ],
});