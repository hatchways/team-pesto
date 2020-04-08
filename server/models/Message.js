const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  authorId: { type: mongoose.ObjectId, required: true },
  date: { type: Date, default: Date.now },
  code: String,
  comments: String,
});

const Message = mongoose.model('message', messageSchema);
module.exports = Message;
