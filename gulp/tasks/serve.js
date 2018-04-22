'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: false,
      server: $.config.path.root
    });

    $.browserSync.watch([$.config.path.root + '/**/*.*', '!**/*.css', '!**/*.html'], $.browserSync.reload);
  });
};
