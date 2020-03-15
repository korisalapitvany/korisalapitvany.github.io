INIT.push(() => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), {
    onOpenStart: () => document.body.classList.add('sidenav-on'),
    onCloseStart: () => document.body.classList.remove('sidenav-on'),
  });
});
