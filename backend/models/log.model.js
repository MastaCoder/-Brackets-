import mongoose from '../db/mongoose.js';

const LogSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 1,
		trim: true,
	},
	action: {
		type: String,
		minLength: 1,
		required: true,
		trim: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

export const Log = mongoose.model('Log', LogSchema);
