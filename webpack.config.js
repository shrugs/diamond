'use strict';
import path from 'path';

import ReactStylePlugin from 'react-style-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/app/components/app.js'),
    background: path.resolve(__dirname, 'src/background/background.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: path.resolve(__dirname, ''),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/app/styles'),
        loader: ExtractTextPlugin.extract('css-loader'),
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        loaders: [ReactStylePlugin.loader(), 'babel'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        loader: 'copy',
      },
    ],
  },
  plugins: [
    new ReactStylePlugin('styles.bundle.css'),
  ],
  resolveLoader: {
    alias: {
      'copy': 'file-loader?name=[path][name].[ext]&context=./src',
    },
  },
};
