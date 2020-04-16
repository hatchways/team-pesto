const Queue = require('bull');

const Review = require('../models/Review');
const User = require('../models/User');

// const REQUEST_TIMEOUT = 86400000  // 24 hours
const REQUEST_TIMEOUT = 30000

// find and match reviewer to review
const matchReviewer = async (review) => {
  // add current requested reviewer if exists to declined list
  if (review.reviewerId) {
    review.declinedIds.push(review.reviewerId);
    review.reviewerId = null;
  }

  // find requester's proficiency level in review's language
  const requester = await User.findById(review.requesterId);
  let requesterLevel = 0;
  for (const exp of requester.experience) {
    if (exp.language === review.language) {
      requesterLevel = exp.level;
      break;
    }
  }

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
    const reviewer = reviewerPool[Math.floor(Math.random() * reviewerPool.length)];
    review.reviewerId = reviewer.id;
    await review.save();
  }

  // upon matching or if no reviewer candidates,
  // requeue job with delay = request timeout
  await matchQueue.add({ reviewId: review.id }, { delay: REQUEST_TIMEOUT });
};


const matchQueue = new Queue('match review with reviewer', 'redis://172.17.0.2:6379');

matchQueue.process(async (job) => {
  const { reviewId } = job.data;
  const review = await Review.findById(reviewId);
  
  // remove job from queue if review document is missing or no longer pending
  if (!review || review.status !== 'pending') {
    await matchQueue.removeRepeatableByKey(job.key);
    return;
  }

  // match review with another reviewer
  await matchReviewer(review);
  return;
});

matchQueue.on('completed', job => { job.remove() });

matchQueue.on('error', error => { console.error(error) });

const queueReview = async (reviewId) => {
  await matchQueue.add({ reviewId });
};

exports.queueReview = queueReview;
