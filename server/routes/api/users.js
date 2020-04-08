require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");

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
    res.status(201).send({ token, user: payload });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).end();
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ response: "Invalid input." });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({ response: "Incorrect user credentials." });
      return;
    }

    const hash = user.password;
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      res.status(401).send({ response: "Incorrect user credentials." });
      return;
    }

    // sign and return jwt
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      experience: user.experience,
    };
    const token = jwt.sign(payload, passportSecret);
    res.status(200).send({ token, user: payload });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).end();
  }
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.user) res.status(401).end();
    next();
  },
  (req, res) => {
    const { id, email, name, experience, image } = req.user;
    res.json({ id, email, name, experience, image });
  }
);

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.user) res.status(401).end();
    next();
  },
  async (req, res) => {
    const { id } = req.user;
    const { experience } = req.body;

    console.log("REQBODY: ", "\n", req.body);

    console.log("ID: ", "\n", id, "\n", "EXPERIENCE: ", "\n", experience);

    try {
      const user = await User.findOne({ _id: id });

      console.log("USER: ", "\n", user);

      user.experience = experience;
      user.save();

      console.log("USER2: ", "\n", user);

      res.status(200).end();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).end();
    }
  }
);

module.exports = router;
