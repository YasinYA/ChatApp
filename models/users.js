var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	country: {
		type: String,
		required: true
	},

	username: {
		type: String,
		required: true
	}, 

	password: {
		type: String,
		required: true
	}
});

userSchema.plugin(passportLocalMongoose);

var users = module.exports = mongoose.model('users', userSchema);

module.exports.createUser = function(user, callback) {
	users.create(user, callback);
}