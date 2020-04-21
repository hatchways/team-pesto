const { Router } = require("express");

const Rating = require("../../models/Rating");
const authenticate = require("../../middlewares/authenticate");

const router = Router();

// get all ratings for a specified userId
router.get("/", authenticate, async (req, res) => {
  try {
    const ratingData = await Rating.find({ reviewerId: req.user.id });
    res.status(200).send(ratingData);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// const getNotifications = async recipient => {
//   return await Notification.find({ recipient });
// };

// router.post("/", async(req, res) => {
//   try {
//     const notification = await createNotification(req.body);
//     res.status(200).send(notification);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });

module.exports = router;