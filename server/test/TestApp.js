require("dotenv").config();
const express = require("express");
const passport = require("passport");
const http = require("http");

const configurePassport = require("../config/passport");
const Socket = require("../services/socket");

const { json } = express;

const TestApp = () => {
  const app = express();
  app.use(json());
  app.use(passport.initialize());
  configurePassport(passport);

  const server = http.createServer(app);
  Socket.connect(server);

  return app;
};

module.exports = TestApp;
