import { Router } from 'express';
import { registerUser, usernameOrEmailTaken } from '../controllers/user.controller.mjs';

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
