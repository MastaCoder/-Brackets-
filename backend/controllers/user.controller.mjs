import { User } from '../models/user.model.mjs';

export function registerUser(username, email, password) {
	new User({
		username: username,
		email: email,
		password: password
	}).save();
}

export 

const getUser = async (userObj) => {
	const user = await User.find(userObj);
	return user;
};

// module.exports = { createUser: registerUser, getUser };
