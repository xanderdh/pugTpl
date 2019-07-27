'use strict';

module.exports = function () {
  $.gulp.task('pug:mixin', (done) => {
    let list = JSON.parse($.fs.readFileSync('./source/template/mixins/_mixin-list.json', 'utf8'));
    let pugMixins = '//- ВНИМАНИЕ! Этот файл генерируется автоматически. Не пишите сюда ничего вручную!\n//- Читайте ./README.md для понимания.\n\n';

    list.forEach((path) => {
      pugMixins += 'include ' + path + '\n';
    });
    $.fs.writeFileSync('./source/template/mixins/_mixin-list.pug', pugMixins);

    done();
  });
};
