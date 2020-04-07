const mongoose = require('mongoose');

const Message = require('./Message');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  requestorId: { type: mongoose.ObjectId, required: true },
  reviewerId: mongoose.ObjectId,
  title: String,
  date: { type: Date, default: Date.now },
  language: { type: String, required: true },
  code: { type: String, required: true },
  comments: String,
  status: { type: String, default: 'pending' },
  messages: [Message],
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
