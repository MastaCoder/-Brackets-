import { Router } from 'express';
import { getAllUserAccess, setUserAccess } from '../services/user.service.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const adminRouter = Router();

adminRouter.get('/platformusers', authenticate, async (req, res) => {
	try {
		const users = await getAllUserAccess();
		res.send(users);
	} catch {
		res.sendStatus(500);
	}
});

adminRouter.post('/modifyuseraccess', authenticate, async (req, res) => {
	const { email, platformAccess } = req.body;
	try {
		await setUserAccess(email, platformAccess);
		res.send('User Access Modified!');
	} catch (err) {
		res.sendStatus(404);
	}
});
