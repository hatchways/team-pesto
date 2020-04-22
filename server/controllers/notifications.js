const Notification = require("../models/Notification");
const Socket = require("../services/socket");

const RECEIVED_REVIEW_REQUEST = 1;
const REQUEST_ACCEPTED = 2;
const REQUEST_DECLINED = 3;
const REVIEW_COMPLETED = 4;
const REQUESTER_NEW_POST = 5;
const REVIEWER_NEW_POST = 6;

const createNotification = async data => {
  const { reviewId, recipientId, counterpartName, code } = data;
  const body = { recipient: recipientId };
  switch (code) {
    case RECEIVED_REVIEW_REQUEST:
      body.title = `${counterpartName} has requested your review!`;
      body.link = `reviews/${reviewId}`;
      break;
    case REQUEST_ACCEPTED:
      body.title = `${counterpartName} has accepted your request!`;
      body.link = `requests/${reviewId}`;
      break;
    case REQUEST_DECLINED:
      body.title = `${counterpartName} has declined your request.`;
      body.link = `requests/${reviewId}`;
      break;
    case REVIEW_COMPLETED:
      body.title = `${counterpartName} has marked the review complete!`;
      body.link = `requests/${reviewId}`;
      break;
    case REQUESTER_NEW_POST:
      body.title = `${counterpartName} made a post in your thread!`;
      body.link = `reviews/${reviewId}`;
      break;
    case REVIEWER_NEW_POST:
      body.title = `${counterpartName} made a post in your thread!`;
      body.link = `requests/${reviewId}`;
      break;
    default:
      body.title = "";
      body.link = "";
  }
  const notification = await new Notification(body);
  Socket.sendNotification(notification);
  return await notification.save();
};

const getNotifications = async recipient => {
  return await Notification.find({ recipient });
};

module.exports = {
  createNotification,
  getNotifications,
};