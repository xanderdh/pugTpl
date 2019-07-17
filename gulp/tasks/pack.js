'use strict';
const _ = require('lodash');
const through = require('through2');
const genProjectName = require('../utils/genProjectName.js');

const OPTION = {
  projectName: 'html_' + genProjectName($.projectName),
  tmpRoot: './tmp',
  ignoredFiles: ['ftp-config.js']
};

const mvFilter = () => through.obj((file, enc, cb) => {
  const {path} = file;

  if (OPTION.ignoredFiles.length) {
    OPTION.ignoredFiles.forEach(fileName => {
      if (~path.indexOf(fileName)) {
        file = null
      }
    });
  }

  return cb(null, file);
});

$.gulp.task('config', done => {
  $.isPacking = true;
  _.remove($.path.jsFoundation, el => !!~el.indexOf('develop-script'));

  return done();
});

$.gulp.task('mv-data', () => {

  return $.gulp.src(['./**/*', '!./node_modules/**/*'])
    .pipe(mvFilter())
    .pipe($.gulp.dest(`${OPTION.tmpRoot}/${OPTION.projectName}`))
});

$.gulp.task('clear-tmp-data', done => $.del(OPTION.tmpRoot, done));

$.gulp.task('zip-project', done => {

  return $.gulp.src(`${OPTION.tmpRoot}/${OPTION.projectName}/**/*`)
    .pipe($.zip(OPTION.projectName + '.zip'))
    .pipe($.gulp.dest(OPTION.tmpRoot))
    .on('end', done);
});

$.gulp.task('deploy-zip', () => {

  return $.gulp.src(`${OPTION.tmpRoot}/${OPTION.projectName}.zip`, {base: '', buffer: false})
    .pipe($.ftp.create($.config.ftpConfig).dest('/zip'))
    .on('error', $.gp.notify.onError({title: 'Deploy'}))
    .pipe($.gp.notify({
      title: 'Deploy',
      message: 'Finished pack deployment.',
      onLast: true
    }));
});

$.gulp.task('clean-zip-ftp', done => {
  $.ftp.create($.config.ftpConfig).rmdir('/zip', done)
});

module.exports = function () {
  $.gulp.task('pack', $.gulp.series(
    'config',
    'clean',
    'page-list',
    'pug:data',
    'pug:mixin',
    'copy:font',
    'fonts:sass',
    'copy:root',
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
    ),
    'mv-data',
    'zip-project',
    'clean-zip-ftp',
    'deploy-zip',
    'clear-tmp-data'
  ));
};

