'use strict';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

global.$ = {
  isPacking: false,
  dev: isDevelopment,
  package: require('./package.json'),
  config: require('./gulp/config'),
  cssCombConfig: require("./csscomb.json"),
  pageList: [],
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gutil: require('gulp-util'),
  gulp: require('gulp'),
  del: require('del'),
  merge: require('merge-stream'),
  mergeJson: require('gulp-merge-json'),
  mqpacker: require("css-mqpacker"),
  browserify: require('browserify'),
  postReporter: require("postcss-reporter"),
  syntax_scss: require('postcss-scss'),
  source: require('vinyl-source-stream'),
  buffer: require('vinyl-buffer'),
  babel: require('babelify'),
  sortCss: require("sort-css-media-queries"),
  browserSync: require('browser-sync').create(),
  fs: require('fs'),
  ftp: require('vinyl-ftp'),
  imagemin: require('gulp-imagemin'),
  stylelint: require('stylelint'),
  bulkSass: require('gulp-sass-glob-import'),
  notifier: require('node-notifier'),
  zip: require('gulp-zip'),
  data: require('gulp-data'),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replaceTask'
    }
  })
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  'page-list',
  'pug:data',
  'pug:mixin',
  'copy:font',
  'fonts:sass',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'copy:image',
    'sprite:svg',
    'sprite:png',
    'css:foundation'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

$.gulp.task('build', $.gulp.series(
  'clean',
  'pug:data',
  'pug:mixin',
  'copy:font',
  'fonts:sass',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'copy:image',
    'sprite:svg',
    'sprite:png',
    'css:foundation',
    'sass-lint'
  )
));

$.gulp.task('deploy', $.gulp.series(
  'deploy:ftp'
));

$.gulp.task('zip:production', $.gulp.series(
  'build',
  'zip'
));
