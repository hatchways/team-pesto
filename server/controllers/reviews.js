const Rating = require("../models/Rating");
// const Socket = require("../services/socket");

const setRating = async data => {
  const rating = await new Rating(data);
  return await rating.save();
};

module.exports = {
  setRating,
};