import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function registerUser(username, email, password) {
	try {
		const user = new User({
			username: username,
			email: email,
			password: bcrypt.hashSync(password, 10),
			type: 'user',
		});
		await user.save();
	} catch (err) {
		return err._message;
	}
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
	const users = await User.find({ username: username });

	if (users.length === 0) {
		return {
			user: null,
			err: 'This username does not exist.',
		};
	} else {
		const user = users[0];
		if (bcrypt.compareSync(password, user.password)) {
			// Check if the user is banned!
			return user.platformAccess
				? {
						user: user,
						err: null,
				  }
				: {
						user: null,
						err: 'Account Banned! Contact an admin to review your ban.',
				  };
		} else {
			return {
				user: null,
				err: 'Invalid password.',
			};
		}
	}
}

export async function changeUserInfo(id, newUsername, newEmail, newPassword) {
	const user = await getUser(id);
	user.username = newUsername;
	user.email = newEmail;
	user.password = bcrypt.hashSync(newPassword, 10);
	await user.save();
}

export async function getUser(id) {
	return await User.findById(id);
}

export async function getAllUserAccess() {
	const users = await User.find({});
	const filteredUsers = users.map((user) => {
		return {
			username: user.username,
			email: user.email,
			platformAccess: user.platformAccess,
		};
	});
	return filteredUsers;
}

export async function setUserAccess(email, platformAccess) {
	const user = await User.findOne({
		email: email,
	});
	if (user.length == 0) {
		return new Error('User not found.');
	}
	user.platformAccess = platformAccess;
	user.save();
}
