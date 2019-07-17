var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var cookieSession = require('cookie-session')

var app = express();



// view engine setup 模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置cors中间件
app.use(cors({
  "origin": ["http://localhost:8000","http://localhost:5000","http://localhost:8080",],  //允许所有前端域名
  "credentials":true,//允许携带凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders":['Content-Type','Authorization']//被允许的post方式的请求头
})); 


//配置cookie-session
var arr=[];
for(var i=0;i<1000;i++){
  arr[i]=Math.random().toFixed(3)+'sha1';
}
app.use(cookieSession({
  name: 'node_zc',
  keys: arr,
  // maxAge:1000*10
}))

//响应
app.use('/banner', require('./routes/banner.js'));
app.use('/dujia', require('./routes/dujia.js'));
app.use('/news', require('./routes/news.js'));
app.use('/reg', require('./routes/reg.js'));
app.use('/login', require('./routes/login.js'));
app.use('/user', require('./routes/user.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/car', require('./routes/car.js'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
