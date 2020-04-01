const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { passportSecret } = require("../../config/keys");
const validateEmail = require("../../validation/email");
const validatePassword = require("../../validation/password");

const router = express.Router();

const validateSignupInputs = (body) => {
  const { name, email, password } = body;
  let isValid = true;
  if (!name || !validateEmail(email) || !validatePassword(password))
    isValid = false;

  return isValid;
};

router.post("/signup", async (req, res) => {
  if (!validateSignupInputs(req.body)) {
    res.status(400).send({
      response: "Invalid input.",
    });
    return;
  }

  const { name, email, password } = req.body;

  try {
    // check if email exists in database
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send({
        response: "An account already exists with that email address.",
      });
      return;
    }

    // register user
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save(); // password hashed on save

    // sign and return jwt as Bearer token in Authorization header
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = jwt.sign(payload, passportSecret);
    res.status(201).set("Authorization", `Bearer ${token}`).end();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).end();
  }
});

router.post("/login", (req, res) => {
  res.status(500).end();
});

module.exports = router;
