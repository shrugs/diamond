'use strict';
import path from 'path';

module.exports = {
  entry: path.resolve(__dirname, 'src/app/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: path.resolve(__dirname, ''),
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/app/styles'),
        loader: 'style!css',
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src/app/scripts'),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        loader: 'file',
      },
    ],
  },
  plugins: [
  ],
};
