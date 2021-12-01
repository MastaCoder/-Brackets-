const { Router } = require('express');
const { createUser, getUser } = require('../controllers/user.controller');

const authRouter = Router();

authRouter.get("/register", async (req, res) => {
	console.log(req, res);
	res.send("Registered");
});

authRouter.post("/register", async (req, res) => {
	console.log(req, res);
	res.send("Registered");
	// await createUser(req.body);
});

module.exports = { authRouter };
