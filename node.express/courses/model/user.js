const mongoose = require("mongoose");
const config = require("../startup/config");

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { boolean } = require("joi");

//define schema for user document
//mongoose use this schema to validate data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    mxalength: 255,
  },
  password: { type: String, required: true },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  const key = config.getValue("jwt");

  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, key);
  return token;
};
//define the user object
const User = mongoose.model("user", userSchema);

//validate user object against a predefined scehma
//this validate all api payload even it is not used
//so we send only the defined props
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(), //npm lib joi-password-complexity to configure pwd complexity
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validate;
