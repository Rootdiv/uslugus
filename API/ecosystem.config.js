module.exports = {
  apps: [
    {
      name: 'uslugus',
      script: 'index.js',
      watch: 'index.js',
      env: {
        PROD: true,
        PORT: 2606,
      },
    },
  ],
};
