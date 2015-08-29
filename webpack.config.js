'use strict';
import path from 'path';
// import TransferWebpackPlugin from 'transfer-webpack-plugin';

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
        loader: 'style!css',
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        loader: 'copy',
      },
    ],
  },
  plugins: [
    // new TransferWebpackPlugin([
    //   { from: '_locales', to: '_locales' },
    //   { from: 'app/images', to: 'app/images'},
    // ], path.resolve(__dirname, 'src')),
  ],
  resolveLoader: {
    alias: {
      'copy': 'file-loader?name=[path][name].[ext]&context=./src',
    },
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'src/bower_components/react/react-with-addons.js'),
      'react-router': path.resolve(__dirname, 'src/bower_components/react-router/build/umd/ReactRouter.js'),
    },
  },
};
