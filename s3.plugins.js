module.exports = () => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: "AKIAUH4OLPU6VMEXMRVC",
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      region: "eu-central-1",
      params: {
        Bucket: "stackonfire-dev",
      },
      logger: console, // Only if you want to `stdout` logs
    },
  },
});
