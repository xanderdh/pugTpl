export default {
  notify: {e: -6, f: -4, o: -4, s: -2, c: -4},
  // Уведомляемые версии браузеров. Отрицательное число означает отсчет версий от текущей.

  // f:22 ---> Firefox <= 22
  // c:-5 ---> Chrome <= 35 if current Chrome version is 40.
  // more info https://github.com/browser-update/browser-update/wiki/Details-on-configuration

  reminder: 1,
  // через сколько часов сообщение появится снова
  // 0=показывать всегда

  reminderClosed: 24,
  // через сколько часов сообщение появится снова, если пользователь его явно закрыл

  onshow: function (infos) {
  },
  onclick: function (infos) {
  },
  onclose: function (infos) {
  },
  // функции выполняемые при появлении уведомления, нажатии по нему, его закрытии

  l: false,
  // устанавливает статичный язык сообщения (например "en"). Это предотвратит автоматическое определение языка.

  test: false,
  // true = всегда показывать панель (для тестирования)

  text: "",
  // измененный текст уведомления (HTML)
  // {brow_name} будет заменено на название браузера, {up_but} на ссылку для обновления браузера, {ignore_but} на ссылку для игнорирования.
  // Пример: Ваш браузер, {brow_name}, сильно устарел: <a{up_but}>обновить</a> или <a{ignore_but}>игнорировать</a>.

  text_xx: "",
  // измененный текст уведомления для языка "xx"

  // например text_de для немецкого и text_it для итальянского языка

  newwindow: true,
  // открыть ссылку в новом окне/вкладке

  url: null,
  // ссылка для перехода после нажатия на уведомление

  noclose: false,
  // Не показывать кнопку "Игнорировать" для закрытия уведомления

  nomessage: false,
  // Не показывать сообщение, если браузер устарел, а просто вызвать функцию onshow

  jsshowurl: "//browser-update.org/update.show.min.js",
  // URL where the script, that shows the notification, is located. This is only loaded if the user actually has an outdated browser.

  container: document.body,
  // DOM Element where the notification will be injected.

  style: "top",
  // The position where the notification should be shown. Available options are:"top", "bottom", "corner"

  no_permanent_hide: false
  // Do not give the user the option to permanently hide the notification
}
