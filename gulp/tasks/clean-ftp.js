'use strict';

module.exports = function() {
  $.gulp.task('ftp-clean', function() {   
    return $.ftp.create($.config.ftpConfig).clean('/**', './build', { base: '/' });
  });
};
