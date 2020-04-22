const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const ratingSchema = new Schema({
  reviewId: { type: ObjectId, required: true },
  requesterId: { type: ObjectId, required: true },
  reviewerId: { type: ObjectId, required: true },
  score: { type: Number, required: true },
});

const Rating = mongoose.model("rating", ratingSchema);
module.exports = Rating;
