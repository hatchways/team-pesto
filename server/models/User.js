const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

async function hashHook(next) {
  if (this.isNew) {
    const hash = await hashPassword(this.password);
    this.password = hash;
  }
  next();
}

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  experience: { type: Array },
  balance: { type: Number, default: 3 },
  image: { type: String },
  title: { type: String },
  years: { type: String },
});

userSchema.methods.profile = function () {
  return {
    _id: this._id,
    name: this.name,
    experience: this.experience,
    image: this.image,
    title: this.title,
    years: this.years,
  };
};

// hash password before saving
userSchema.pre("save", hashHook);

const User = mongoose.model("user", userSchema);
module.exports = User;
