const { extract } = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app',
  output: {
    filename: 'app.min.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader' , 'css-loader'] },
      // { test: /\.css$/, use: extract({ use: 'css-loader' }) },
    ]
  },
};
