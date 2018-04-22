'use strict';

var exampleTemplate = {
  dest: '../../../template-svg.html' // демо html
};

module.exports = function () {
  $.gulp.task('sprite:svg', function () {
    return $.gulp.src('./source/sprite/svg/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.if($.config.svgConfig.rmStyle, $.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        }
      })))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            example: $.dev ? exampleTemplate : false
          }
        }
      }))
      .pipe($.gulp.dest($.config.path.root + '/assets/img'))
  })
};
