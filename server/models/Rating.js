const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const ratingSchema = new Schema({
  reviewId: { type: ObjectId, required: true },
  requesterId: { type: ObjectId, required: true },
  reviewerId: { type: ObjectId, required: true },
  rating: { type: Number, required: true },
});

ratingSchema.index({ reviewer: 1 });

const Rating = mongoose.model("rating", ratingSchema);
module.exports = Rating;
