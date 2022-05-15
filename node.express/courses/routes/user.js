const _ = require("lodash");
const { User, validateUser } = require("../model/user");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

//get logged in user by token

router.get("/me", authMiddleware, async (req, res) => {
  let loggedIn = req.user;
  loggedIn = await User.findById(loggedIn._id).select("-password");
  res.send(loggedIn);
});
//add new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(404).send(error.details);
  //the db schema has a unique constraint
  //but this makes your code more defendecive
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("user already exist");

  try {
    let user = new User(
      //req.body //use the same object sent from api, in some cases it is better to use DTOs
      _.pick(req.body, ["name", "email", "password"]) // use _ pick to get needed props
    );

    // this bcrypt package save the salt with the password, so it can compare hased to hashed
    //encrypted = salt+password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ["name", "email"]));
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

module.exports = router;
