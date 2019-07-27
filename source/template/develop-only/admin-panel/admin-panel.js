setTimeout(() => {
  (function () {
    const $admin = $('._AP');
    const $triggerBtn = $('._AP-nav');
    const $close = $('._AP-close');
    const $mobCloseThis = $('._AP-close-this');
    const $test = $('._TEST');


    $(document).on('keydown', onKeyPress);

    $triggerBtn.on('click', () => {
      $admin.slideToggle()
    });

    $close.on('click', () => {
      $admin.slideUp();
    });

    $mobCloseThis.on('click', () => {
      $triggerBtn.detach();
      $admin.detach();
    });

    if (isTouch()) {
      $triggerBtn.addClass('touch');
      $admin.addClass('touch');
    }

    function onKeyPress(e) {
      const keyCode = e.keyCode;

      if (keyCode === 90 && e.ctrlKey) {
        $admin.slideToggle()
      }

      if (keyCode === 88 && e.ctrlKey) {
        $test.slideToggle()
      }
    }

    function isTouch() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }

  })();
}, 1000);
