'use strict';

module.exports = function() {
  
  let path = require('path');

  $.gulp.task('pug:data', function(done) {
    return $.gulp.src($.config.path.json)
      .pipe($.mergeJson({
        fileName: 'data-tmp.json',
        edit: (json, file) => {
          // Extract the filename and strip the extension
          let filename = path.basename(file.path),
            primaryKey = filename.replace(path.extname(filename), '');

          // Set the filename as the primary key for our JSON data
          let data = {};
          data[primaryKey.toLowerCase()] = json;

          return data;
        }
      }))
      .on('error', (e) => {           
        $.notifier.notify({
          title: 'Проблемки (pug.data)',
          message: 'json кривой.'
        });
        done();
      })
      .pipe($.gulp.dest('./source/template'));
  });
};
