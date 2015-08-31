'use strict';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, 'src/app/components/app.js'),
    background: path.resolve(__dirname, 'src/background/background.js'),
    styles: path.resolve(__dirname, 'src/app/styles/main.scss'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: path.resolve(__dirname, ''),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/app/styles'),
        loader: ExtractTextPlugin.extract('css?sourceMap!' + 'sass?sourceMap'),
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$/,
        loader: 'copy',
      },
      {
        test: require.resolve('react'),
        loader: 'expose?React',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.bundle.css'),
  ],
  resolveLoader: {
    alias: {
      'copy': 'file-loader?name=[path][name].[ext]&context=./src',
    },
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, '/node_modules/react'),
      'react/addons': path.join(__dirname, '/node_modules/react/addons'),
      // 'material-ui': path.join(__dirname, '/node_modules/material-ui-io'),
      'material-ui': 'material-ui-io',
    },
  },
};
