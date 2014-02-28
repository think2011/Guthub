
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var routes = require('./routes');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 路由
app.get('/recipes', routes.list);
app.get('/recipe/:id', routes.detail);
app.post('/recipe/add', routes.add);
app.post('/recipe/edit/:id', routes.edit);
app.post('/recipe/del/:id', routes.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('正在监听端口： ' + app.get('port'));
});
