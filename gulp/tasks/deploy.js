'use strict';

module.exports = function () {
  $.gulp.task('deploy:ftp', function () {
    return $.gulp.src($.config.path.deploy, {base: '', buffer: false})
      .pipe($.ftp.create($.config.ftpConfig).dest('/'))
      .on('error', $.gp.notify.onError({title: 'Deploy'}))
      .pipe($.gp.notify({
        title: 'Deploy',
        message: 'Finished deployment.',
        onLast: true
      }));
  });
};
