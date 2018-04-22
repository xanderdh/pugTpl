'use strict';

module.exports = function() {
  $.gulp.task('clean', function(cb) {
    return $.del($.config.path.root, cb);
  });
};
