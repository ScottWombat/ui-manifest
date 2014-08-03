'use strict';
// Module dependencies
var io = require('socket.io'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
 	favicon = require('serve-favicon'),
 	bodyParser = require('body-parser'),
    session = require('express-session'),
 	cookieParser = require('cookie-parser'),
 	colors = require('colors'),
 	connect = require("connect"),
    models = require("./server/mongodb/common");

//We define the key of the cookie containing the Express SID
var EXPRESS_SID_KEY = 'express.sid';

// We define a secret string used to crypt the cookies sent by Express
var COOKIE_SECRET = 'very secret string';
//cookieParser(COOKIE_SECRET);

//var sessionStore = new session.MemoryStore();

// Create server
var app = express();

app.use(favicon(__dirname + '/build/wwwroot/assets/ico/favicon.ico'));
app.use(bodyParser.urlencoded({
	  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser);
//app.use(session);

/*
app.use(session({
    store: sessionStore,
    cookie: {
        httpOnly: true
    },
    key: EXPRESS_SID_KEY
}));
*/




// Configure server
app.set('port', process.env.PORT || 3000);
app.set('host',process.env.HOST || 'localhost');

// Mount statics
app.use(express.static(__dirname + '/build/wwwroot'));
//app.use(express.static(__dirname + '/../build/wwwroot/assets/vendors'));
//app.use(express.static(__dirname + '/../build/wwwroot/assets/image'));
//app.use(express.static(__dirname + '/../build/wwwroot/assets/css'));
//app.use(express.static(__dirname + '/../build/wwwroot/js'));

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



var server =http.createServer(app);
io = io.listen(server);

//We configure the socket.io authorization handler (handshake)
io.set('authorization', function (data, callback) {
	console.log("authorization");
    if(!data.headers.cookie) {
        return callback('No cookie transmitted.', false);
    }

    // We use the Express cookieParser created before to parse the cookie
    // Express cookieParser(req, res, next) is used initialy to parse data in "req.headers.cookie".
    // Here our cookies are stored in "data.headers.cookie", so we just pass "data" to the first argument of function
    cookieParser(data, {}, function(parseErr) {
        if(parseErr) { return callback('Error parsing cookies.', false); }

        // Get the SID cookie
        var sidCookie = (data.secureCookies && data.secureCookies[EXPRESS_SID_KEY]) ||
                        (data.signedCookies && data.signedCookies[EXPRESS_SID_KEY]) ||
                        (data.cookies && data.cookies[EXPRESS_SID_KEY]);

        // Then we just need to load the session from the Express Session Store
        sessionStore.load(sidCookie, function(err, session) {
            // And last, we check if the used has a valid session and if he is logged in
            if (err || !session || session.isLogged !== true) {
                callback('Not logged in.', false);
            } else {
                // If you want, you can attach the session to the handshake data, so you can use it again later
                // You can access it later with "socket.handshake.session"
                data.session = session;

                callback(null, true);
            }
        });
    });
});

//upon connection, start a periodic task that emits (every 1s) the current timestamp
io.on('connection', function (socket) {
    var sender = setInterval(function () {
        socket.emit('myCustomEvent', new Date().getTime());
    }, 1000);

    socket.on('disconnect', function() {
        clearInterval(sender);
    });
});


server.listen(app.get('port'), function() {
    console.log('Server listening on port %d in %s mode', this.address().port, app.settings.env.red);
    console.log('Press Ctrl+C to shutdown'.grey);
});



// Start server
//var server =http.createServer(app).listen(app.get('port'), function() {
//  console.log(
//   'Express server listening on port '.green + app.get('port'),
 //   '\nPress Ctrl+C to shutdown'.grey
 // );
//});







