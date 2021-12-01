import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from './db/mongoose.js';
import { authRouter } from './routers/auth.router.js';

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
app.use(checkMongooseConnection);

/* ---------------- Specific Routes (try to use routers) ---------------- */
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
	console.log(`App Listening on PORT: ${PORT}`);
});
