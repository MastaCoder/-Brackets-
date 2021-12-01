import { User } from '../models/user.model.mjs';

export async function registerUser(username, email, password) {
	const user = new User({
		username: username,
		email: email,
		password: password
	});
	await user.save();
}

export async function usernameOrEmailTaken(username, email) {
	const users = await User.find({
		$or: [
			{username: username},
			{email: email}
		]
	});
	return users.length !== 0;
}