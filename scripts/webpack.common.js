const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

//new webpack.HotModuleReplacementPlugin()
const title = 'Slides';

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.ts',
    // print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'url-loader?limit=8192', // 'file-loader' is used as url-loader fallback anyways
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    /** Added to ignore mjs files (for now), which throw an error */
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/reveal',
      },
      { from: 'content', to: 'content' }
    ]),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ title: title, favicon: 'src/assets/favicon.ico' }),
  ],
};
