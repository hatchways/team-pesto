const Queue = require('bull');

const { redisUri } = require('../../config/keys');
const matchQueueProcessor  = require('./matchQueueProcessor');

const REQUEST_TIMEOUT = 86400000  // 24 hours

const matchQueue = new Queue('match review with reviewer', redisUri);

matchQueue.process(matchQueueProcessor);

matchQueue.on('completed', async (job, result) => {
  const reviewStatus = result;

  // if review still pending, requeue review
  if (reviewStatus === 'pending') {
    await matchQueue.add(job.data, { delay: REQUEST_TIMEOUT });
  }

  // remove completed job from queue
  job.remove();
});

module.exports = {
  queueReview: async (reviewId) => {
    await matchQueue.add({ reviewId });
  },
};
