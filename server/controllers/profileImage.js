const User = require("../models/User");
const Socket = require("../services/socket");

const newImage = async (userId, imageUrl) => {
  try {
    const user = await User.findById(userId);

    // save new image url to user model
    user.image = imageUrl;
    await user.save();

    // fire a socket to update FE
    Socket.updateProfileImage(userId, imageUrl);

    return user.image;
  } catch (err) {
    console.error(err);
    return "";
  }
};

module.exports = {
  newImage,
};
