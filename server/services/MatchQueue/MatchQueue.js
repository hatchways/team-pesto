const Queue = require("bull");

const { redisUri } = require("../../config/keys");
const matchQueueProcessor = require("./matchQueueProcessor");

const REQUEST_TIMEOUT = 86400000; // 24 hours

const matchQueue = new Queue("match review with reviewer", redisUri);

matchQueue.process(matchQueueProcessor);

matchQueue.on("completed", async (job, result) => {
  const reviewStatus = result;

  // remove completed job from queue
  await job.remove();

  // if review still pending, requeue review
  if (reviewStatus === "pending") {
    await matchQueue.add(job.data, {
      jobId: job.data.reviewId,
      delay: REQUEST_TIMEOUT,
    });
  }
});

const queueReview = async (reviewId) => {
  await matchQueue.add({ reviewId }, { jobId: reviewId });
};

const remove = async (reviewId) => {
  const job = await matchQueue.getJob(reviewId);
  if (job) await job.remove();
};

const promote = async (reviewId) => {
  const job = await matchQueue.getJob(reviewId);
  if (job) await job.remove();
  await queueReview(reviewId);
};

module.exports = {
  queueReview,
  remove,
  promote,
};
