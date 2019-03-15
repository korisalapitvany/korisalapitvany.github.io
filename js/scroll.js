'use strict';

(() => {
  const classList = document.body.classList;

  let isTop;
  function scroll() {
    let newTop = document.documentElement.scrollTop === 0;
    if (newTop === isTop) {
      return;
    }
    isTop = newTop;

    if (newTop) {
	  classList.add('top');
    } else {
	  classList.remove('top');
	}
  };

  document.addEventListener('DOMContentLoaded', scroll);
  document.addEventListener('scroll', scroll, {
	passive: true
  });
  setTimeout(scroll, 1);
})();
