const { Router } = require("express");

const Notification = require("../../models/Notification");

const router = Router();

router.get("/all", async (req, res) => {
  try {
    res.status(200).send(await Notification.find({}));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const recipient = req.params.userId;
    res.status(200).send(await Notification.find({ recipient }));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;