// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; connect-src 'self' https://8d1e9684-10c2-41c3-abf7-1e2b0dea1905-00-33zp7sqa48toa.pike.replit.dev`,
          },
        ],
      },
    ];
  },
};
