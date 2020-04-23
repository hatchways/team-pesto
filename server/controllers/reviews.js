const Rating = require("../models/Rating");
const Socket = require("../services/socket");

const setRating = async (data) => {
  const { reviewerId, score } = data;
  const rating = await new Rating(data);
  Socket.updateProfileRating(reviewerId, score);
  return await rating.save();
};

module.exports = {
  setRating,
};
