const _ = require("lodash");
const { User } = require("../model/user");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("joi");



  

//register new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("name or email is not valid.");

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword)
    return res.status(404).send("name or email is not valid.");

    const token=user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(), //npm lib joi-password-complexity to configure pwd complexity
  });
  return schema.validate(req);
}

module.exports = router;
