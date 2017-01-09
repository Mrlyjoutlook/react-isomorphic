import 'babel-polyfill';

const express = require('express'),
      // logger = require('morgan'),
      // cookieParser = require('cookie-parser'),
      // bodyParser = require('body-parser'),
      path = require('path'),
      http = require('http'),
      port = process.env.port || 3000;

const app=express();
// view engine setup
app.set('views', path.resolve(__dirname, '../views/prod'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);  //使用ejs模板引擎渲染html

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.get('/*',require('./routes/page'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.set('port', port);
const server = http.createServer(app);
server.listen(port,function () {
    console.log(`\n==> 🌎  Listening on port ${port}. Service has been started.\n`)
});
