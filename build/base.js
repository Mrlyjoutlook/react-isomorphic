const path = require('path'),
      webpack = require('webpack');

module.exports={
    context: path.resolve(__dirname, '..'),
    performance: { hints: false },  // webpack2 log关闭警告
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: process.env.NODE_ENV === 'development' ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: process.env.NODE_ENV === 'development' ? 'chunk.[name].js' : 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', 'es6', '.json', 'css', 'scss']   //import加载扩展名的脚本
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(), //webpack2 默认内置
        // new webpack.optimize.DedupePlugin(), //webpack2 默认内置
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')({browsers: ['last 2 versions']})
                    // require('postcss-px2rem')({remUnit: 37.5})  //手淘rem适配方案
                ]
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}