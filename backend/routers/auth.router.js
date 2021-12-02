import { Router } from 'express';
import {
	registerUser,
	usernameOrEmailTaken,
	authenticateUser,
} from '../services/user.service.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
	// Object destructuring assignment
	let username, email, password;
	({ username, email, password } = req.body);

	if (await usernameOrEmailTaken(username, email)) {
		res.status(400).send('Username or email already exists!');
	} else {
		await registerUser(username, email, password);
		res.status(200).send('User Registered!');
	}
});

authRouter.post('/login', async (req, res) => {
	let username, password;
	({ username, password } = req.body);

	const user = await authenticateUser(username, password);

	if (!user) {
		res.status(400).send('No such user');
	} else {
		req.session.currentUser = user;
		res.status(200).send(user);
	}
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
