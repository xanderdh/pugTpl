'use strict';

const correctNumber = number => number < 10 ? '0' + number : number;

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = correctNumber(now.getMonth() + 1);
  const day = correctNumber(now.getDate());
  const hours = correctNumber(now.getHours());
  const minutes = correctNumber(now.getMinutes());

  return `${year}-${month}-${day}-${hours}.${minutes}`;
};

module.exports = function() {
  $.gulp.task('zip', (done) => {
    const datetime = getDateTime();
    const zipName = $.dev ? 'build_' + datetime + '.zip' : 'build(production)_' + datetime + '.zip';
    
    $.gulp.src(['build/**/*', '!build/*.zip'])
      .pipe($.zip(zipName))
      .pipe($.gulp.dest($.config.path.zip))
      .on('end', done);    
  });

  $.gulp.task('zip:all', (done) => {
    const datetime = getDateTime();
    const zipName = $.dev ? 'all_' + datetime + '.zip' : 'all(production)_' + datetime + '.zip';

    $.gulp.src(['./**/*', '!./zip/*.zip', '!./package-lock.json', '!./yarn.lock'])
      .pipe($.zip(zipName))
      .pipe($.gulp.dest($.config.path.zip))
      .on('end', done);
  });
};
