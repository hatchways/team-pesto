const mongoose = require('mongoose');

const Message = require('./Message');

const { Schema, ObjectId } = mongoose;

const reviewSchema = new Schema({
  requesterId: { type: ObjectId, required: true },
  reviewerId: ObjectId,
  declinedIds: [ObjectId],
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
