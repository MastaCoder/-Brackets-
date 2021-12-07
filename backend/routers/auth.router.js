import { Router } from 'express';
import { checkUserLoggedIn } from '../middlewares/auth.middleware.js';
import { addLog } from '../services/logger.service.js';
import {
  authenticateUser,
  changeUserInfo, emailTaken, registerUser,
  usernameTaken
} from '../services/user.service.js';

export const authRouter = Router();

const _500_message = 'An unexpected error occured, please try again.';

/**
 * Attempts to register a new user.
 * Expects req = {
 *  username: ...,
 *  password: ...,
 *  email: ...,
 * }
 */
authRouter.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	try {
		if (await usernameTaken(username)) {
			res.status(400).send({ msg: 'Username already exists!' });
		} else if (await emailTaken(email)) {
			res.status(400).send({ msg: 'Email already exists!' });
		} else {
			const errMsg = await registerUser(username, email, password);
			if (!errMsg) {
				res.status(200).send({
					msg: 'Your account has been registered! Please login to proceed.',
				});
			} else {
				res.status(400).send({ msg: errMsg });
			}
		}
	} catch (err) {
		res.status(500).send({ msg: _500_message });
	}
});

/**
 * Attempts to log in an existing user.
 * Expects req = {
 *  username: ...,
 *  password: ...,
 * }
 * Returns {
 *  id: user's MongoDB id,
 *  type: "admin" or "user",
 *  username: ...
 * } on success
 */
authRouter.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		let user, err;
		({ user, err } = await authenticateUser(username, password));
		if (user) {
			req.session.currentUser = { _id: user.id };
			res.status(200).send({
				_id: user._id,
				type: user.type,
				username: user.username
			});
		} else {
			res.status(400).send({ msg: err });
		}
	} catch (err) {
		res.status(500).send({ msg: _500_message });
	}
});

/**
 * Attempts to update an existing user's details. User must be logged in to access this.
 * Expects req = {
 *  newUsername: ...,
 *  newEmail: ...,
 *  newPassword: ...,
 * }
 */
authRouter.post('/update', checkUserLoggedIn, async (req, res) => {
	const {
		newUsername: newUsername,
		newEmail: newEmail,
		newPassword: newPassword,
	} = req.body;

	try {
		if (
			newUsername !== req.user.username &&
			(await usernameTaken(newUsername))
		) {
			res.status(400).send({ msg: 'Username already exists!' });
		} else if (newEmail !== req.user.email && (await emailTaken(newEmail))) {
			res.status(400).send({ msg: 'Email already exists!' });
		} else {
			await changeUserInfo(
				req.session.currentUser._id,
				newUsername,
				newEmail,
				newPassword
			);
			await addLog(newUsername, 'Updated profile');
			res.status(200).send({ msg: 'Your details have been updated!' });
		}
	} catch (err) {
		res.status(500).send({ msg: _500_message });
	}
});

/**
 * Attempts to log out a user. 
 * Expects a valid session in req.
 */
authRouter.post('/logout', checkUserLoggedIn, async (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send({ msg: _500_message });
		} else {
			res.status(200).send();
		}
	});
});

/**
 * Gets the details of the logged in user.
 * Requires a valid session in req.
 * Returns P
 *  username: ...,
 *  email: ...,
 * }
 */
authRouter.post('/getloggedinuserdetails', checkUserLoggedIn, async (req, res) => {
	res.status(200).send({
		username: req.user.username,
		email: req.user.email,
	});
});
