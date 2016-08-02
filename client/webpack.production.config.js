'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
	  template: __dirname + '/index.html',
	  filename: 'index.html',
	  inject: 'body'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
  },
  postcss: [
    require('autoprefixer')
  ]
};