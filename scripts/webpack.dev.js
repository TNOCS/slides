const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack'); //to access built-in plugins

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    // hot: true,
    inline: true,
    port: 8081,
    progress: true,
    stats: {
      cached: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVMODE: true,
    }),
  ]
});
