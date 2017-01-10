const path = require('path'),
      fs = require('fs'),
      webpack = require('webpack'),
      defaultSettings = require('./default'),
      baseConfig = require('./base'),
      fileEntryObj = require('./fileEntry'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');
let clientConfig, serverConfig;

clientConfig = Object.assign({}, baseConfig, {
    // devtool:'hidden-source-map',
    cache:false,
    entry: Object.assign({},fileEntryObj,{
        // bundle: './client',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    }),
    module: defaultSettings.getDefaultModules()
})

clientConfig.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: [].concat(
        defaultSettings.additionalPaths,
        [ path.join(__dirname, '../client') ]
    ),
    query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime','add-module-exports']
    }
})

clientConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        comments: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        filename: '[name].[chunkhash:8].js'
    })
    // new ExtractTextPlugin('[name].[contenthash:8].css',{allChunks: true})
)

//多入口的html
for(let key in fileEntryObj){
    clientConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: `../views/build/index.${key}.html`,
            template: './views/tpl/index.tpl.html',
            chunksSortMode: 'none',
            chunks:['vendor',`${key}`]
        })
    )
}

serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {server: './server/server.prod'},
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: defaultSettings.getDefaultModules(),
    resolve: {extensions: ['*', '.js', '.jsx', 'es6', '.json', 'css', 'scss']},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}

serverConfig.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /(node_modules)/,
    query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports']
    }
})

module.exports = [clientConfig, serverConfig]
