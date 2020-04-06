const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const { passportSecret } = require("./keys");
const User = require("../models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: passportSecret,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload.id, (err, user) => {
        if (err) return done(err, false);

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
