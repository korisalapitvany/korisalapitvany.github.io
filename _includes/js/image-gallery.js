(() => {
  'use strict';

  function setUpGallery() {
    if ('M' in window) {
      const elems = document.querySelectorAll('.gallery img');
      M.Materialbox.init(elems, {});
      return true;
    }
    return false;
  }

  function trySetUpGallery() {
    const id = setInterval(() => {
      if (setUpGallery()) {
        clearInterval(id);
      }
    }, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trySetUpGallery);
  } else {
    trySetUpGallery();
  }
})();



