import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
	registerUser,
	usernameTaken,
	emailTaken,
	authenticateUser,
	changeUserInfo,
	getUser,
} from '../services/user.service.js';

export const authRouter = Router();

const _500_message = "An unexpected error occured, please try again.";

authRouter.post('/register', async (req, res) => {
	let username, email, password;
	({ username, email, password } = req.body);

	if (await usernameTaken(username)) {
		res.status(400).send({ msg: 'Username already exists!' });
	} else if (await emailTaken(email)) {
		res.status(400).send({ msg: 'Email already exists!' });
	} else {
		await registerUser(username, email, password);
		res.status(200).send({ msg: "Your account has been registered! Please login to proceed." });
	}
});

authRouter.post('/login', async (req, res) => {
	let username, password;
	({ username, password } = req.body);

	const id = await authenticateUser(username, password);
	
	if (id) {
		const user = await getUser(id);
		if (user) {
			req.session.currentUser = { _id: id };
			res.status(200).send({
				_id: id,
				type: user.type,
			});
		} else {
			res.status(500).send({ msg: _500_message });
		}
	} else {
		res.status(400).send({ msg: 'Invalid username or password. Please try again.' });
	}
});

authRouter.post('/update', authenticate, async (req, res) => {
	let newUsername, newEmail, newPassword;
	({ newUsername: newUsername, newEmail: newEmail, newPassword: newPassword } = req.body);

	if (newUsername !== req.user.username && await usernameTaken(newUsername)) {
		res.status(400).send({ msg: 'Username already exists!' });
	} else if (newEmail !== req.user.email && await emailTaken(newEmail)) {
		res.status(400).send({ msg: 'Email already exists!' });
	} else {
		const result = await changeUserInfo(req.session.currentUser._id, newUsername, newEmail, newPassword);
		if (result) {
			res.status(200).send({ msg: "Your details have been updated!" });
		} else {
			res.status(500).send({ msg: _500_message });
		}
	}
});

authRouter.post('/logout', authenticate, async (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send({ msg: _500_message });
		} else {
			res.send('Session deleted!');
		}
	});
});

authRouter.post('/getloggedinuserdetails', authenticate, async (req, res) => {
	res.status(200).send({
		username: req.user.username, 
		email: req.user.email,
	});
});