'use strict';

export default function () {
  controller('preloader', (controllerContainer) => {
    $('body').css('overflow', 'hidden');
    $(window).on('load', () => {
      setTimeout(() => {
        $('#preloader').fadeOut('slow', function () {
          $(this).remove();
        });
        $('body').css('overflow', '');
      }, 600);
    });
  });
};
