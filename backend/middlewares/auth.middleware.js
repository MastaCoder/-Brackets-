import { getUser } from '../services/user.service.js';

export const checkUserLoggedIn = async (req, res, next) => {
	if (req.session.currentUser) {
		try {
			const user = await getUser(req.session.currentUser);
			if (!user) {
				res.status(401).send({ msg: 'Unauthorized' });
			} else {
				req.user = user;
				next();
			}
		} catch (error) {
			res.status(401).send({ msg: 'Unauthorized' });
		}
	} else {
		res.status(401).send({ msg: 'Unauthorized' });
	}
};

export const checkAdminLoggedIn = async (req, res, next) => {
	if (req.session.currentUser) {
		try {
			const user = await getUser(req.session.currentUser);
			if (user && user.type === 'admin') {
				req.user = user;
				next();
			} else {
				res.status(401).send({ msg: 'Unauthorized' });
			}
		} catch (error) {
			res.status(401).send({ msg: 'Unauthorized' });
		}
	} else {
		res.status(401).send({ msg: 'Unauthorized' });
	}
};
