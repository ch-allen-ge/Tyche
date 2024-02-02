const path = require('path');

module.exports = {
  name: 'server',
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'build.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
};