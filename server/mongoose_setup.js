const mongoose = require("mongoose");

const { mongoUri } = require("./config/keys");

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log(err);
  });
