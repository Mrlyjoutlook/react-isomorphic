'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

function getDefaultModules() {
  return {
    // preLoaders: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     include: srcPath,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [
      {
        test: /\.css$/,
        loaders:[
          {loader:'style-loader'},
          {loader:'css-loader', query: {modules: true,importLoaders:1,localIdentName:'[name]__[local]__[hash:base64:5]'} },
          // {loader:'postcss-loader'}
        ]
      },
      {
        test: /\.sass$/,
        loaders: [
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'sass-loader',query:{outputStyle:'expanded',indentedSyntax:true}}
        ]
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader!svg-react'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  additionalPaths:[]
};
