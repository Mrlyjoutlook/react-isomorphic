const path = require('path'),
      webpack = require('webpack'),
      fileEntryObj = require('./fileEntry'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ProgressBarPlugin = require('progress-bar-webpack-plugin'),
      defaultSettings = require('./default'),
      baseConfig = require('./base');

 function entryPath(params){
     let obj={};
     for(let key in params){
         obj[key] = [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            'webpack/hot/dev-server',
            path.resolve(__dirname, `../client/index.${key}.js`)
        ]
     }
     return obj;
 }    

let config=Object.assign({}, baseConfig, {
    devtool: 'cheap-module-eval-source-map',//这个工具会帮助开发环境下在Chrome/Firefox中显示源代码文件，其速度快于source-map与eval-source-map
    cache:true,
    entry: Object.assign({},entryPath(fileEntryObj),{
        // dashboard: [
        //     'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        //     'webpack/hot/dev-server',
        //     path.join(__dirname, '../client/index.dashboard')
        // ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    }),
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
    // new HtmlWebpackPlugin({
    //     filename: '../views/dev/index.html',
    //     template: './views/tpl/index.tpl.html'
    // }),
    new ProgressBarPlugin({summary: false})
)

//多入口的html
for(let key in fileEntryObj){
    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: `../views/build/index.${key}.html`,
            template: './views/tpl/index.tpl.html',
            chunksSortMode: 'none',
            chunks:['vendor',`${key}`]
        })
    )
}

module.exports = config;
