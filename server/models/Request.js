const mongoose = require('mongoose');

const Review = require('./Review');

const { Schema } = mongoose;

const requestSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  language: { type: String, required: true },
  code: { type: String, required: true },
  comments: String,
  review: Review,
});

const Request = mongoose.model('requests', requestSchema);
module.exports(Request);
