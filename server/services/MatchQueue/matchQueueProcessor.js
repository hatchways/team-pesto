const Review = require("../../models/Review");
const User = require("../../models/User");
const { createNotification } = require("../../controllers/notifications");
const { addReview } = require("../../controllers/reviews");

const matchQueueProcessor = async (job) => {
  const { reviewId } = job.data;
  const review = await Review.findById(reviewId);

  // end job if review document is missing or no longer pending
  if (!review) return "missing";
  if (review.status !== "pending") return review.status;

  // add current requested reviewer if exists to declined list
  if (review.reviewerId) {
    review.declinedIds.push(review.reviewerId);
    review.reviewerId = null;
  }

  // find requester's proficiency level in review's language
  const requester = await User.findById(review.requesterId);
  let requesterLevel = 0;
  requester.experience.forEach((exp) => {
    if (exp.language === review.language) requesterLevel = exp.level;
  });

  // query for possible reviewers
  let reviewerPool = await User.find({
    _id: { $nin: review.declinedIds, $ne: review.requesterId },
    experience: {
      $elemMatch: {
        language: review.language,
        level: { $gt: requesterLevel },
      },
    },
  });

  // if no reviewer candidates, relax language proficiency requirement
  if (reviewerPool.length <= 0) {
    reviewerPool = await User.find({
      _id: { $nin: review.declinedIds, $ne: review.requesterId },
      experience: {
        $elemMatch: {
          language: review.language,
          level: { $gte: requesterLevel },
        },
      },
    });
  }

  // select random reviewer from pool and assign to review
  if (reviewerPool.length >= 1) {
    const reviewer =
      reviewerPool[Math.floor(Math.random() * reviewerPool.length)];
    review.reviewerId = reviewer.id;
    await review.save();

    // make the review controller fire a socket
    // for reviewer to re-fetch
    addReview(requester.id, reviewer.id);

    // send a notification to the assigned reviewer
    await createNotification({
      reviewId,
      recipientId: reviewer.id,
      counterpartId: requester.id,
      code: 1,
    });
  } else {
    await review.save();
  }

  return review.status;
};

module.exports = matchQueueProcessor;
