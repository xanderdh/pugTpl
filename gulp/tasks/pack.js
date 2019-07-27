'use strict';

const through = require('through2');
const genProjectName = require('../utils/genProjectName.js');
const packageJson = require('../../package');
const prompts = require('prompts');
var fs = require('fs');
const projectName = packageJson.name;
const clear = require('clear');

const OPTION = {
  fileName: 'html_' + genProjectName(projectName),
  tmpRoot: './tmp',
  ignoredFiles: ['ftp-config.js']
};

const mvFilter = () => through.obj((file, enc, cb) => {
  const {path} = file;

  if (OPTION.ignoredFiles.length) {
    OPTION.ignoredFiles.forEach(fileName => {
      if (~path.indexOf(fileName)) {
        file = null
      }
    });
  }

  return cb(null, file);
});

$.gulp.task('config', async done => {
  $.isPacking = true;

  if (!projectName) {
    clear();

    let {name} = await prompts({
      type: 'text',
      name: 'name',
      message: 'Enter project name to continue:',
      validate: value => !!value
    });

    name = name ? name.replace(/ /g, '').toLowerCase() : null;

    if (name) {
      packageJson.name = name;

      fs.writeFile('package.json', JSON.stringify(packageJson, null, '  '), (err) => {
        if (err) console.log(err);
        console.log("Successfully written a project name.");
      });

      OPTION.fileName = 'html_' + genProjectName(name);
    }
  }

  return done();
});

$.gulp.task('mv-data', () => {

  return $.gulp.src(['./**/*', './**/.*', '!./node_modules/**/*', '!./tmp/**/*'])
    .pipe(mvFilter())
    .pipe($.gulp.dest(`${OPTION.tmpRoot}/${OPTION.fileName}`))
});

$.gulp.task('clear-tmp-data', done => $.del(OPTION.tmpRoot, done));

$.gulp.task('zip-project', done => {

  return $.gulp.src(`${OPTION.tmpRoot}/${OPTION.fileName}/**/*`)
    .pipe($.zip(OPTION.fileName + '.zip'))
    .pipe($.gulp.dest(OPTION.tmpRoot))
    .on('end', done);
});

$.gulp.task('deploy-zip', () => {

  return $.gulp.src(`${OPTION.tmpRoot}/${OPTION.fileName}.zip`, {base: '', buffer: false})
    .pipe($.ftp.create($.config.ftpConfig).dest('/zip'))
    .on('error', $.gp.notify.onError({title: 'Deploy'}))
    .pipe($.gp.notify({
      title: 'Deploy',
      message: 'Finished pack deployment.',
      onLast: true
    }));
});

$.gulp.task('clean-zip-ftp', done => {
  $.ftp.create($.config.ftpConfig).rmdir('/zip', done)
});

module.exports = function () {
  $.gulp.task('pack', $.gulp.series(
    'config',
    'clean',
    'page-list',
    'pug:data',
    'pug:mixin',
    'copy:font',
    'fonts:sass',
    'copy:root',
    $.gulp.parallel(
      'sass',
      'pug',
      'js:foundation',
      'js:process',
      'copy:image',
      'sprite:svg',
      'sprite:png',
      'css:foundation',
      'sass-lint'
    ),
    'mv-data',
    'zip-project',
    'clean-zip-ftp',
    'deploy-zip',
    'clear-tmp-data'
  ));
};
