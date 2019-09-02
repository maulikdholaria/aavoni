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
      template: __dirname + '/src/index.ejs',
      filename: 'index.html',
      templateParameters: {'segmentApiKey': 'uoI6xOgFnop6uDJczFsrEoshwBrG3V5T',
                           'googleMapsKey': 'AIzaSyCbQ_h-tKmbqPlRkOVu4IYL58zSMUjpDXE'}
    })
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001',
      '/images': 'http://localhost:3001',
      '/site-assets': 'http://localhost:3001'
    },
    hot: true
  }
});