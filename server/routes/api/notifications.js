const { Router } = require("express");

const Notification = require("../../models/Notification");

const Socket = require("../../services/socket");

const router = Router();

// get all notifications
router.get("/all", async (req, res) => {
  try {
    res.status(200).send(await Notification.find({}));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// get all notifications for a specified userId
router.get("/:userId", async (req, res) => {
  try {
    const recipient = req.params.userId;
    res.status(200).send(await Notification.find({ recipient }));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// create notification
router.post("/", async (req, res) => {
  try {
    const { recipient, title } = data;
    const notification = await new Notification({
      recipient,
      title,
    }).save();
    Socket.sendNotification(notification);
    res.status(200).send(notification);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;