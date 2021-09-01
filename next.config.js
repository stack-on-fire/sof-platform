module.exports = {
  images: {
    domains: ["sof-og-image.vercel.app", "avatars.githubusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
