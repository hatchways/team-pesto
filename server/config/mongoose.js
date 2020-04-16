const mongoose = require("mongoose");

const { mongoUri } = require("./keys");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoUri, options)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
