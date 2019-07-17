import removePreloader from '../utils/removePreloader'

export default function () {
  window.controller = (ctrl, cb) => {
    if (!window.$) {
      console.error('Jquery not found!');
      return;
    }    

    const controllerContainer = $('[data-controller="' + ctrl + '"]');

    if (controllerContainer.length) {

      try {
        cb(controllerContainer);
      } catch (e) {
        console.log(`Controller error: ${ctrl}`);
        console.log(e);
        removePreloader();
      }

    } else {
      return undefined
    }
  }
}
