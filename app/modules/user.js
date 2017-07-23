var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define a schema for the user model.

var userSchema = mongoose.Schema({

	local			:{
		username	: String,
		email		: String,
		password	: String,
		id			: String
	}
});


userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPwd = function(password){
	return bcrypt.compareSync( password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
