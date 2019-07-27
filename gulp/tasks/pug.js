'use strict';

const strip = require('gulp-strip-comments');

module.exports = function() {
  const patterns = [];
  $.gulp.task('pug', function() {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: `?rel=${Math.ceil(Math.random()*100000)}` });

    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.data(function() {        
        return JSON.parse($.fs.readFileSync('./source/template/data-tmp.json'))
      }))
      .on('error', $.gp.notify.onError({ title: 'Pug after json data' }))
      .pipe($.gp.pug({ pretty: true }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        };
      }))
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe(strip({safe: true})) // clear code comments
      .pipe($.gulp.dest($.config.path.root))
      .pipe($.browserSync.stream({once: true}));
  });
};
