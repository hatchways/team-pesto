const express = require("express");

const User = require("../../models/User");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    console.log(user);

    if (!user) {
      const newUser = new User({ name, email, password });
      newUser.save(() => {});
    }
  });

  res.status(201).send({}).end();
});

router.post("/login", (req, res) => {});

module.exports = router;
