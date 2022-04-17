module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        alias: config.resolve.alias,
        fallback: {
          fs: require.resolve('browserify-fs'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          path: require.resolve('path-browserify'),
          http: require.resolve('http-browserify'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify')
        }
      };
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/riseup',
        permanent: false,
        basePath: false
      },
      {
        source: '/validate/:address/:quantity',
        permanent: true,
        destination:
          'http://ec2-3-15-199-47.us-east-2.compute.amazonaws.com/validate/:address/:quantity' // Proxy to Backend
      }
    ];
  }
};
