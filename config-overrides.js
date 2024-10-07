// config-overrides.js
module.exports = {
    webpack: (config, env) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        util: require.resolve('util/'),
      };
      return config;
    },
  };
  