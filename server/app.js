'use strict';

// Module dependencies
var express = require('express');
var colors = require('colors');
var http = require('http');
var path = require('path');
var connect = require('connect');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
						  
//var middleware = require('./server/middleware');

// Create server
var app = express();
app.use(bodyParser());

app.use(favicon(__dirname + '/../build/wwwroot/assets/ico/favicon.ico'));

// Configure server
app.set('port', process.env.PORT || 3000);

// Mount statics
app.use(express.static(__dirname + '/../build/wwwroot'));
//app.use(express.static(__dirname + '/../build/wwwroot/assets/vendors'));
//app.use(express.static(__dirname + '/../build/wwwroot/assets/image'));
//app.use(express.static(__dirname + '/../build/wwwroot/assets/css'));
//app.use(express.static(__dirname + '/../build/wwwroot/js'));

app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});


// Route index.html
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '/../build/wwwroot/index.html'));
});

app.get('/login1', function(req, res) {
	  res.sendfile(path.join(__dirname, '/../build/wwwroot/new.html'));
});

app.post('/login2', function(req, res) {
	  //console.log("DDDDDD");
	  //res.sendfile(path.join(__dirname, '/../build/wwwroot/new.html'));
	console.log('email: ' + req.body.email);
	console.log('pwd: ' + req.body.pwd);
	var obj = {};
	obj.loggedIn = true;
	obj.loginMsg = 'You are successfully logged in';
	//res.send(JSON.stringify(obj));
	res.send(obj);
});

//api endpoinds
require('./api/auth')(app);

// Start server
http.createServer(app).listen(app.get('port'), function() {
  console.log(
    'Express server listening on port '.green + app.get('port'),
    '\nPress Ctrl+C to shutdown'.grey
  );
});







