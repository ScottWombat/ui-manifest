'use strict';
var bcrypt = require('bcrypt-nodejs');

var mid = require('../middleware/auth.js');


var common = require('../env/common');
var config = common.config();


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