const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      template: __dirname + '/src/index.ejs',
      filename: 'index.html',
      templateParameters: {'segmentApiKey': 'uoI6xOgFnop6uDJczFsrEoshwBrG3V5T',
                           'googleMapsKey': 'AIzaSyAdaD1-vlEvnZqCRChTaoyIyPyVI1fdmQs'}
    })
  ],
  devServer: {
    contentBase: './dist',
    host: 'dev.aavoni.com',
    port: 80,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://dev.aavoni.com:3001',
      '/images': 'http://dev.aavoni.com:3001',
      '/site-assets': 'http://dev.aavoni.com:3001'
    },
    hot: true
  }
});