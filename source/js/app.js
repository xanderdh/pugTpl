import CONSTANTS from './constants'
import browserUpdate from 'browser-update';
import controller from './controller'
import preloader from './controller/preloader';

controller();
preloader();
browserUpdate(CONSTANTS.browserUpdateOptions);

$(document).ready(() => {
  svg4everybody();

  const bLazy = new Blazy();
  $(window).on('preloaderRemoved', () => {
    bLazy.revalidate()
  });
});
