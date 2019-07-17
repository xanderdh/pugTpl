# Сборка deming-builder

### Before start

1. Clone this repo from master branch
2. Delete .git folder from root
3. `.gitignore` -- Uncomment commented lines to prevent collisions
4. `git init` -- Git init
5. `git remote add origin repo_address_here` -- Set remote origin address
6. `git commit -m "initial commit"` -- Just a commit


### Global Requirement

* Install [node.js](https://nodejs.org)
* `npm install gulpjs/gulp-cli -g` -- Install the latest Gulp CLI tools globally
* `npm install --global yarn` -- Install Yarn global

### Start

* Clone this repo
* `npm i` -- Install all local packages
* `npm start` -- Start development


## Task

1. `npm start` -- Start develop task (serve from ./build)
2. `npm run build` -- Build production version (all compress, no sourcemap, no watcher, no develop scripts)
3. `npm run deploy` -- Push build folder to the ftp (settings in ./gulp/ftp-config.js)
4. `npm run ftp-clean` -- Clean ftp from useless files 
5. `npm run stylelint` -- Check all .scss with stylelint
6. `npm run zip` -- zip current ./build to ./zip
7. `npm run zip-all` -- zip all current project to ./zip
8. `npm run zip-production` -- zip ./build && ./ with running 'production' task
9. `npm run move-root` -- Move root folder to build root
10. `npm run pack` -- Packing all project with build and source. And push to the fpt server

## Structure

```
template/                                # Корень проекта
├── build                                # Скомилированные файлы
├── gulp                                 # Галп таски и конфиги
├──  ├── paths                           # Пути сборки
├──  │   ├── app.js                      # Пути основных скриптов
├──  │   ├── css.foundation              # Пути подключения css из плагинов
├──  │   ├── js.foundation.js            # Пути подключения js из плагинов
├──  │   └── tasks.js                    # Пути тасок
├──  ├── tasks                           # Таски
├──  ├── config.js                       # Галп конфиги
├──  └── ftp-config.js                   # FTP явки, пароли, доступы (секъюрная инфа)
├── zip                                  # Архивы zip таски
├── source                               # Исходники
│   ├── fonts                            # Шрифты
│   ├── images                           # Графика
│   ├── js                               # Скрипты
│   │    ├── controller                  # Контроллеры (js модули)
│   │    │  └── index.js                 # Основная функция контроллера
│   │    ├── utils                       # Утилсы
│   │    ├── app.js                      # Точка подключения всех скриптов (не вендоры)
│   │    ├── constants.js                # Константы
│   │    └── develop-script.js           # Скрипты используемые только при разработке
│   ├── root                             # Отсюда в корень билда (npm run copy:root) и при деплой таске
│   ├── sprite                           # Спрайты (svg\png)
│   ├── style                            # Базовые стили
│   │    ├── base                        # Компоненты (кнопки, инпуты, итд)
│   │    ├── config                      # Конфиги и миксины
│   │    └── app.scss                    # Точка подключения всех не вендорных стилей
│   └── template                         # Pug
│       ├── basic                        # Базовые миксины и их списки
│       │    ├── _mixins.pug             # Дефолтные миксины
│       │    ├── _mixin-list.pug         # Подключение всех миксинов (Генерится програмно)
│       │    └── _mixin-list.json        # Список всех миксинов в json (Можно вручную добавлять + авто добавление при создании модуля)
│       ├── modules                      # Модули (pug & scss)
│       ├── pages                        # Корневые страницы
│       ├── data-tmp.json                # Тут собраны все данные .json (файл генерится автоматически)
│       └── _template.pug                # Шаблон pug (основная структура каждой страницы)
├── package.json                         # Зависимости для node.js
├── gulpfile.js                          # Галп
├── .stylintrc                           # Конфиг линтера
├── .editconfig                          # Конфиг для IDE
├── csscomb.json                         # Конфиг позиционированя css свойств
└── README.md                            # Етот файл
```


## Development

### Pug
*  Docs -- https://pugjs.org/api/getting-started.html
*  Rus Docs Habr -- https://habrahabr.ru/post/278109/

### Yarn
-  Add module example: `yarn add slick-carousel` 
-  Module will add to the node_modules folder and package.json dev-dependencies
