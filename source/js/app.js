'use strict';

import CONSTANTS from './constants'
import browserUpdate from 'browser-update';
import preloader from './controller/preloader';
import footer from './controller/footer';

preloader();
browserUpdate(CONSTANTS.browserUpdateOptions);

$(document).ready(() => {
  svg4everybody(); //SVG polyfill
  footer();
  //Other controllers and js modules here
});
