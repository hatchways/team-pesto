const mongoose = require("mongoose");

const Message = require("./Message");

const { Schema, ObjectId } = mongoose;

const reviewSchema = new Schema({
  requesterId: { type: ObjectId, required: true },
  reviewerId: { type: ObjectId, default: null },
  declinedIds: [ObjectId],
  title: String,
  date: { type: Date, default: Date.now },
  language: { type: String, required: true },
  status: { type: String, default: "pending" },
  messages: [Message.schema],
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
