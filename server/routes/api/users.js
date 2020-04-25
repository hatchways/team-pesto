require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const configureStripe = require("stripe");
const multer = require("multer");
const multers3 = require("multer-s3");
const AWS = require("aws-sdk");

const {
  passportSecret,
  stripeSecretKey,
  awsBucketName,
  awsAccessKeyId,
  awsSecretAccessKey,
  awsRegion,
} = require("../../config/keys");
const User = require("../../models/User");
const validateEmail = require("../../validation/email");
const validatePassword = require("../../validation/password");
const validateExperience = require("../../validation/experience");
const authenticate = require("../../middlewares/authenticate");

const stripe = configureStripe(stripeSecretKey);

const router = express.Router();

const price = 100; // the USD price (in cents) of 1 credit

const s3 = new AWS.S3({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion,
});

const uploadS3 = multer({
  storage: multers3({
    s3: s3,
    acl: "public-read",
    bucket: awsBucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

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
      experience: newUser.experience,
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
      balance: user.balance,
      totalRatings: user.totalRatings,
      totalRatingsScore: user.totalRatingsScore,
      image: user.image,
    };
    const token = jwt.sign(payload, passportSecret);
    res.status(200).send({ token, user: payload });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).end();
  }
});

router.get("/me", authenticate, (req, res) => {
  const {
    id,
    email,
    name,
    experience,
    balance,
    totalRatings,
    totalRatingsScore,
    title,
    years,
    image,
  } = req.user;
  res.json({
    id,
    email,
    name,
    experience,
    balance,
    totalRatings,
    totalRatingsScore,
    title,
    years,
    image,
  });
});

router.put("/me", authenticate, async (req, res) => {
  const userId = req.user.id;
  const { id, name, title, years, experience } = req.body;

  if ((!id || !name || !title, !years, !experience)) {
    res.status(400).send({ response: "Invalid input." });
    return;
  }

  try {
    const user = await User.findById(id);
    // eslint-disable-next-line eqeqeq
    if (userId == id) {
      user.name = name;
      user.title = title;
      user.years = years;
      user.experience = experience;

      user.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
      return;
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      const profile = user.profile();
      res.status(200).send({ profile });
    } else {
      res.sendStatus(400);
      return;
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/experience", authenticate, async (req, res) => {
  const { id } = req.user;
  const { experience } = req.body;
  if (!validateExperience(experience)) {
    res.status(400).send({ response: "Invalid input." });
  }
  try {
    await User.updateOne({ _id: id }, { $set: { experience } });
    res.status(200).end();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).end();
  }
});

router.post("/purchase", async (req, res) => {
  const { refillAmount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: refillAmount * price,
      currency: "usd",
    });
    res.status(200).send({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(400);
  }
});

router.put("/:id/add-credits", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const refillAmount = paymentIntent.amount / price;
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { balance: refillAmount },
    });
    res
      .status(200)
      .send({ success: true, message: "Successfully added credits" });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(400);
  }
});

router.post(
  "/upload",
  authenticate,
  uploadS3.single("file"),
  async (req, res) => {
    const userId = req.user.id;
    const location = req.file.location;

    try {
      if (userId) {
        const user = await User.findById(userId);
        user.image = location;
        user.save();
        res.send(200).send({ image: user.image });
      } else {
        res.sendStatus(400);
        return;
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
