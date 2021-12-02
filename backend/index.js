import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from './db/mongoose.js';
import session from 'express-session';
import { authRouter } from './routers/auth.router.js';
import { sessionRouter } from './routers/session.router.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Extra middleware to check for mongoose connection
const checkMongooseConnection = (req, res, next) => {
	if (mongoose.connection.readyState != 1) {
		res.sendStatus(500);
	} else {
		next();
	}
};

/* ---------------- Middlewares ---------------- */
app.use(cors());
app.use(bodyParser.json());
// Create a session and session cookie
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'our hardcoded secret', // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
		},
	})
);
app.use(checkMongooseConnection);

/* ---------------- Specific Routes (try to use routers) ---------------- */
app.use('/api/session', sessionRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
	console.log(`App Listening on PORT: ${PORT}`);
});
