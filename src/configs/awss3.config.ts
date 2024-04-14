const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

const S3client = new AWS.S3({
  params: {
    Bucket: process.env.AWS_S3_BUCKET
  },
  region: process.env.AWS_REGION
});

module.exports = S3client;

export {};