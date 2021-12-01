import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.mjs';

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
	const existingUsers = await getUser({
		$or: [
			{username: req.body.username},
			{email: req.body.email}
		]
	});

	if (existingUsers.length !== 0) {
		res.status(400).send();
	} else {
		await registerUser(req.body.username, req.body.email, req.body.password);
		res.status(200).send();
	}
});
