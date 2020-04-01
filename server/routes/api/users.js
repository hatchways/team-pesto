const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const { passportSecret } = require("../../config/keys");
const validateEmail = require("../../validation/email");
const validatePassword = require("../../validation/password");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // validate inputs
  let isValid = true;
  if (!name || !validateEmail(email) || !validatePassword(password))
    isValid = false;

  if (!isValid) {
    res.status(400).send({
      response: "Invalid input.",
    });
    return;
  }

  try {
    // check if email exists in database
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send({
        response: "An account already exists with that email address.",
      });
      return;
    }

    // hash password, register user, then return jwt
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();
    // sign and return jwt as Bearer token in Authorization header
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = jwt.sign(payload, passportSecret);
    res.status(201).set("Authorization", `Bearer ${token}`).end();
  } catch {
    res.status(500).end();
  };
});

router.post("/login", (req, res) => {});

module.exports = router;
