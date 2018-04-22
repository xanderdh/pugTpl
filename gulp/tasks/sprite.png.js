// задача - cоздание прайтов из png исходников

'use strict';

module.exports = function () {
  $.gulp.task('sprite:png', function () {
    let spriteData = $.gulp.src('./source/sprite/png/*.png').pipe($.gp.spritesmith({
      imgName: 'sprite.png', // итоговый спрайт
      cssName: '_sprite.scss', // файл стилей
      imgPath: '../img/sprite.png',
      algorithm: 'left-right',
      padding: 20
    }));
    let imgStream = spriteData.img
      .pipe($.gulp.dest($.config.path.root + '/assets/img')); // путь куда записываем спрайт

    let cssStream = spriteData.css
      .pipe($.gulp.dest('./source/style/config')); // путь куда записываем файл стилей для спрайта

    return $.merge(imgStream, cssStream);
  });

};
