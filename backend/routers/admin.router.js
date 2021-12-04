import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getNumTournaments } from '../services/tournament.service.js';
import { getAllUserAccess, setUserAccess } from '../services/user.service.js';

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

adminRouter.get('/numtournaments', authenticate, async (req, res) => {
  try {
		const data = await getNumTournaments();
		res.status(200).send(data);
	} catch (err) {
		res.status(500).send({ msg: "An unexpected error occured, please try again." });
	}
});