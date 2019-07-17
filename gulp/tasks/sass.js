'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src($.config.path.sassSourceFiles)      
      .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
      .pipe($.bulkSass())       
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.csscomb($.config.cssCombConfig))
      .pipe($.gp.postcss([
        $.mqpacker({
          sort: $.sortCss.desktopFirst
        })
      ]))
      .pipe($.gp.if(!$.dev, $.gp.csso()))
      .pipe($.gp.if($.dev && !$.isPacking, $.gp.sourcemaps.write()))
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.min' })))
      .pipe($.gulp.dest($.config.path.root + '/assets/css'))
      .pipe($.browserSync.stream());
  });
};
