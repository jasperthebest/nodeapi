var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	created_on: { 
		type: Date, 
		default: Date.now 
	}
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');