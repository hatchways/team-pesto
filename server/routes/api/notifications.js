const { Router } = require("express");

const authenticate = require("../../middlewares/authenticate");
const Notification = require("../../models/Notification");
const Socket = require("../../services/socket");
const {
  createNotification,
  getNotifications,
} = require("../../controllers/notifications");

const router = Router();

// get all notifications for a specified userId
router.get("/", authenticate, async (req, res) => {
  try {
    const notificationData = await getNotifications(req.user.id);
    res.status(200).send(notificationData);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async(req, res) => {
  try {
    const notification = await createNotification(req.body);
    res.status(200).send(notification);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;