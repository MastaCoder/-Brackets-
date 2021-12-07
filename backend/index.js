import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { checkMongooseConnection } from './middlewares/connection.middleware.js';
import { adminRouter } from './routers/admin.router.js';
import { authRouter } from './routers/auth.router.js';
import { sessionRouter } from './routers/session.router.js';
import { tournamentRouter } from './routers/tournament.router.js';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- Middlewares ---------------- */
if (process.env.NODE_ENV === "development") app.use(cors());

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
app.use(
	express.static(path.join(path.resolve(__dirname, '..'), '/frontend/build'))
);
app.use('/api/session', sessionRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tournaments', tournamentRouter);
app.get('*', (req, res) => {
	res.sendFile(
		path.join(path.resolve(__dirname, '..'), '/frontend/build/index.html')
	);
});

app.listen(PORT, () => {
	console.log(`App Listening on PORT: ${PORT}`);
});
