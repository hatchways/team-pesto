const Notification = require("../models/Notification");
const User = require("../models/User");
const Socket = require("../services/socket");

const createNotification = async data => {
  const notification = await new Notification(data);
  // TO DO: EMIT A SOCKET
  return await notification.save();
};

const getNotifications = async recipient => {
  return await Notification.find({ recipient });
};

module.exports = {
  createNotification,
  getNotifications,
};