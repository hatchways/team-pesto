const multer = require("multer");
const multers3 = require("multer-s3");
const AWS = require("aws-sdk");

const {  awsBucketName,
    awsAccessKeyId,
    awsSecretAccessKey,
    awsRegion,
  } = require("../config/keys");

  const s3 = new AWS.S3({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion,
  });
  
  const uploadS3 = multer({
    storage: multers3({
      s3: s3,
      acl: "public-read",
      bucket: awsBucketName,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + "-" + file.originalname);
      },
    }),
  });

  module.exports = uploadS3