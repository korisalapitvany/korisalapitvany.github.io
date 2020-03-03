function init() {
  if ('M' in window) {
    setTimeout(() => {
      INIT.forEach((fn) => fn());
    }, 1)
    return true;
  }
  return false;
}

function tryInit() {
  const id = setInterval(() => {
    if (init()) {
      clearInterval(id);
    }
  }, 200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryInit);
} else {
  tryInit();
}
