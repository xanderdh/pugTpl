'use strict';

module.exports = function () {
  $.gulp.task('page-list', function (done) {
    let files = $.fs.readdirSync('./source/template/pages/');
    $.pageList = [];

    files.forEach(function (el, i) {
      $.pageList.push(el.replace(/.pug/, '.html'));
    });

    done();
  });
};
