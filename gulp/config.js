let gutil = require('gulp-util');

module.exports = {
  ftpConfig: {
    host: 'zaraz.ftp.ukraine.com.ua',
    user: 'zaraz_dev0113',
    password: '1dibp952',
    parallel: 10,
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
      '!./source/style/config/_sprite.scss'
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
  autoprefixerConfig: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
};
