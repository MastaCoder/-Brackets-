import mongoose from '../db/mongoose.js';

// Extra middleware to check for mongoose connection
export const checkMongooseConnection = (req, res, next) => {
	if (mongoose.connection.readyState != 1) {
		res.sendStatus(500);
	} else {
		next();
	}
};
