const { Router } = require("express");

// const Rating = require("../../models/Rating");
const Review = require("../../models/Review");
const User = require("../../models/User");
const { setRating } = require("../../controllers/reviews");
const { createNotification } = require("../../controllers/notifications");
const authenticate = require("../../middlewares/authenticate");

const router = Router();

// create a new rating
router.post("/", authenticate, async(req, res) => {
  const { reviewId, score } = req.body;
  try {
    const review = await Review.findById(reviewId);
    const { reviewerId, requesterId } = review;

    // verify that poster is requester
    if (req.user.id !== requesterId) return res.sendStatus(401);

    // make the reviews controller save rating info to db and send socket to update FE user
    const rating = await setRating({ reviewId, requesterId, reviewerId, score });

    // make the notifications controller save and send a notification to reviewer
    await createNotification({
      reviewId,
      recipientId: reviewerId,
      counterpartId: requesterId,
      code: 4
    });

    const reviewer = await User.findById(reviewerId);
    reviewer.totalRatings++;
    reviewer.totalRatingsScore += score;
    await reviewer.save();
    res.status(201).send(rating);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;