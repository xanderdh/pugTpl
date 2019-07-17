`use strict`;

const fs = require('fs');
const mkdirp = require('mkdirp');

const blockNames = process.argv.slice(2);
const mixinList = JSON.parse(fs.readFileSync('./source/template/mixins/_mixin-list.json', 'utf8'));

const extensions = ['scss', 'pug', 'json'];


if (blockNames) {
  
  blockNames.forEach((blockName) => {
    let dirPath = `./source/template/modules/${blockName}/`;
    
    mkdirp(dirPath, (err) => {
      if (err) {
        console.error(`Operation reject: ${err}`);
      } else {
        extensions.forEach((extension) => {
          let filePath = `${dirPath + blockName}.${extension}`;
          let fileContent = '';

          if (extension === 'scss') {
            fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов, \n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n\n.${blockName} {}\n`;
          } else if (extension === 'pug') {
            //TODO: Think over more useful .pug content
            fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(mods)\n\n  //- Принимает:\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}('mod-name1, mod-name2')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + ' ${blockName}--' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)\n    .container`;
          } else if (extension === 'json') {
            fileContent = `{\n  "id": "${blockName}"\n}`
          }

          if (fileExist(filePath) === false) {
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

        //write to mixin list this module
        if(mixinExist(blockName)) {
          console.log(`Миксин ${blockName} уже есть в списке`);
        } else {
          
          mixinList.paths.push('../modules/' + blockName + '/' + blockName);          
          fs.writeFileSync('./source/template/mixins/_mixin-list.json', JSON.stringify(mixinList, '', 2));
          
          console.log(`Миксин ${blockName} добавлен в список моксинов`);
        }
       
      }
    })
  })
  
} else {
  console.log('Please enter Module-names')
}

function fileExist(path) {
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}

function mixinExist(mixinName) {
  let res = false;
  
  mixinList.paths.forEach((mixin)=>{    
    if(mixin === '../modules/' + mixinName + '/' + mixinName) res = true;
  });
  
  return res;
}
