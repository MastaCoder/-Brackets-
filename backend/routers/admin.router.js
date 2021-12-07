import { Router } from 'express';
import { checkAdminLoggedIn } from '../middlewares/auth.middleware.js';
import { addLog, getAllLogs } from '../services/logger.service.js';
import {
	getNumTournaments,
	getTournaments,
} from '../services/tournament.service.js';
import {
	getAllUserAccess,
	getUser,
	setUserAccess,
} from '../services/user.service.js';

export const adminRouter = Router();

adminRouter.get('/platformusers', checkAdminLoggedIn, async (req, res) => {
	try {
		const users = await getAllUserAccess();
		res.send(users);
	} catch {
		res.sendStatus(500);
	}
});

adminRouter.post('/modifyuseraccess', checkAdminLoggedIn, async (req, res) => {
	const { username, platformAccess } = req.body;
	try {
		await setUserAccess(username, platformAccess);
		// Add a log
		const actionMessage = platformAccess
			? `Unbanning: ${username}`
			: `Banning: ${username}`;
		await addLog(req.user.username, actionMessage);

		res.send('User Access Modified!');
	} catch (err) {
		res.sendStatus(404);
	}
});

adminRouter.get('/numtournaments', checkAdminLoggedIn, async (req, res) => {
	try {
		const data = await getNumTournaments();
		res.status(200).send(data);
	} catch (err) {
		res
			.status(500)
			.send({ msg: 'An unexpected error occured, please try again.' });
	}
});

adminRouter.get('/logs', checkAdminLoggedIn, async (req, res) => {
	try {
		const logs = await getAllLogs();
		res.send(logs);
	} catch (err) {
		res.sendStatus(500);
	}
});

adminRouter.get(
	'/listtournaments/:status',
	checkAdminLoggedIn,
	async (req, res) => {
		try {
			res.send(await getTournaments(req.params.status.split(",")));
		} catch (error) {
			res.sendStatus(500);
		}
	}
);

adminRouter.get('/numusers', checkAdminLoggedIn, async (req, res) => {
	try {
		const users = await getAllUserAccess();
		let active = 0;
		let banned = 0;
		users.forEach((user) => {
			user.platformAccess ? (active += 1) : (banned += 1);
		});
		res.status(200).send({
			active: active,
			banned: banned,
		});
	} catch (err) {
		res
			.status(500)
			.send({ msg: 'An unexpected error occured, please try again.' });
	}
});
