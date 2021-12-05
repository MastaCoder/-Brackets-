import { Log } from '../models/log.model.js';

export async function addLog(username, action) {
	const log = new Log({
		username: username,
		action: action,
	});

	try {
		await log.save();
	} catch (err) {
		return err;
	}
}

export async function getAllLogs() {
	return await Log.find({}).sort({ timestamp: -1 });
}
