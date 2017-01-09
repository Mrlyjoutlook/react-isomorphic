'use strict';

const path = require('path'),
      srcPath = path.join(__dirname, '/../client'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

// 目前只针对.css做处理。
function getCssEnvConf(env){
  if(env === 'production'){
    return [
      {
        test: /\.css$/,
        include: path.join(srcPath, 'styles'),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader', query: { modules: true,importLoaders:1,localIdentName:'[name]__[local]__[hash:base64:5]',sourceMaps: true } },
            'postcss-loader'
          ]
        })
      }
    ]
  }else{
    return [
      {
        test: /\.css$/,
        include: path.join(srcPath, 'styles'),
        loaders: [
          {loader:'style-loader'},
          {loader:'css-loader',query: { modules: true,importLoaders:1,localIdentName:'[name]__[local]__[hash:base64:5]',sourceMaps: true }},
          {loader:'postcss-loader'}
        ]
      }
    ]
  }
}

function getDefaultModules() {
  return {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: srcPath,
        enforce: 'pre'  //webpack2 preLoaders配置移植到这里
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
        loaders: [
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'sass-loader',query:{outputStyle:'expanded'}}
        ]
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
        test: /\.(png|jpg|gif|webp|woff|woff2)$/,
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
    ].concat(getCssEnvConf(process.env.NODE_ENV))
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  getDefaultModules: getDefaultModules,
  additionalPaths:[]
};
