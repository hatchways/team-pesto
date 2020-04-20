const Notification = require("../models/Notification");
const Socket = require("../services/socket");

/*
NOTIFICATION CODES:
1 - you have been assigned to do a review
2 - your request has been matched with someone
3 - your reviewer has accepted your request
4 - your reviewer has declined your request
5 - your reviewer has completed your request
6 - your requestor has made a new post in the thread
7 - your reviewer has made a new post in the thread
*/

const createNotification = async data => {
  const { reviewId, recipient, counterpart, code } = data;
  const body = { recipient: recipient.id };
  switch (code) {
    case 1:
      body.title = `${counterpart.name} has requested your review!`;
      body.link = `reviews/${reviewId}`;
      break;
    case 2:
      body.title = `Your request has been matched with ${counterpart.name}!`;
      body.link = `requests/${reviewId}`;
      break;
    case 3:
      body.title = `${counterpart.name} has accepted your request!`;
      body.link = `requests/${reviewId}`;
      break;
    case 4:
      body.title = `${counterpart.name} has declined your request.`;
      body.link = `requests/${reviewId}`;
      break;
    case 5:
      body.title = `${counterpart.name} has completed your request!`;
      body.link = `requests/${reviewId}`;
      break;
    case 6:
      body.title = `${counterpart.name} made a post in your thread!`;
      body.link = `reviews/${reviewId}`;
      break;
    case 7:
      body.title = `${counterpart.name} made a post in your thread!`;
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