const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

const configurePassport = require("./config/passport");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const reviewsRouter = require("./routes/api/reviews");
const ratingsRouter = require("./routes/api/ratings");
const notificationsRouter = require("./routes/api/notifications");

// connect to MongoDB
require("./config/mongoose");

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// configure Passport
app.use(passport.initialize());
configurePassport(passport);

// routes
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/ratings", ratingsRouter);
app.use("/api/notifications", notificationsRouter);

// serve React app if not API call
if (process.env.NODE_ENV !== 'dev') {
  // serve static files from build directory
  app.use(express.static(join(__dirname, 'client/build')));
  // catch-all for all non-API routes
  app.use('*', (req, res) => {
    res.sendFile(join(__dirName + '/client/build/index.html'));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
