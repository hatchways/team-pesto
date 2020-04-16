require("dotenv").config();
const express = require("express");
const passport = require("passport");

const configurePassport = require("../config/passport");

const { json } = express;

const TestApp = () => {
  const app = express();
  app.use(json());
  app.use(passport.initialize());
  configurePassport(passport);

  return app;
};

module.exports = TestApp;
