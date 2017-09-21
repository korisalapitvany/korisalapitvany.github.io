(() => {
'use strict';

const canonical = document.head.querySelector('link[rel=canonical]').href + location.hash;
if (location.href !== canonical && canonical) {
  location.href = canonical;
}

})();
