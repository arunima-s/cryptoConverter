
// vite.config.js
export default {
  server: {
    proxy: {
      '/v1': {
        target: 'https://pro-api.coinmarketcap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''),
      },
    },
  },
};     