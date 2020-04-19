const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const notificationSchema = new Schema({
  recipient: { type: ObjectId, required: true },
  code: Number,
  title: String,  // "you have a new request from {user name}!"
  date: { type: Date, default: Date.now },  // epoch time integer
  link: String, // request or review? requests/:reviewId or reviews/:reviewId
  seen: { type: Boolean, default: false },
});

notificationSchema.index({ recipient: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;