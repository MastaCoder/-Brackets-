import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import { authRouter } from './routers/auth.router.js';
import { sessionRouter } from './routers/session.router.js';
import { adminRouter } from './routers/admin.router.js';
import { checkMongooseConnection } from './middlewares/connection.middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
	console.log(`App Listening on PORT: ${PORT}`);
});
