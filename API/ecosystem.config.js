module.exports = {
  apps : [{
    name: 'uslugus',
    script: 'index.js',
    watch: '.',
    env: {
        HTTP: 'https',
        PORT : 2606
      },
  }],
};
