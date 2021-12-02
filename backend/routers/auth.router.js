import { Router } from 'express';
import {
	registerUser,
	usernameTaken,
	emailTaken,
	authenticateUser,
	changeUserInfo,
	getLoggedInUserDetails,
	getUserType,
} from '../services/user.service.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
	let username, email, password;
	({ username, email, password } = req.body);

	if (await usernameTaken(username)) {
		res.status(400).send({ msg: 'Username already exists!' });
	} else if (await emailTaken(email)) {
		res.status(400).send({ msg: 'Email already exists!' });
	} else {
		await registerUser(username, email, password);
		res.status(200).send();
	}
});

authRouter.post('/login', async (req, res) => {
	let username, password;
	({ username, password } = req.body);

	const id = await authenticateUser(username, password);
	
	if (id) {
		const type = (await getUserType(id)).type;
		if (type) {
			req.session.currentUser = { _id: id };
			res.status(200).send({
				_id: id,
				type: type,
			});
		} else {
			res.status(500).send({ msg: "Internal server error. Please try again." });
		}
	} else {
		res.status(400).send({ msg: 'Invalid username or password. Please try again.' });
	}
});

authRouter.post('/update', async (req, res) => {
	let newUsername, newEmail, newPassword;
	({ newUsername: newUsername, newEmail: newEmail, newPassword: newPassword } = req.body);

	if (await usernameOrEmailTaken(newUsername, newEmail)) {
		res.status(400).send('Username or email already exists!');
	} else {
		const result = await changeUserInfo(req.session.currentUser._id, newUsername, newEmail, newPassword);
		if (result) {
			req.session.currentUser.username = newUsername;
			req.session.currentUser.email = newEmail;
			req.session.currentUser.password = newPassword;
			res.status(200).send('User Registered!');
		} else {
			res.status(500).send('An unexpected error occured, please try again.');
		}
	}

	console.log(req.session);
});

authRouter.post('/logout', async (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send('Session deleted!');
		}
	});
});

authRouter.post('/getloggedinuserdetails', async (req, res) => {
	const result = await getLoggedInUserDetails(req.session.currentUser._id);
	if (result) {
		res.status(200).send(result);
	} else {
		res.status(500).send();
	}
});