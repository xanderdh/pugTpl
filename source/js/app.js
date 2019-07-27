import browserUpdateOptions from './browserUpdateOptions'
import browserUpdate from 'browser-update';
import controller from './utils/controller';
import preloader from './controller/preloader';
import ctrl from './controller/index';

controller();
preloader();
browserUpdate(browserUpdateOptions);

$(document).ready(() => {
  svg4everybody();

  ctrl.forEach(controller => controller());

  const bLazy = new Blazy();
  $(window).on('preloaderRemoved', () => {
    bLazy.revalidate()
  });
});
