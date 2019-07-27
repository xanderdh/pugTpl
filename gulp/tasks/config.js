'use strict';

const prompts = require('prompts');
const fs = require('fs');
const clear = require('clear');
let packageJson = require('../../package');

let ftpConfig = null;

try {
  ftpConfig = require('../ftp-config');
} catch (e) {
}

module.exports = function () {
  $.gulp.task('config', async done => {
    clear();

    const promptsFields = [
      {
        type: 'text',
        name: 'name',
        initial: packageJson.name ? packageJson.name : '',
        message: 'Project name:',
        validate: value => !!value
      },
      {
        initial: ftpConfig && ftpConfig.host,
        type: 'text',
        name: 'host',
        message: 'FTP host name:',
        validate: value => !!value
      },
      {
        initial: ftpConfig && ftpConfig.user,
        type: 'text',
        name: 'user',
        message: 'FTP user name:',
        validate: value => !!value
      },
      {
        initial: ftpConfig && ftpConfig.password,
        type: 'password',
        name: 'password',
        message: 'FTP host password:',
        validate: value => !!value
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are U sure want to save the date above?',
        initial: true
      }
    ];

    const promptsResult = await prompts(promptsFields);

    if (promptsResult.confirm) {

      // save into package.json     
      packageJson.name = promptsResult.name.replace(/ /g, '').toLowerCase();
      fs.writeFile('package.json', JSON.stringify(packageJson, null, '  '), err => {
        if (err) console.log(err);
      });

      // save FTP config
      fs.writeFile('gulp/ftp-config.json', JSON.stringify({
        host: promptsResult.host,
        user: promptsResult.user,
        password: promptsResult.password
      }), null, err => {
        if (err) console.log(err);
      });
      
      // create ignored files
      createPagDataFile();
    }
    
    done();
  })
};

function createPagDataFile() {
  fs.writeFile('source/template/data-tmp.json', JSON.stringify({}), null, err => {
    if (err) console.log(err);
  });
}
