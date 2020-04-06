const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  reviewerId: { type: mongoose.ObjectId, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
