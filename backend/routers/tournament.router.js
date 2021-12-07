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

/* POST /tournaments
 * Creates a new tournament hosted by <user>. Returns data that made the event.
 * Error message on failure.
 * Body Expected: 
 * {
 * 	 name: "name",
 *   description: "description",
 * 	 public: true/false,
 *   maxMembers: 2-100,
 *   maxTeamMembers: 1-100,
 * }
 */
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


/* GET /tournaments/list/:which/:status
 * Gets a list of all tournaments that are of <which> and <status>.
 * which = [attending, hosting, public]
 * status = [0, 1, 2]
 * Returns the list of tournaments on success. 
 * Error message on failure.
 */
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


/** POST /tournaments/join/:tid
 *  Adds the user the tournament <tid>. On success returns the tournament joined.
 *  Error message on failure.
 */
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


/** POST /tournaments/kick/:tid
 * Removes user from the tournament <tid>. On success returns the tournament object.
 * Error message on failure.
 */
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


/** PATCH /tournaments/teams/changename/:tid
 *  Changes the name of the tournament <tid>, returns tournament object on success.
 *  Error message on failure.
 *  Expected Body: 
 *  { 
 *  	groupName: "groupName",
 *      newGroupName: "newGroupName",
 *  }
 */
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


/** POST /tournaments/teams/kick/:tid
 *  Removes a user from a team. On success returns the tournament object.
 *  Error message on failure.
 *  Expected Body: 
 *  { 
 * 	  groupName: "groupName",
 *    kickedUser: "kickedUser",
 *  }
 */
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


/** POST /tournaments/regenerate/:tid
 *  Regenerates the tournament <tid>'s id so that private tournaments
 *  can "expire" a link. Returns new and copied tournament object. 
 *  Error message on failure.
 */
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


/** POST /tournaments/teams/join/:tid
 *  Places user into a team they joined for tournament <tid>.
 *  Returns tournament object after placement. Error message on failure.
 *  Expected Body: 
 *  {
 *    groupName: "groupName"
 *  }
 */
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

/** GET /tournaments/details/:tid
 *  Gets the tournament object with id <tid>. Returns the tournament object on success.
 *  Error message on failure.
 */
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


/** DELETE /tournaments/:tid
 *  Deletes the tournament <tid>. Returns generic success message on success.
 *  Error message on failure.
 */
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


/** PATCH /tournaments/updateinfo/:tid
 *  Updates the basic info of tournament <tid>: description and public status.
 *  Returns the updated tournamnet object on success.
 *  Error message on failure.
 *  Expected Body:
 *  {
 *    description: "description",
 *    public: true/false,
 *  }
 */
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


/** POST /tournaments/nextstatus/:tid
 *  Progresses tournament <tid>'s status to the next stage. 
 *  Returns the updated tournament object on success.
 *  Error message on failure.
 */
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


/** POST /tournaments/nextbracket/:tid
 *  Proceeds the tournament <tid>'s brackets. Adds new bracket based on
 *  past teams in earlier bracket. Returns tournament object on success.
 *  Error message on failure.
 *  Expected Body: 
 *  {
 * 		proceedingTeams: ["team1", "team2", "team3"]
 *  }
 *  Must ensure teams are in the tournament and actually ordered properly
 *  to match bracket match ups.
 */
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
