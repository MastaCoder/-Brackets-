import mongoose from "../db/mongoose.js";
import validator from "validator"



// User Schema (Add stuff to this!)
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Email is not a valid set of characters."]
  },
  password: {
    type: String,
    minLength: 1,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

// The User Model
export const User = mongoose.model("User", UserSchema);
