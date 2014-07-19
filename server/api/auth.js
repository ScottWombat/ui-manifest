'use strict';
var bcrypt = require('bcrypt-nodejs');
var authService = require('../middleware/auth');
var auth = function (app) {
	app.post('/login',
			authService.getUser,
			returnOk
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

}
module.exports = auth;