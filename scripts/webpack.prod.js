const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack'); //to access built-in plugins
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVMODE: false,
    }),
  ]
});
