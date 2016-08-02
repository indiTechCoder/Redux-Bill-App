'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'build.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    // es linter
    //loader: 'react-hot!babel'
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },
    //loaders: ['babel-loader', 'eslint-loader']
      // load js 
      { test: /\.less$/, loader: "style!css!autoprefixer!less" },
      // Load SCSS
      { test: /\.scss$/, loader: "style!css!autoprefixer!sass" },
      // Load plain-ol' vanilla CSS
      { test: /\.scss$/, loader: "style!css" }]
  }
};