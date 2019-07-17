export default function () {
  setTimeout(function () {
    var body = document.getElementsByTagName('body')[0];
    var preloader = document.getElementById('preloader');

    if (preloader.className !== 'loaded') {
      body.style.overflow = 'auto';
      preloader.style.transition = 'opacity .3s ease-in-out';
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
        body.classList.add('loaded');
      }, 400)
    }
  }, 1000);
}
