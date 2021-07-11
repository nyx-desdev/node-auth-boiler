const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
	return jwt.sign({ _id: user._id.toString() }, config.secret);
}

exports.signin = function (req, res, next) {
	res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	//See it a user with the given email exists
	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		//If a user exists return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}
		//If a user does not exist, create and save user record
		const user = new User({
			email,
			password,
		});

		user.save(function (err) {
			if (err) {
				return next(err);
			}
			console.log('user', user);
			const token = tokenForUser(user);
			res.json({ token });
		});

		//Repond to request indicating the user was created
	});
};
