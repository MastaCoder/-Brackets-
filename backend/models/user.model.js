const mongoose = require('mongoose');

// User Schema (Add stuff to this!)
const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
});

// The User Model
const User = mongoose.model('User', UserSchema);

module.exports = { User };
