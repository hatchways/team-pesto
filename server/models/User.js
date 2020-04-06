const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

async function hashHook(next) {
  const hash = await hashPassword(this.password);
  this.password = hash;
  next();
}

// TO DO: in SignUp.jsx, when creating new user, add default balance and image values (?) to POST request body
// OR make it a default value in mongo
const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  experience: { type: Array },
  balance: { type: Number, required: true },      // TO DO: see above. init 3
  image: { type: String },                        // TO DO: see above. init ???
});

// hash password before saving
userSchema.pre("save", hashHook);

const User = mongoose.model("user", userSchema);
module.exports = User;
