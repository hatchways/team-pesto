const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
  title: String,
  language: { type: String, required: true },
  code: { type: String, required: true },
  comments: String,
  review: mongoose.ObjectId,
});

const Request = mongoose.model('requests', requestSchema);
module.exports(Request);
