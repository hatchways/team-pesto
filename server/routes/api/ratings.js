const { Router } = require("express");

// const Rating = require("../../models/Rating");
const Review = require("../../models/Review");
const User = require("../../models/User");
const {
  setRating,
} = require("../../controllers/reviews");
const authenticate = require("../../middlewares/authenticate");

const router = Router();

// create a new rating
router.post("/",
// authenticate,
async(req, res) => {
  const { reviewId, score } = req.body;
  try {
    const review = await Review.findById(reviewId);
    const { reviewerId, requesterId } = review;

    // verify that poster is requester
    // if (req.user.id !== requesterId) return res.sendStatus(401);

    const rating = await setRating({ reviewId, requesterId, reviewerId, score });
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