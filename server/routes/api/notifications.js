const { Router } = require("express");

const Notification = require("../../models/Notification");

const Socket = require("../../services/socket");

const router = Router();

// get all notifications for a specified userId
router.get("/", async (req, res) => {
  try {
    const recipient = req.user.id;
    res.status(200).send(await Notification.find({ recipient }));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;