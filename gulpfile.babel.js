'use strict';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import imagemin from 'gulp-imagemin';

import path from 'path';

// default to build-bev
gulp.task('default', ['watch-dev']);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('watch-dev', ['build-dev'], () => {
  gulp.watch(['src/**/*'], ['build-dev']);
});

// Dev build
gulp.task('build-dev', ['copy-images-dev', 'copy-files-dev', 'copy-locales-dev', 'webpack:build-dev']);

// Production build
gulp.task('build', ['copy-images', 'copy-files', 'copy-locales', 'webpack:build']);

// just copy the images for dev
gulp.task('copy-images-dev', () => {
  return gulp.src('src/app/images/*')
    .pipe(gulp.dest('build/images/'));
});

// Production image processing
gulp.task('copy-images', () => {
  return gulp.src('src/app/images/*')
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('dist/images/'));
});

// copy files to build
gulp.task('copy-files-dev', () => {
  return gulp.src([
    'src/index.html',
    'src/manifest.json',
  ])
  .pipe(gulp.dest('build/'));
});

// copy _locales
gulp.task('copy-locales-dev', () => {
  return gulp.src('src/_locales/**/*')
    .pipe(gulp.dest('build/_locales'));
});

// copy _locales for production
gulp.task('copy-locales', () => {
  return gulp.src('src/_locales/**/*')
    .pipe(gulp.dest('dist/_locales'));
});

// copy files to dist
gulp.task('copy-files', () => {
  return gulp.src('src/{index.html,manifest.json}')
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack:build', (callback) => {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  myConfig.output.path = path.resolve(__dirname, 'dist');
  myConfig.debug = false;
  myConfig.devtool = false;

  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', (callback) => {
  // run webpack
  devCompiler.run((err, stats) => {
    if(err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true,
    }));
    callback();
  });
});
