//TESTER (transpiled with babel for ie compatibility)

(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
  'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TESTER
  (function () {
    'use strict';

    var createButton = function createButton() {
      var button = document.createElement('span');
      button.setAttribute('id', 'addElems');
      button.style.width = '40px';
      button.style.height = '40px';
      button.style.background = 'black';
      button.style.position = 'fixed';
      button.style.bottom = '0';
      button.style.right = '70px';
      button.style.padding = '0 5px';
      button.style.transition = 'all .3s';
      button.style.cursor = 'pointer';
      button.style.color = 'white';
      button.style.fontSize = '12px';
      button.style.lineHeight = '40px';
      button.style.textAlign = 'center';
      button.style.zIndex = '99999';
      button.innerText = 'text';

      button.addEventListener('mouseover', function () {
        button.style.background = 'red';
      });
      button.addEventListener('mouseout', function () {
        button.style.background = 'black';
      });

      $('body').append(button);
      return button;
    };
    var createSettingList = function createSettingList() {
      var $list = $('<ul class="setting-block-change"></ul>');
      $list.append('<li class="js-static-plus">static +</li>');
      $list.append('<li class="js-dynamic-plus">dynamic +</li>');
      $list.append('<li class="js-check-forms">check forms</li>');
      $list.append('<li class="js-check-popups">check popups</li>');
      $list.append('<li class="js-check-drop">check drop</li>');
      $list.append('<li class="js-check-br">check br</li>');
      $list.append('<li class="js-rules-init">RULES</li>');
      $list.css({
        'position': 'fixed',
        'bottom': '50px',
        'right': '70px',
        'backgroundColor': '#000',
        'padding': '10px 15px',
        'fontSize': '14px',
        'color': '#fff',
        'zIndex': '9999',
        'display': 'block',
        'listStyle': 'none',
        'visibility': 'hidden',
        'margin': '0'
      });
      $list.find('li').css({
        'padding': '5px 10px'
      });
      $('body').append($list);
      return $list;
    };

    var tagsFn = function () {
      function tagsFn() {
        _classCallCheck(this, tagsFn);

        this.cloneClass = 'is-clone';
        this.moreClass = 'is-more-text';
      }

      _createClass(tagsFn, [{
        key: 'p',
        value: function p(tag, text) {
          var cloneTag = $(tag).clone();
          cloneTag.addClass(this.cloneClass).text(cloneTag.text() + ' ' + text);
          $(tag).after(cloneTag);
        }
      }, {
        key: 'list',
        value: function list(tag, text) {
          var $this = $(tag);
          var newElem = $this.find('>li').last().clone();
          newElem.addClass(this.cloneClass);
          $this.append(newElem);
        }
      }, {
        key: 'texts',
        value: function texts(tag, text) {
          var $this = $(tag);
          if (!$this.find('span, a, select').length) {
            var cont = $this.text().replace(/\s{2,}/g, ' ');
            if (cont !== ' ' && cont !== '') {
              $this.addClass(this.moreClass).text($this.text() + ' ' + text);
            }
          }
        }
      }, {
        key: 'resetAllPlugins',
        value: function resetAllPlugins() {
          //slick slider
          var $slick = $('.slick-initialized');
          if ($slick.length) {
            $slick.slick('unslick');
          };

          //bxslider
          var $bxslider = $('.bx-wrapper');
          if ($bxslider.length) {
            $bxslider.find('[style]').removeAttr('style');
            $bxslider.find('.bx-clone').remove();
            $bxslider.parent().find('.bx-controls').remove();
            $bxslider.find('.bx-viewport > *').removeAttr('style').unwrap();
            $bxslider.find('> *').removeAttr('style').unwrap();
          }

          //owl slider
          var $owl = $('.owl-loaded');
          if ($owl.length) {
            $owl.trigger('destroy.owl.carousel');
          }
          //flexslider
          var $flexslider = $('.flex-viewport');
          if ($flexslider.length) {
            $flexslider.find('[style]').removeAttr('style');
            $flexslider.find('.clone').remove();
            $flexslider.find('.flex-active-slide').removeClass('flex-active-slide');
            $flexslider.parent().find('.flex-control-nav, .flex-direction-nav').remove();
            $flexslider.find('.slides').removeAttr('style').unwrap();
          }

          //custom scroll bar
          var $customScrollBar = $('.scrollable');
          if ($customScrollBar.length) {
            $customScrollBar.find('.overview').unwrap();
            $customScrollBar.find('.overview > *').unwrap('');
            $customScrollBar.removeClass('scrollable').find('.scroll-bar').remove();
          }

          //jscrollPane
          var $jscrollPane = $('.jspScrollable');
          if ($jscrollPane.length) {
            $jscrollPane.each(function () {
              var scroll = $(this).jScrollPane().data().jsp;
              scroll.destroy();
            });
          }
        }
      }, {
        key: 'update',
        value: function update(status) {
          if (status == 'dynamic') {
            this.resetAllPlugins();
            var yourDOCTYPE = "<!DOCTYPE html>"; // your doctype declaration
            var printPreview = window.open('about:blank', '', "");
            var printDocument = printPreview.document;
            var HTML = document.documentElement.innerHTML;

            printDocument.write(yourDOCTYPE + "<html>" + HTML + "</html>");
            printDocument.close();

            location.reload(); // for reload main page
          }
        }
      }]);

      return tagsFn;
    }();

    ;

    var addAllText = function addAllText(fnObj) {
      var ignore = 'el-ignore';
      var dinamicIignore = 'js-dinamic-elems';

      var tags = {
        "P": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias unde fuga dicta architecto molestiae tempore earum nam, porro voluptatibus? Reprehenderit.",
        "UL": "UL Lorem ipsum dolor.",
        "OL": "OL Lorem ipsum dolor.",
        "SPAN": "Lorem ipsum dolor sit amet.",
        "H1": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h1",
        "H2": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h2",
        "H3": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h3",
        "H4": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h4",
        "H5": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h5",
        "H6": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h6",
        "A": "Lorem ipsum.",
        "BUTTON": "Lorem ipsum. button"
      };

      var app = {

        getAllTags: function () {
          var a = []; // accessory array
          var res = []; //main array;
          for (var i in tags) {
            a.push($(i));
          }
          for (var _i = 0; _i < a.length; _i++) {
            var m = a[_i];
            for (var x = 0; x < m.length; x++) {
              var el = m[x];
              if (!$(el).hasClass(ignore) && !$(el).parents('.' + ignore).length) {
                res.push(el); // push tag in main array
              }
            }
          }
          return res;
        }(),
        deligate: function deligate(status) {
          var array = this.getAllTags;

          if (status === 'static') {
            array = array.filter(function (el, i) {
              if (!$(el).hasClass(dinamicIignore) && !$(el).parents('.' + dinamicIignore).length) {
                return el;
              }
            });
          };
          console.log(array);
          for (var i = 0; i < array.length; i++) {
            var thisTag = array[i];

            switch (thisTag.nodeName) {
              case 'P':
                fnObj.p(thisTag, tags[thisTag.nodeName]);
                break;
              case 'UL':
              case 'OL':
                fnObj.list(thisTag, tags[thisTag.nodeName]);
                break;
              case 'SPAN':
              case 'H1':
              case 'H2':
              case 'H3':
              case 'H4':
              case 'H5':
              case 'H6':
              case 'A':
              case 'BUTTON':
                fnObj.texts(thisTag, tags[thisTag.nodeName]);
                break;
              default:
                console.log('page hasn`t ' + thisTag + ' tag');
            }
          }
          fnObj.update(status);
        }
      };

      return {
        init: function init() {
          app.deligate();
        },
        statics: function statics() {
          app.deligate('static');
        },
        dynamic: function dynamic() {
          app.deligate('dynamic');
        }
      };
    };

    var checkForm = function checkForm() {
      var allElems = $('input, textarea, select');
      var inputText = 'Lorem ipsum.';
      var allFn = {
        input: function input(elem) {
          if ($(elem).attr('type') === 'checkbox' || $(elem).attr('type') === 'radio') {
            $(elem).prop('checked', true);
          } else {
            inputText = inputText + inputText;
            $(elem).val(inputText);
          }
        },
        select: function select(elem) {
          $(elem).find('option').eq(1).prop('selected', true);
        }
      };

      return {
        addText: function addText() {
          for (var i = 0; i < allElems.length; i++) {
            var elem = allElems[i];
            switch (elem.nodeName) {
              case 'INPUT':
              case 'TEXTAREA':
                allFn.input(elem);
                break;

              case 'SELECT':
                allFn.select(elem);
                break;

              default:
                console.log('xz');
            }
          }
        },
        check: function check() {
          $(allElems).each(function () {
            var $form = $(this).parents('form');
            if ($form.length) {
              $form.css({
                'border': '4px solid green'
              });
            } else {
              // $(this).css({
              //   'border': '2px solid red' 
              // })
            }
          });
        }
      };
    };

    var checkPopups = function checkPopups() {
      var selectors = ['[data-fancybox]'];
      return {
        open: function open() {
          selectors.forEach(function (el) {
            $(el).trigger('click');
          });
        }
      };
    };

    var checkBr = function checkBr() {
      return {
        init: function init() {
          var elems = $('br');
          elems.parent().css({
            'border': '1px solid yellow'
          });
          alert('на странице ' + elems.length + ' тегов <br>');
        }
      };
    };
    var checkDrop = function checkDrop() {
      var selectors = ['.js-drop-checked'];
      return {
        open: function open() {
          selectors.forEach(function (el) {
            $(el).trigger('click');
          });
        }
      };
    };

    var rulsFn = function rulsFn() {
      var posit = function posit() {
        var cont = $('.container'),
          allWidth = cont.outerWidth(),
          minWidth = cont.width(),
          left = cont.offset().left + (allWidth - minWidth) / 2;
        return left;
      };
      var create = function create() {
        var elemL = $('<div class="rules-left"></div>');
        var elemR = $('<div class="rules-right"></div>');
        var pos = posit();
        elemL.css({
          'position': 'fixed',
          'width': '1px',
          'height': '100%',
          'background': '#000',
          'top': '0',
          'left': pos,
          'zIndex': '9999'
        });
        elemR.css({
          'position': 'fixed',
          'width': '1px',
          'height': '100%',
          'background': '#000',
          'top': '0',
          'right': pos,
          'zIndex': '9999'
        });
        $('body').append(elemL);
        $('body').append(elemR);
        $('body').css('position', 'relative');
        $(window).on('resize.rules', function () {
          pos = posit();
          elemL.css('left', pos);
          elemR.css('right', pos);
        });
      };
      var remove = function remove() {
        $('.rules-right, .rules-left').remove();
        $(window).off('resize.rules');
      };
      return {
        toggle: function toggle() {
          if (!$('.rules-right').length) {
            create();
          } else {
            remove();
          }
        }
      };
    };

    var myForm = checkForm();
    var myText = addAllText(new tagsFn());
    var myPopyp = checkPopups();
    var myDrop = checkDrop();
    var myBr = checkBr();
    var myRuls = rulsFn();

    var $button = createButton();
    var $list = createSettingList();

    $(window).on('click', function (e) {
      var $this = $(e.target);

      if ($this.closest('#addElems').length) {
        $list.css('visibility', 'visible');
      } else if (!$this.closest('#addElems').length && !$this.closest('.setting-block-change').length) {
        $list.css('visibility', 'hidden');
      };

      if ($this.closest('.js-static-plus').length) {
        myText.statics();
      };
      if ($this.closest('.js-dynamic-plus').length) {
        myText.dynamic();
      };
      if ($this.closest('.js-check-forms').length) {
        myForm.addText();
        myForm.check();
      };
      if ($this.closest('.js-check-popups').length) {
        myPopyp.open();
      };
      if ($this.closest('.js-check-br').length) {
        myBr.init();
      };
      if ($this.closest('.js-rules-init').length) {
        myRuls.toggle();
      }
    });

    window.addEventListener('click', function (e) {

      var $this = $(e.target);
      if ($this.closest('.js-check-drop').length) {
        myDrop.open();
      }
    }, false);
  })();  
},{}]},{},[1]);



//page list
var close = $('#all-page-close');
var $wnd = $('#all-page-shower');
var $open = $('#all-page-open');

close.on('click', function (e) {
  e.preventDefault();
  $wnd.animate({
    'top': '100%',
    'left': '100%'
  }, 300, function () {
    $wnd.hide();
  });
  $open.show();
});

$open.on('click', function (e) {
  e.preventDefault();
  $wnd.show()
    .animate({
      'top': 0,
      'left': 0
    }, 300);
  $open.hide();
});
