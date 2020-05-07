const Notification = require("../models/Notification");
const User = require("../models/User");
const Socket = require("../services/socket");

const RECEIVED_REVIEW_REQUEST = 1;
const REQUEST_ACCEPTED = 2;
const REVIEW_COMPLETED = 4;
const REQUESTER_NEW_POST = 5;
const REVIEWER_NEW_POST = 6;

const createNotification = async (data) => {
  const { reviewId, recipientId, counterpartId, code } = data;
  const counterpartName = (await User.findById(counterpartId)).name;
  const body = { recipient: recipientId };
  switch (code) {
    case RECEIVED_REVIEW_REQUEST:
      body.title = `${counterpartName} has requested your review!`;
      body.link = `/reviews/${reviewId}`;
      break;
    case REQUEST_ACCEPTED:
      body.title = `${counterpartName} has accepted your request!`;
      body.link = `/requests/${reviewId}`;
      break;
    case REVIEW_COMPLETED:
      body.title = `${counterpartName} has marked the review complete!`;
      body.link = `/reviews/${reviewId}`;
      break;
    case REQUESTER_NEW_POST:
      body.title = `${counterpartName} made a post in your thread!`;
      body.link = `/reviews/${reviewId}`;
      break;
    case REVIEWER_NEW_POST:
      body.title = `${counterpartName} made a post in your thread!`;
      body.link = `/requests/${reviewId}`;
      break;
    default:
      body.title = "";
      body.link = "";
  }
  const notification = new Notification(body);
  Socket.sendNotification(notification);
  await notification.save();
};

const getNotifications = async (recipient) => {
  const notifications = await Notification.find({ recipient });
  return notifications;
};

const markAsRead = async (id) => {
  const notification = await Notification.findById(id);
  notification.seen = true;
  await notification.save();
};

const deleteNotification = async (id) => {
  await Notification.findByIdAndDelete(id);
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};
