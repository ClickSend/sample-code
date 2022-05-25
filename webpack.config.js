const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  mode: 'production',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
      fallback: {
          "fs": false
      },
  }
};