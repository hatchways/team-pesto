const Notification = require("../models/Notification");
const Socket = require("../services/socket");

const RECEIVED_REVIEW_REQUEST = 1;
const REQUEST_ACCEPTED = 2;
const REQUEST_DECLINED = 3;
const REVIEW_COMPLETED = 4;
const REQUESTOR_NEW_POST = 5;
const REVIEWER_NEW_POST = 6;

const createNotification = async data => {
  const { reviewId, recipient, counterpart, code } = data;
  const body = { recipient: recipient.id };
  switch (code) {
    case RECEIVED_REVIEW_REQUEST:
      body.title = `${counterpart.name} has requested your review!`;
      body.link = `reviews/${reviewId}`;
      break;
    case REQUEST_ACCEPTED:
      body.title = `${counterpart.name} has accepted your request!`;
      body.link = `requests/${reviewId}`;
      break;
    case REQUEST_DECLINED:
      body.title = `${counterpart.name} has declined your request.`;
      body.link = `requests/${reviewId}`;
      break;
    case REVIEW_COMPLETED:
      body.title = `${counterpart.name} has marked the review complete!`;
      body.link = `requests/${reviewId}`;
      break;
    case REQUESTOR_NEW_POST:
      body.title = `${counterpart.name} made a post in your thread!`;
      body.link = `reviews/${reviewId}`;
      break;
    case REVIEWER_NEW_POST:
      body.title = `${counterpart.name} made a post in your thread!`;
      body.link = `requests/${reviewId}`;
      break;
    default:
      body.title = "";
      body.link = "";
  }
  const notification = new Notification(body);
  Socket.sendNotification(notification);
  await notification.save();
};

const getNotifications = async recipient => {
  return await Notification.find({ recipient });
};

module.exports = {
  createNotification,
  getNotifications,
};