'use strict';

module.exports = function () {
  $.gulp.task('js:process', function () {
    let sourcePath = $.path.app.src,
      bundles = $.path.app.bundles;

    let bundled = bundles.map(function (bundle) {
      return $.browserify({
        entries: sourcePath + bundle,
        debug: !$.isPacking
      })
        .transform(
          $.babel,
          {
            presets: ['babel-preset-latest'],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        )
        .bundle()
        .on('error', $.gp.notify.onError({title: 'JS'}))
        .pipe($.source(bundle))
        .pipe($.buffer())
        .pipe($.gp.if($.dev && !$.isPacking, $.gp.sourcemaps.init({
          loadMaps: true
        })))
        .pipe($.gulp.dest($.config.path.root + '/assets/js'))
        .pipe($.gp.if(!$.dev, $.gp.uglify()))
        .pipe($.gp.if($.dev && !$.isPacking, $.gp.sourcemaps.write('./maps')))
        .pipe($.gp.if(!$.dev, $.gp.rename({suffix: '.min'})))
        .pipe($.gulp.dest($.config.path.root + '/assets/js'));
    });

    return $.merge(bundled);
  });
};
