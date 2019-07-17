'use strict';
const genProjectName = require('../utils/genProjectName.js');

module.exports = function () {
  $.gulp.task('zip', (done) => {
    const name = genProjectName($.projectName);
    const zipName = $.dev ? 'build_' + name + '.zip' : 'build(production)_' + name + '.zip';

    $.gulp.src(['build/**/*', '!build/*.zip'])
      .pipe($.zip(zipName))
      .pipe($.gulp.dest($.config.path.zip))
      .on('end', done);
  });

  $.gulp.task('zip:all', (done) => {
    const name = genProjectName($.projectName);
    const zipName = $.dev ? 'all_' + name + '.zip' : 'all(production)_' + name + '.zip';

    $.gulp.src(['./**/*', '!./zip/*.zip', '!./package-lock.json', '!./yarn.lock'])
      .pipe($.zip(zipName))
      .pipe($.gulp.dest($.config.path.zip))
      .on('end', done);
  });
};
