(() => {
  'use strict';

  const link = document.head.querySelector('link[rel=canonical]');
  if (!link) {
    return;
  }

  const url = [
    link.href,
    location.search,
    location.hash
  ].join("");

  if (location.href !== url) {
    location.href = url;
  }
})();
