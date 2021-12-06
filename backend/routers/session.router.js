import { Router } from 'express';
import { getUser } from '../services/user.service.js';

export const sessionRouter = Router();

sessionRouter.get('/validate', async (req, res) => {
	try {
		if (req.session.currentUser) {
			const user = await getUser(req.session.currentUser._id);
			res.send({
				currentUser: {
					_id: user._id,
					type: user.type, // Need this for frontend
					username: user.username
				},
			});
		} else {
			res.status(401).send();
		}
	} catch (err) {
		res.sendStatus(500);
	}
});
