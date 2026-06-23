(function () {
  'use strict';

  var root = document.documentElement;
  // Aligné sur $mobile-breakpoint du thème hugo-book (56rem)
  var mqMenu = window.matchMedia('(min-width: 56rem)');

  function durationMs() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
    var raw = getComputedStyle(root).getPropertyValue('--full-width-post-dur').trim();
    if (!raw) return 650;
    if (raw.endsWith('ms')) return parseFloat(raw) || 650;
    if (raw.endsWith('s')) return (parseFloat(raw) || 0.65) * 1000;
    return 650;
  }

  function hasFullWidthPost() {
    return !!document.querySelector('.full-width-post');
  }

  function hasKuhnResultats() {
    return !!document.querySelector('.kuhn-resultats');
  }

  function syncMenuContext() {
    if (!root.classList.contains('full-width-post')) return;
    var ctl = document.getElementById('menu-control');
    var inFlow = mqMenu.matches;
    root.classList.toggle('full-width-post-menu-in-flow', inFlow);
    root.classList.toggle('full-width-post-menu-drawer', !inFlow && !!(ctl && ctl.checked));
    root.style.setProperty('--full-width-post-menu-w', inFlow ? '16rem' : '0px');
    window.dispatchEvent(new Event('full-width-post-menu-context'));
  }

  function expand() {
    root.classList.add('full-width-post-expanded');
    if (hasKuhnResultats() && !document.body.classList.contains('show-analysis')) {
      root.classList.add('kuhn-resultats-dark-chrome');
    }
    syncMenuContext();
  }

  function collapse() {
    root.classList.remove('full-width-post-expanded', 'kuhn-resultats-dark-chrome');
  }

  if (hasFullWidthPost()) {
    root.classList.add('full-width-post');
    syncMenuContext();
    requestAnimationFrame(expand);

    var menuCtl = document.getElementById('menu-control');
    if (menuCtl) menuCtl.addEventListener('change', syncMenuContext);
    if (mqMenu.addEventListener) mqMenu.addEventListener('change', syncMenuContext);
    else mqMenu.addListener(syncMenuContext);
    window.addEventListener('resize', syncMenuContext, { passive: true });

    document.addEventListener(
      'click',
      function (e) {
        if (!root.classList.contains('full-width-post-expanded')) return;
        var a = e.target.closest('a[href]');
        if (!a || a.hasAttribute('download') || a.target === '_blank') return;
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var url;
        try {
          url = new URL(a.getAttribute('href'), location.href);
        } catch (_) {
          return;
        }
        if (url.origin !== location.origin) return;
        var here = location.pathname.replace(/\/$/, '') || '/';
        var there = url.pathname.replace(/\/$/, '') || '/';
        if (there === here) return;
        e.preventDefault();
        var wait = durationMs();
        collapse();
        if (wait) setTimeout(function () { location.assign(url.href); }, wait);
        else location.assign(url.href);
      },
      true
    );
  }
})();
