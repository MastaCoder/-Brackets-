import { Router } from 'express';

export const sessionRouter = Router();

sessionRouter.get('/validate', (req, res) => {
	if (req.session.currentUser) {
		res.send({ currentUser: req.session.currentUser });
	} else {
		res.status(401).send();
	}
});
