module.exports = {
  apps: [
    {
      name: 'uslugus',
      script: 'index.js',
      watch: 'index.js',
      env: {
        HTTPS: true,
        PORT: 2606,
      },
    },
  ],
};
