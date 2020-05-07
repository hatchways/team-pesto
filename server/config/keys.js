module.exports = {
  mongoUri: process.env.MONGO_URI,
  passportSecret: process.env.PASSPORT_SECRET,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  redisUri: process.env.REDIS_URI,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
};
