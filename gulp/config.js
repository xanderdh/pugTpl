const gutil = require('gulp-util');

let ftpConfig;
try {
  ftpConfig = require('./ftp-config');
} catch (e) {
  ftpConfig = {
    host: '',
    user: '',
    password: '',
  }
}

module.exports = {
  ftpConfig: {
    ...ftpConfig, // Use ftp-config.js instead, for secure reason
    parallel: 7,
    log: gutil.log
  },

  path: {
    root: './build',
    deploy: ['./build/**/*.*', './source/root/**/*.*', './source/root/.htaccess'],
    sassSourceFiles: ['./source/style/app.scss'],
    sassLint: [
      './source/style/**/*.scss',
      './source/template/modules/**/*.scss',
      './source/template/base/**/*.scss',
      '!./source/style/config/_mixins.scss',
      '!./source/style/config/_sprite.scss',
      '!./source/style/fonts.scss'
    ],
    zip: './zip',
    json: [
      './source/template/modules/**/*.json'
    ]
  },

  svgConfig: {
    rmStyle: true //false to disable removing ['fill', 'stroke', 'style'] from svg
  },

  imgConfig: {
    interlaced: true,
    progressive: true,
    optimizationLevel: 5
  },
  autoprefixerConfig: ['last 2 version', '> 1%', 'ie 10', 'Opera 12.1']
};
