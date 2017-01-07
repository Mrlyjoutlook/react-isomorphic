const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ProgressBarPlugin = require('progress-bar-webpack-plugin'),
      defaultSettings = require('./default');

let config={
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    performance: { hints: false },  // webpack2 log关闭警告
    entry: {
        main: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            'webpack/hot/dev-server',
            path.join(__dirname, '../client/index.js')
            
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module:defaultSettings.getDefaultModules(),
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(), //webpack2 默认内置
        // new webpack.optimize.DedupePlugin(), //webpack2 默认内置
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'common.[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: '../views/dev/index.html',
            template: './views/tpl/index.tpl.html'
        }),
        new ProgressBarPlugin({summary: false})
    ]
    // postcss: function () {
    //     return [
    //         require('autoprefixer')({browsers: ['last 2 versions']}),
    //         // require('postcss-px2rem')({remUnit: 37.5})  //手淘rem适配方案
    //     ];
    // }
}

config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: [].concat(
        defaultSettings.additionalPaths,
        [ path.join(__dirname, '../client') ]
    ),
    query: {
        presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
        plugins: ['transform-runtime', 'add-module-exports']
    }
})

module.exports = config;
