const { User } = require('../models/user.model');

const createUser = async (userObj) => {
	const newUser = new User(userObj);
	await newUser.save();
};

const getUser = async (userObj) => {
	const user = await User.find(userObj);
	return user;
};

module.exports = { createUser, getUser };
