const { Router } = require("express");

const authenticate = require("../../middlewares/authenticate");
const {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
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

router.post("/", async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).send(notification);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await markAsRead(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteNotification(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
