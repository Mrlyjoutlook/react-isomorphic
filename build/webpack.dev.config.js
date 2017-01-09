const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ProgressBarPlugin = require('progress-bar-webpack-plugin'),
      defaultSettings = require('./default'),
      baseConfig = require('./base');

let config=Object.assign({}, baseConfig, {
    devtool: 'cheap-module-eval-source-map',//这个工具会帮助开发环境下在Chrome/Firefox中显示源代码文件，其速度快于source-map与eval-source-map
    cache:true,
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
    module:defaultSettings.getDefaultModules()
})

config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: [].concat(
        defaultSettings.additionalPaths,
        [ path.join(__dirname, '../client') ]
    ),
    query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
        plugins: ['transform-runtime','add-module-exports']
    }
})

config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        filename: 'common.[name].js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: '../views/dev/index.html',
        template: './views/tpl/index.tpl.html'
    }),
    new ProgressBarPlugin({summary: false})
)

module.exports = config;
