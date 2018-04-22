# Сборка deming-builder


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
3. `npm run deploy` -- Push build folder to the ftp (settings in ./gulp/config.js)
4. `npm run ftp-clean` -- Clean ftp from useless files 
5. `npm run stylelint` -- Check all .scss with stylelint
6. `npm run zip` -- zip current ./build to ./zip
7. `npm run zip-all` -- zip all current project to ./zip
8. `npm run zip-production` -- zip ./build && ./ with running 'production' task
9. `npm run move-root` -- Move root folder to build root

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
├──  └── config.js                       # Галп конфиги
├── zip                                  # Архивы zip таски
├── source                               # Исходники
│   ├── fonts                            # Шрифты
│   ├── images                           # Графика
│   ├── js                               # Скрипты
│   │    ├── controller                  # Контроллеры (js модули)
│   │    ├── app.js                      # Точка подключения всех скриптов (не вендоры)
│   │    ├── constants.js                # Константы
│   │    ├── develop-script.js           # Скрипты используемые только при разработке
│   │    ├── global.js                   # Скрипты которые лягут в глобальную область
│   │    └── modules.js                  # Переиспользуемые функции
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
