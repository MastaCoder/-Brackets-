import pkg from "mongoose";
import {
  animals, colors, NumberDictionary, uniqueNamesGenerator
} from "unique-names-generator";
const { ObjectID } = pkg;

const numbers = NumberDictionary.generate({ min: 42069, max: 69420 });

const nameGenConfig = {
  dictionaries: [numbers, colors, animals],
  separator: "-",
  style: "capital",
};

export function isMongoError(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

export function isValidId(res, id) {
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return false;
  }
}

export function generateRandomGroupName() {
  return uniqueNamesGenerator(nameGenConfig);
}

export function throwCustomError(name, message) {
  const err = Error(message);
  err.name = name;
  throw err;
}
