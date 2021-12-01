import mongoose from "../db/mongoose.js";

// User Schema (Add stuff to this!)
const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	type: String,
});

// The User Model
export const User = mongoose.model('User', UserSchema);