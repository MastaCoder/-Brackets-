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

export async function usernameTaken(username) {
	const users = await User.find({ username: username });
	return users.length !== 0;
}

export async function emailTaken(email) {
	const users = await User.find({ email: email });
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

export async function changeUserInfo(id, newUsername, newEmail, newPassword) {
	const user = await User.findById(id);
	if (user) {
		user.username = newUsername;
		user.email = newEmail;
		user.password = newPassword;
		await user.save();
		return true;
	} else {
		return false;
	}
}

export async function getLoggedInUserDetails(id) {
	const user = await User.findById(id);
	if (user) {
		return {
			username: user.username,
			email: user.email
		}
	} else {
		return null;
	}
}
