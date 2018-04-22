'use strict';

export default function () {
  controller('footer', (controller)=>{
    const footer = controller;

    function autoFooter() {
      const wrapper = $('.wrapper');
      let footerHeight = footer.outerHeight();

      footer.css('margin-top', -footerHeight);
      wrapper.css('padding-bottom', footerHeight);
    }

    setTimeout(autoFooter, 100);
    $(window).on('resize', autoFooter);
  }); 
};
