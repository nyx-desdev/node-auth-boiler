const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre('save', function (next) {
	const user = this;
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			// Store hash in your password DB.
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
	const user = this;
	bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
