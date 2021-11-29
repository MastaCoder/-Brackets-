const { Router } = require('express');
const { createUser, getUser } = require('../controllers/user.controller');

const authRouter = Router();

authRouter.get('/test', (req, res) => {
	res.send('Testing!');
});

authRouter.post('/signup', async (req, res) => {
	// Do error checking here
	await createUser(req.body);
	res.send('Signed Up');
});

module.exports = { authRouter };
