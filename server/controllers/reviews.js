const Rating = require("../models/Rating");
const Message = require("../models/Message");
const Socket = require("../services/socket");

const addReview = (requesterId, reviewerId) => {
  Socket.refetch(requesterId, reviewerId);
};

const setRating = async (data) => {
  const { reviewerId, score } = data;
  try {
    // create the new rating
    const rating = await new Rating(data);

    // fire a socket to update user's FE user object
    Socket.updateProfileRating(reviewerId, score);

    await rating.save();
  } catch(err) {
    console.error(err);
  }
};

const newMessage = async (data, request) => {
  try {
    // create the new message
    const message = await new Message(data);

    // push the new message id into the request's message array
    request.messages.push(message['_id']);
    await request.save();

    // populate message's author field with that user's
    // name and image, so it can be rendered on front end
    await message.populate({
      path: "author",
      model: "user",
      select: "name image",
    }).execPopulate();

    // fire a socket to update both parties' FE reviews data
    Socket.addNewPost(request, message);

    return await message.save();
  } catch(err) {
    console.error(err);
  }
};

module.exports = {
  addReview,
  setRating,
  newMessage,
};
