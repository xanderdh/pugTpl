'use strict';

module.exports = function () {
  $.gulp.task('copy:image', function () {
    return $.gulp.src('./source/images/**/*.*')      
      .pipe($.gp.if(!$.dev, $.imagemin($.config.imgConfig)))
      .pipe($.gulp.dest($.config.path.root + '/assets/img'));
  });
};
