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

reviewSchema.methods.filteredSchema = function () {
  return {
    _id: this._id,
    requesterId: this.requesterId,
    reviewerId: this.reviewerId,
    title: this.title,
    date: this.date,
    language: this.language,
    status: this.status,
    messages: this.messages,
  };
};

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
