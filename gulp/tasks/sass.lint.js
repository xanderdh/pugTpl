'use strict';

module.exports = function () {
  $.gulp.task('sass-lint', function (done) {

    const stylelintConfig = {};

    return $.gulp.src($.config.path.sassLint)
      .pipe($.gp.postcss([
        $.stylelint(stylelintConfig),
        $.postReporter({
          clearAllMessages: true,
          throwError: true
        })
      ], {syntax: $.syntax_scss}))
      .on('error', (e) => {
        let file = e.fileName.split('\\');
        file = file[file.length - 1];

        $.notifier.notify({
          title: 'Sass-Lint Warning!!!',
          message: 'Check: ' + file
        });
        done();
      })
  });
};
