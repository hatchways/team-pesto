const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const notificationSchema = new Schema({
  recipient: { type: ObjectId, required: true },
  title: String,
  link: String,
  date: { type: Number, default: Date.now },
  seen: { type: Boolean, default: false },
});

notificationSchema.index({ recipient: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
