function controller(ctrl, cb) {
  var controllerContainer = $('[data-controller="' + ctrl + '"]');

  if(controllerContainer.length) {
    cb(controllerContainer);
  } else {
    return undefined
  }
}
