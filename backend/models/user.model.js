import mongoose from "../db/mongoose.js";

/*
Regex for email validation gathered from 
https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
*/

const whiteSpaceValidation = {
  validator: function (v) {
    return v.trim().length >= this.minLength;
  },
  message: (props) => `${props.v} is too short.`,
};

// User Schema (Add stuff to this!)
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    validate: whiteSpaceValidation,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])).){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])".test(
          v
        );
      },
      message: (props) => `${props.v} is not a valid email!`,
    },
  },
  password: {
    type: String,
    minLength: 1,
    required: true,
    validate: whiteSpaceValidation,
  },
  type: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

// The User Model
export const User = mongoose.model("User", UserSchema);
