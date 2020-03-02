(() => {
  'use strict';

  function setUpLanguageSwitcher() {
    if ('M' in window) {
      M.Dropdown.init(document.getElementById('i18n'), {
        container: document.body,
      });
      return true;
    }
    return false;
  }

  function trySetUpLanguageSwitcher() {
    const id = setInterval(() => {
      if (setUpLanguageSwitcher()) {
        clearInterval(id);
      }
    }, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trySetUpLanguageSwitcher);
  } else {
    trySetUpLanguageSwitcher();
  }
})();



