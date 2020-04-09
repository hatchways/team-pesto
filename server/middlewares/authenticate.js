const passport = require("passport");

const strategy = "jwt";
const options = {
  session: false,
};

const authenticate = passport.authenticate(strategy, options);

module.exports = authenticate;
