import { Router } from 'express';
import { checkUserLoggedIn } from '../middlewares/auth.middleware.js';
import {
	changeGroupName,
	createTournament,
	getAttendingTournaments,
	getHostingTournaments,
	getPublicTournaments,
	getTournamentById,
	joinTournament,
	joinTournamentTeam,
	kickUserFromGroup,
	proceedNextBracket,
	regenerateTournamentId,
	removeTournament,
	removeUserFromTournament,
	updateTournamentInfo,
	updateTournamentStatus,
} from '../services/tournament.service.js';
import { addLog } from '../services/logger.service.js';
import { isMongoError } from '../util.js';

export const tournamentRouter = Router();

tournamentRouter.post('/', checkUserLoggedIn, async (req, res) => {
	try {
		await createTournament(req);
		await addLog(req.user.username, `Creating tournament: ${req.body.name}`);
		res.send(req.body);
	} catch (error) {
		console.log(error);
		if (isMongoError(error)) {
			res.status(500).send({ msg: 'Internal Server Error' });
		} else {
			res.status(400).send({ msg: 'Bad Request' });
		}
	}
});

tournamentRouter.get(
	'/list/:which/:status',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			let tournaments;
			let split_status = req.params.status.split(',');
			switch (req.params.which) {
				case 'attending':
					tournaments = await getAttendingTournaments(req.user, split_status);
					break;
				case 'hosting':
					tournaments = await getHostingTournaments(req.user, split_status);
					break;
				case 'public':
					tournaments = await getPublicTournaments(req.user, split_status);
					break;
				default:
					res.status(400).send({ msg: 'Invalid request type' });
					return;
			}

			res.send({ tournaments });
		} catch (error) {
			console.log(error);
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.post('/join/:tid', checkUserLoggedIn, async (req, res) => {
	try {
		res.send({ tournament: await joinTournament(req.user, req.params.tid) });
	} catch (error) {
		console.log(error);
		if (isMongoError(error)) {
			res.status(500).send({ msg: 'Internal Server Error' });
		} else if (error.name === 'badId') {
			res.status(400).send({ msg: error.msg });
		} else if (error.name === 'notFound') {
			res.status(404).send({ msg: error.msg });
		} else if (error.name === 'limit') {
			res.status(409).send({ msg: error.msg });
		} else {
			res.status(400).send({ msg: 'Bad Request' });
		}
	}
});

tournamentRouter.post('/kick/:tid', checkUserLoggedIn, async (req, res) => {
	try {
		res.send({
			tournament: await removeUserFromTournament(req, req.body.userToRemove),
		});
	} catch (error) {
		console.log(error);
		if (isMongoError(error)) {
			res.status(500).send({ msg: 'Internal Server Error' });
		} else if (error.name === 'badId') {
			res.status(400).send({ msg: error.msg });
		} else if (error.name === 'unauth') {
			res.status(403).send({ msg: error.msg });
		} else {
			res.status(400).send({ msg: 'Bad Request' });
		}
	}
});

tournamentRouter.patch(
	'/teams/changename/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			res.send({ tournament: await changeGroupName(req) });
		} catch (error) {
			console.log(error);
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else if (error.name === 'unauth') {
				res.status(403).send({ msg: error.msg });
			} else if (error.name === 'exists') {
				res.status(409).send({ msg: error.msg });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.post(
	'/teams/kick/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			res.send({ tournament: await kickUserFromGroup(req) });
		} catch (error) {
			console.log(error);
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else if (error.name === 'badKick') {
				res.status(403).send({ msg: error.msg });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.post(
	'/regenerate/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			const tournamentId = await regenerateTournamentId(req.params.tid);
			res.send({ id: tournamentId });
		} catch (error) {
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'statusError') {
				res.status(400).send({ msg: error.message });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.post(
	'/teams/join/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			const tournament = await joinTournamentTeam(
				req.user,
				req.body.groupName,
				req.params.tid
			);
			res.send({ tournament });
		} catch (error) {
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else if (error.name === 'conflict') {
				res.status(409).send({ msg: error.msg });
			} else if (error.name === 'maxlimit') {
				res.status(409).send({ msg: error.msg });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.get('/details/:tid', checkUserLoggedIn, async (req, res) => {
	const id = req.params.tid;

	try {
		const tournament = await getTournamentById(req.user, id);
		if (!tournament)
			res.status(404).send({ msg: 'Requested Tournament Not Found' });
		else res.send({ tournament });
	} catch (error) {
		if (isMongoError(error)) {
			res.status(500).send({ msg: 'Internal Server Error' });
		} else {
			res.status(400).send({ msg: 'Bad Request' });
		}
	}
});

tournamentRouter.delete('/:tid', checkUserLoggedIn, async (req, res) => {
	try {
		const tournamentName = await removeTournament(req.user, req.params.tid);
		addLog(req.user.username, `Deleting ${tournamentName}`);
		res.send({ msg: 'success' });
	} catch (error) {
		console.log(error);
		if (isMongoError(error)) {
			res.status(500).send({ msg: 'Internal Server Error' });
		} else if (error.name === 'badId') {
			res.status(400).send({ msg: error.msg });
		} else if (error.name === 'notFound') {
			res.status(404).send({ msg: error.msg });
		} else if (error.name === 'unauth') {
			res.status(403).send({ msg: error.msg });
		}
	}
});

tournamentRouter.patch(
	'/updateinfo/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			res.send({ tournament: await updateTournamentInfo(req) });
		} catch (error) {
			console.log(error);
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else if (error.name === 'unauth') {
				res.status(403).send({ msg: error.msg });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.post(
	'/nextstatus/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			res.send({ tournament: await updateTournamentStatus(req) });
		} catch (error) {
			console.log(error);
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else if (error.name === 'unauth') {
				res.status(403).send({ msg: error.msg });
			} else if (error.name === 'badstatus') {
				res.status(400).send({ msg: error.msg });
			} else {
				res.status(400).send({ msg: 'Bad Request' });
			}
		}
	}
);

tournamentRouter.post(
	'/nextbracket/:tid',
	checkUserLoggedIn,
	async (req, res) => {
		try {
			res.send({ tournament: await proceedNextBracket(req) });
		} catch (error) {
			console.log(error);
			if (isMongoError(error)) {
				res.status(500).send({ msg: 'Internal Server Error' });
			} else if (error.name === 'badId') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'notFound') {
				res.status(404).send({ msg: error.msg });
			} else if (error.name === 'unauth') {
				res.status(403).send({ msg: error.msg });
			} else if (error.name === 'badstatus') {
				res.status(400).send({ msg: error.msg });
			} else if (error.name === 'badrequest') {
				res.status(400).send({ msg: error.msg });
			}
		}
	}
);
