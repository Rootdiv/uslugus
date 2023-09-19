module.exports = {
  apps: [
    {
      name: 'uslugus',
      script: 'index.js',
      watch: 'index.js',
      env: {
        HTTP: 'https',
        PORT: 2606,
      },
    },
  ],
};
