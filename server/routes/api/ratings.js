const { Router } = require("express");

// const Rating = require("../../models/Rating");
const Review = require("../../models/Review");
const User = require("../../models/User");
const {
  setRating,
} = require("../../controllers/reviews");
// const authenticate = require("../../middlewares/authenticate");

const router = Router();

// // get all ratings for a specified userId - GUESS I DON'T NEED THIS FOR NOW
// router.get("/", authenticate, async (req, res) => {
//   try {
//     const ratingData = await Rating.find({ reviewerId: req.user.id });
//     res.status(200).send(ratingData);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });

// create a new rating
router.post("/", async(req, res) => {
  try {
    const { reviewId, score } = req.body;
    const review = await Review.findById(reviewId);
    const { reviewerId, requesterId } = review;       // OR SHOULD I JUST PROVIDE THESE FROM THE FRONT END IN REQ.BODY? IS THIS A SECURITY ISSUE?
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