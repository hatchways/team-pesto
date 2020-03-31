const mongoose = require("mongoose");

const { mongoUri } = require("./config");

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
