import getScrollbarWidth from '../utils/getScrollbarWidth'

export default function () {
  controller('preloader', self => {
    const preloader = $('#preloader');

    $('body').css('overflow', 'hidden');
    $(window).on('load', () => {
      setTimeout(() => {
        preloader.fadeOut('slow', function () {
          $(window).trigger('preloaderRemoved');
        });
        $('body').css('overflow', '');

        preloader.addClass('loaded').find('.preloader-wrapper')
          .css('margin-left', getScrollbarWidth())
      }, 600);
    });
  });
}
