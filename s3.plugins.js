module.exports = () => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: "AKIAUH4OLPU6VMEXMRVC",
      secretAccessKey: "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",
      region: "eu-central-1",
      params: {
        Bucket: "stackonfire-dev",
      },
      logger: console, // Only if you want to `stdout` logs
    },
  },
});
