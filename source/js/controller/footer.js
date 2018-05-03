export default function () {
  controller('footer', (self) => {   

    function autoFooter() {
      const wrapper = $('.wrapper');
      let footerHeight = self.outerHeight();

      self.css('margin-top', -footerHeight);
      wrapper.css('padding-bottom', footerHeight);
    }

    setTimeout(autoFooter, 100);
    $(window).on('resize', autoFooter);
  });
}
