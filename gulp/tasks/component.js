'use strict';

// TODO: add ability to create components with js files (which add\delete automatically to the list of js modules)
// TODO: add ability to create components by the path name

const _ = require('lodash');
const prompts = require('prompts');
const fs = require('fs');
const mkdirp = require('mkdirp');
const clear = require('clear');
var rimraf = require("rimraf");

const COMPONENT = 'TYPE_COMPONENT';
const MIXIN = 'TYPE_MIXIN';
const mixinListPath = './source/template/mixins/_mixin-list.json';

module.exports = function () {
  $.gulp.task('component', async done => {
    clear();

    const promptList = [
      {
        type: 'select',
        name: 'type',
        message: 'Select component type:',
        choices: [
          {title: 'Component', value: COMPONENT},
          {title: 'Mixin', value: MIXIN},
        ],
        initial: 0
      },
      {
        type: 'list',
        name: 'nameList',
        message: (prev, values) => `Select ${values.type === COMPONENT ? 'component' : 'mixin'} name/names:`,
        separator: ',',
        validate: value => !!value
      },
      {
        type: 'toggle',
        name: 'isAddJson',
        message: 'Should to add .json file, uh?',
        initial: false,
        active: 'yes',
        inactive: 'no'
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Confirm the information stated above!',
        initial: true
      }
    ];

    const result = await prompts(promptList);

    if (result.confirm) {
      console.log('----------------------------------------------------');
      createComponent(result);
    } else {
      console.log('----------------------------------------------------');
      console.log('CANCELED');
      console.log('----------------------------------------------------');
    }

    done();
  });

  $.gulp.task('component:del', async done => {
    clear();

    const promptList = [
      {
        type: 'select',
        name: 'type',
        message: 'Select component type:',
        choices: [
          {title: 'Component', value: COMPONENT},
          {title: 'Mixin', value: MIXIN},
        ],
        initial: 0
      },
      {
        type: 'multiselect',
        name: 'deleteList',
        message: (prev, values) => `Select ${values.type === COMPONENT ? 'components' : 'mixins'} to delete:`,
        choices: async (prev, values) => getComponentList(values.type),
        hint: '- Space to select. Return to submit',
        validate: value => !!value
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Is information above correct? (Press \'Y\' to accept)',
        initial: false
      }
    ];

    const result = await prompts(promptList);

    if (result.confirm) {
      console.log('----------------------------------------------------');
      deleteComponent(result)
    } else {
      console.log('----------------------------------------------------');
      console.log('CANCELED');
      console.log('----------------------------------------------------');
    }

    done();
  })
};

// Main
function createComponent({nameList, isAddJson, type}) {
  const mixinList = JSON.parse(fs.readFileSync(mixinListPath, 'utf8'));
  const extensions = ['scss', 'pug'];

  if (isAddJson) {
    extensions.push('json')
  }

  // create component
  nameList.forEach(blockName => {
    let dirPath = `./source/template/${type === COMPONENT ? 'components' : 'mixins'}/${blockName}/`;

    mkdirp(dirPath, (err) => {
      if (err) {
        console.error(`Operation reject: ${err}`);
      } else {
        extensions.forEach((extension) => {
          let filePath = `${dirPath + blockName}.${extension}`;
          let fileContent = '';

          if (extension === 'scss') {
            fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n\n.${blockName} {}\n`;
          } else if (extension === 'pug') {
            if (type === MIXIN) {
              fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(mods)\n\n  //- Принимает:\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}('mod-name1, mod-name2')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + ' ${blockName}--' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)\n    .container\n      h1 Component ${blockName} works !!!`;
            }
            if (type === COMPONENT) {
              fileContent = `.${blockName}\n  .container\n    h1 Component ${blockName} works !!!`
            }
          } else if (extension === 'json') {
            fileContent = `{\n  "id": "${blockName}"\n}`
          }

          if (!fileExist(filePath)) {
            fs.writeFile(filePath, fileContent, (err) => {
              if (err) {
                return console.log(`Файл НЕ создан: ${err}`);
              }
              console.log(`Файл создан: ${filePath}`);
            });
          } else {
            console.log(`Файл уже существует ${filePath}`);
          }
        });

        // Write down this module in _mixin-list.json 
        if (mixinExist(mixinList, blockName)) {
          console.log(`Миксин ${blockName} уже есть в списке`);
        } else {

          if (type === MIXIN) {
            mixinList.push('./' + blockName + '/' + blockName);
            fs.writeFileSync(mixinListPath, JSON.stringify(mixinList, '', 2));

            console.log(`Миксин ${blockName} добавлен в список моксинов`);
          }
        }
      }
    })
  });
}

function deleteComponent({type, deleteList}) {
  const componentFolder = type === COMPONENT ? 'components' : type === MIXIN ? 'mixins' : false;

  if (!componentFolder) {
    console.log('ERR: Undefined component type');
    return;
  }

  deleteList.forEach(folder => {
    const dirPath = `./source/template/${componentFolder}/${folder}`;

    rimraf(dirPath, () => {
      console.log(`deleted ${type === COMPONENT ? 'component' : type === MIXIN ? 'mixin' : 'something'}: ${folder}`)
    });

    if (type === MIXIN) {
      const mixinList = JSON.parse(fs.readFileSync(mixinListPath, 'utf8'));
      fs.writeFileSync(mixinListPath, JSON.stringify(mixinList.filter(item => item.indexOf(folder) === -1), '', 2));
    }
  })
}

// Additional
function fileExist(path) {
  try {
    fs.statSync(path);
    return true
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}

function mixinExist(mixinList, mixinName) {
  let res = false;

  mixinList.forEach((mixin) => {
    if (mixin === '../modules/' + mixinName + '/' + mixinName) res = true;
  });

  return res;
}

function getComponentList(componentType) {
  const folder = componentType === COMPONENT ? 'components' : componentType === MIXIN ? 'mixins' : false;
  const testFolder = `./source/template/${folder}`;
  const fileRegx = /[^\\/]+\.[^\\/]+$/;
  const responseList = [];

  if (!folder) {
    console.log('ERR: Undefined component type');
    return [];
  }


  fs.readdirSync(testFolder).forEach(file => {

    if (!fileRegx.test(file)) {
      responseList.push({title: _.capitalize(file), value: file});
    }

  });

  return responseList;
}
