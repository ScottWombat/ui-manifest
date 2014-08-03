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
	
	app.post('/login4', function (req, res) {
		 var profile = {
				    first_name: 'John',
				    last_name: 'Doe',
				    email: 'john@doe.com',
				    id: 123
		};
		// we are sending the profile in the token
		 
		  var token = jwt.sign(profile, 'jwtSecret', { expiresInMinutes: 60*5 });
          console.log("DDDDDDDDDDD" + token);
          console.log(req.body.data.email);
          console.log(req.body.data.pwd);
		  //res.json({token: token});
          res.json(201, {token: token});
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