import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function registerUser(username, email, password) {
	const hash = bcrypt.hashSync(password, 10);
	try {
		const user = new User({
			username: username,
			email: email,
			password: hash,
			type: 'user',
		});
		await user.save();
	} catch(err) {
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
			err: "This username does not exist.",
		};
	} else {
		const user = users[0];
		if (bcrypt.compareSync(password, user.password)) {
			return {
				user: user,
				err: null
			};
		} else {
			return {
				user: null,
				err: "Invalid password.",
			};
		}
	}
}

export async function changeUserInfo(id, newUsername, newEmail, newPassword) {
	const user = await getUser(id);
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

export async function getUser(id) {
	return await User.findById(id);
}