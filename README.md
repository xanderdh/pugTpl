# Сборка deming-builder

### Before start

1. Clone this repo from master branch
2. Delete .git folder from root
3. `git init` -- Git init
4. `git remote add origin repo_address_here` -- Set remote origin address
5. `git commit -m "initial commit"` -- First commit


### Global Requirement

* Install [node.js](https://nodejs.org)
* `npm install gulpjs/gulp-cli -g` -- Install the latest Gulp CLI tools globally
* `npm install --global yarn` -- Install Yarn global

### Start

* `yarn install` -- Install all local packages
* `yarn cfg` -- Configure your project
* `yarn start` -- Start development


## Task

0. `yarn cfg` -- Configure your project
1. `yarn start` -- Start develop task (serve from ./build)
2. `yarn build` -- Build production version (all compress, no sourcemap, no watcher)
3. `yarn deploy` -- Push build folder to the ftp
4. `yarn ftp-clean` -- Clean ftp from useless files 
5. `yarn stylelint` -- Check all .scss with stylelint
6. `yarn zip` -- zip current ./build to ./zip
7. `yarn zip-all` -- zip all current project to ./zip
8. `yarn zip-production` -- zip ./build && ./ with running 'production' task
9. `yarn move-root` -- Move root folder to build root
10. `yarn pack` -- Packing all project with build and source. And push to the fpt server
11. `yarn component` -- Create component or mixin via console menu.
12. `yarn component:del` -- Delete component or mixin list programmatically


## Structure

```
template/                                # Корень проекта
├── build                                # Скомилированные файлы
├── gulp                                 # Галп таски и конфиги
│    ├── paths                           # Пути сборки
│    │   ├── app.js                      # Пути основных скриптов
│    │   ├── css.foundation              # Пути подключения css из плагинов
│    │   ├── js.foundation.js            # Пути подключения js из плагинов
│    │   └── tasks.js                    # Пути тасок
│    ├── tasks                           # Таски
│    ├── config.js                       # Галп конфиги
│    └── ftp-config.json                 # FTP config (Генерится програмно) (.ignored)
├── zip                                  # Архивы `yarn zip`
├── source                               # Исходники
│   ├── fonts                            # Шрифты
│   ├── images                           # Графика
│   ├── js                               # Скрипты
│   │    ├── controller                  # Контроллеры (js модули)
│   │    │  └── index.js                 # Основная функция контроллера
│   │    ├── utils                       # Утилсы
│   │    ├── app.js                      # Точка подключения всех скриптов (не вендоры)
│   │    └── constants.js                # Константы
│   ├── root                             # Отсюда в корень билда (npm run copy:root) и при деплой таске
│   ├── sprite                           # Спрайты (svg\png)
│   ├── style                            # Базовые стили
│   │    ├── base                        # Компоненты (кнопки, инпуты, итд)
│   │    ├── config                      # Конфиги и миксины
│   │    └── app.scss                    # Точка подключения всех не вендорных стилей
│   └── template                         # Pug
│       ├── develop-only                 # Модули необходимые исключительно для дева
│       ├── mixins                       # Миксины
│       │    ├── _mixin-list.pug         # Подключение всех миксинов (Генерится програмно) (.ignored)
│       │    └── _mixin-list.json        # Список всех миксинов в json (Можно вручную добавлять + авто добавление при создании модуля)
│       ├── components                   # Копмоненты\модули (все что НЕ миксины)
│       ├── pages                        # Корневые страницы
│       ├── data-tmp.json                # Тут собраны все данные .json (файл генерится автоматически) (.ignored)
│       └── _template.pug                # Шаблон pug (основная структура каждой страницы)
├── package.json                         # Зависимости для node.js
├── gulpfile.js                          # Галп
├── .stylintrc                           # Конфиг линтера
├── .editconfig                          # Конфиг для IDE
├── csscomb.json                         # Конфиг позиционированя css свойств
└── README.md                            # Етот файл
```
