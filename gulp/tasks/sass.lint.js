'use strict';

module.exports = function () {
  $.gulp.task('sass-lint', () => {

    const stylelintConfig = {};

    return $.gulp.src($.config.path.sassLint)
      .pipe($.gp.postcss([
        $.stylelint(stylelintConfig),
        $.postReporter({
          clearAllMessages: true
        })
      ], {syntax: $.syntax_scss}))
  });
};
