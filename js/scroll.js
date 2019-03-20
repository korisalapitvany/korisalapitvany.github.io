'use strict';

(() => {
  let isTop;
  function scroll() {
    let newTop = document.documentElement.scrollTop === 0;
    if (newTop === isTop) {
      return;
    }
    isTop = newTop;

    if (newTop) {
      document.body.classList.add('top');
    } else {
      document.body.classList.remove('top');
  }
  };

  document.addEventListener('DOMContentLoaded', scroll);
  document.addEventListener('scroll', scroll, {
    passive: true
  });
  setTimeout(() => {
    try {
      scroll();
    } catch (e) {}
  }, 1);
})();
