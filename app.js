'use strict';

// Module dependencies
var express     = require('express'),
    app         = express(),
    http        = require('http'),
    fs 			= require('fs'),
   // cookie      = require("cookie"),
    server      = http.createServer(app),
   // io          = require('./server/socket/io')(server),
    io          = require("socket.io").listen(server),
    path        = require('path'),
    favicon     = require('serve-favicon'),
    bodyParser  = require('body-parser'),
    session     = require("express-session"),
    cookieParser= require("cookie-parser"),
    events 		= require('events'),
    colors      = require('colors'),
    mongoose    = require('mongoose'),
    mongo = require("./server/mongodb/db")(mongoose);
   

var socketioJwt = require('socketio-jwt');
io.set('authorization', socketioJwt.authorize({
	  secret: 'jwtSecret',
	  handshake: true
	}));

////With socket.io >= 1.0 ////
io.use(socketioJwt.authorize({
  secret: 'jwtSecret',
  handshake: true
}));



io.on('connection', function(socket){
	  console.log('a user connected');
	  console.log(socket.decoded_token.email);
	//  var session = socket.handshake.session;
	//  console.log("session");
	//  console.log(session);
	//   var hs = socket.handshake;
	//   console.log('A socket with sessionID '+hs.sessionID+' connected.');
	  socket.on('user:login', function (data) {
     		
     		console.log("user:login.email :" + data.email);
       		console.log("user:login.pwd :" + data.pwd);
       		
       		var user = mongo.UserInfo;
       		var query =user.findOne({ 'email': data.email,'pwd':data.pwd});
       		query.exec(function (err, data) {
       		  if (err) {
       			  return handleError(err);
       		  }else{
       			console.log(data) ;// Space Ghost is a talk show host.
       			socket.emit('message',"Authenticated");
       		  }
       		  
       		})
       		
     		socket.emit('message',"helo");
     });
	  socket.on('user:register', function (data) {
   		console.log("user:register.email" + data.email1);
   		console.log("user:register.pwd" + data.pwd1);
   		var user = mongo.UserInfo({'email':data.email1,'pwd':data.pwd1});
   		   		
   		user.save(function (err,data) {
   			if (err){
   				console.log ('Error on save!')
   				socket.emit('message',"authentication failed");
   			}else{
   				console.log("Save");
   				console.log(data);
   				socket.emit('message',"authenticated");
   			}
   		});
   		
   });
	  socket.on('disconnect', function(){
		    console.log('user disconnected');
	});
});

/*
var env = process.env.NODE_ENV || 'development',
config = require('./server/config/config')[env];

mongoose.connect(config.db);

var models_dir = __dirname + '/server/app/models';
fs.readdirSync(models_dir).forEach(function (file) {
  if(file[0] === '.') return;
  require(models_dir+'/'+ file);
});
*/


//var models = require("./mongodb/common")
//var mongoose = require ("mongoose"); 
						  
//var middleware = require('./server/middleware');


//var mongoose = require('mongoose');
//mongoose.connect(config['database_url']);
//var models = require('./models')(mongoose);
//var velvet = new models.Materials({'name':'Velvet'});

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    cookie: { secure: true }
}))

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/build/wwwroot'));
app.use(favicon(__dirname + '/build/wwwroot/assets/ico/favicon.ico'));

app.use(bodyParser.urlencoded({
		  extended: true
}));
app.use(bodyParser.json());

var memoryStore = session.MemoryStore;
var cookieSecret = "secret phrase";
var sessionStore = new memoryStore();

app.use(cookieParser("secret phrase"));
app.use(session({secret: 'secret phrase', 
   saveUninitialized: true,
       resave: true}));


//if ('production' == app.get('env') {
	  //app.use(express.errorHandler());
//};


//app.use(function(req, res, next){
//	  console.log('%s %s', req.method, req.url);
//	  next();
//	});


// Route index.html
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '/build/wwwroot/index.html'));
});

app.get('/login1', function(req, res) {
	  res.sendfile(path.join(__dirname, '/build/wwwroot/new.html'));
});

app.post('/login2', function(req, res) {
	  console.log("DDDDDD");
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
require('./server/api/auth')(app);

// Start server
server.listen(app.get('port'), function() {
  console.log(
    'Express server listening on port '.green + app.get('port'),
    '\nPress Ctrl+C to shutdown'.grey
  );
});


function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}








