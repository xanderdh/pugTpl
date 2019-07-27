setTimeout(() => {
  (function () {
    const list = $('._AP-pageList a.list-group-item');
    const hrefList = window.location.href.split('/');
    const pageName = hrefList[hrefList.length - 1];

    list.each((i, el) => {
      const href = $(el).attr('href');

      if (href === pageName || !pageName && href === 'index.html') {
        $(el).addClass('active')
      }
    })

  })();
}, 1000);
