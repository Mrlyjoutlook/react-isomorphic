// Provide custom regenerator runtime and core-js
require('babel-polyfill')

// Javascript require hook
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
})

// Css require hook
require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

// Image require hook
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000
})

const app = require('express')(),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      path = require('path'),
      http = require('http'),

      webpack = require('webpack'),
      devMiddleware = require('webpack-dev-middleware'),
      hotMiddleware = require('webpack-hot-middleware'),
      config = require('../build/webpack.dev.config'),
      port = process.env.port || 3000,
      compiler = webpack(config);

// Webpack hook event to write html file into /server/views due to server render
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

// view engine setup
app.set('views', path.resolve(__dirname, '../views/build'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);  //使用ejs模板引擎渲染html

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(devMiddleware(compiler, {
    stats: {colors: true},
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(hotMiddleware(compiler,{log: console.log}));

app.get('/*',require('./routes/page'));

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
// });

app.set('port', port);
const server = http.createServer(app);
server.listen(port,function () {
    console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
});
