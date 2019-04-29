'use strict';

module.exports = function() {
  $.gulp.task('fonts:sass', function() {
    return $.gulp.src('./source/style/fonts.scss')      
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.csscomb($.config.cssCombConfig))
      .pipe($.gp.postcss([
        $.mqpacker({
          sort: $.sortCss.desktopFirst
        })
      ]))     
      .pipe($.gulp.dest('./source/fonts'))      
  });
};
