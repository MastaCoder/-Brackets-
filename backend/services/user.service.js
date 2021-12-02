import { User } from '../models/user.model.js';

export async function registerUser(username, email, password) {
	const user = new User({
		username: username,
		email: email,
		password: password,
		type: 'user',
	});
	await user.save();
}

export async function usernameOrEmailTaken(username, email) {
	const users = await User.find({
		$or: [{ username: username }, { email: email }],
	});
	return users.length !== 0;
}

export async function authenticateUser(username, password) {
	const users = await User.find({
		$or: [{ username: username }, { password: password }],
	});

	if (users.length === 0) {
		return false;
	} else {
		return users[0];
	}
}
