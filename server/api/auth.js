'use strict';
var bcrypt = require('bcrypt-nodejs');

var mid = require('../middleware/auth.js');

var common = require('../env/common');
var config = common.config();

var jwt = require('jsonwebtoken');

var auth = function (app) {
	console.log("auth");
	app.get('/login',
			mid.getUser,
			returnOk
	);
	
	app.post('/login3',
			mid.postUser,
			returnToken
	);
	
	app.post('/logon', function (req, res) {
		 var profile = {
				    email: req.body.data.email,
				    pwd: req.body.data.pwd,
				    salt:'The rain in Spain falls mainly on the plane'
				 
		};
		// we are sending the profile in the token
		 
		  var token = jwt.sign(profile, 'jwtSecret', { expiresInMinutes: 60*5 });
          console.log("Login Token:" + token);
          console.log(req.body.data.email);
          console.log(req.body.data.pwd);
         // res.send(401,{token:'invalid'});
          res.send(201, {token: token})
	});
	
	app.post('/register', function (req, res) {
		 var profile = {
				    email: req.body.data.email1,
				    pwd: req.body.data.pwd1,
				    salt:'The rain in Spain falls mainly on the plane'
				 
		};
		// we are sending the profile in the token
		 
		  var token = jwt.sign(profile, 'jwtSecret', { expiresInMinutes: 60*5 });
         console.log("Reguster Token:" + token);
         console.log(req.body.data.email1);
         console.log(req.body.data.pwd1);
        // res.send(401,{token:'invalid'});
         res.send(201, {token: token})
	});
	
	function checkUser(req, res, next) {
		
		var signup = req.body;
		return next({message: 'user not found', status: 404});
		findUser(signup.username, function (err, user) {
			if (err) {
				return next({message: 'user not found', status: 404});
			}

			bcrypt.compare(signup.password, user.password, function (err, matched) {
				if (!matched) {
					return next({message: 'password is wrong', status: 401});
				}

				req.user = user;
				next();
			});
		});
	}
	function returnOk(req, res, next) {
		res.send(200);
	}
	function returnToken(req, res, next) {
		res.json(201, {token: req.token});
	}


}
module.exports = auth;