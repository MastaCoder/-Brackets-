const { Router } = require('express');
const { createUser, getUser } = require('../controllers/user.controller');

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
	const existingUsers = await getUser({
		$or: [
			{username: req.body.username},
			{email: req.body.email}
		]
	});
	console.log(existingUsers);
	if (existingUsers.length !== 0) {
		res.status(400).send();
	} else {
		await createUser(req.body);
		res.status(200).send();
	}
});

module.exports = { authRouter };
