'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch(['./source/style/**/*.scss', './source/template/**/*.scss'], $.gulp.series('sass', 'sass-lint'));
    $.gulp.watch('./source/template/**/*.pug', $.gulp.series(['page-list', 'pug']));    
    $.gulp.watch('./source/template/mixins/_mixin-list.json', $.gulp.series(['pug:mixin']));    
    $.gulp.watch($.config.path.json, $.gulp.series(['pug:data', 'pug']));
    $.gulp.watch('./source/images/**/*.*', $.gulp.series('copy:image'));
    $.gulp.watch('./source/sprite/svg/**/*.*', $.gulp.series('sprite:svg'));
    $.gulp.watch('./source/sprite/png/**/*.*', $.gulp.series('sprite:png'));
  });
};
