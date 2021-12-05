import pkg from "mongoose";
const { ObjectID } = pkg;

export function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

export function isValidId(res, id) {
	if (!ObjectID.isValid(id)) {
		res.status(404).send() 
		return false;
	}
}