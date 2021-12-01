import { Router } from 'express';
import { registerUser, usernameOrEmailTaken, authenticateUser } from '../controllers/user.controller.js';

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
	// Object destructuring assignment
	let username, email, password;
	({username, email, password} = req.body);

	if (await usernameOrEmailTaken(username, email)) {
		res.status(400).send();
	} else {
		await registerUser(username, email, password);
		res.status(200).send();
	}
});

authRouter.post('/login', async (req, res) => {
	let username, password;
	({username, password} = req.body);

	const retval = await authenticateUser(username, password);
		
	if (!retval) {
		res.status(400).send();
	} else {
		res.status(200).send(retval);
	}
});
