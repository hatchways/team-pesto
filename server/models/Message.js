const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const messageSchema = new Schema({
  authorId: { type: ObjectId, required: true },
  date: { type: Date, default: Date.now },
  code: String,
  comments: String,
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
