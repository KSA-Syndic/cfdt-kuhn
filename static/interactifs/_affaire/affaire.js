/* Outils des figures de « L'affaire des 2,6 % » (window.Affaire).
   L'article porte, par nature, sur un exercice précis : il est désigné une seule fois, dans
   data/kuhn/affaire.yaml (KuhnDonnees.affaire.annee et .comparaison), jamais le dernier exercice. */
(function (w, doc) {
  'use strict';

  var D = w.KuhnDonnees;
  var O = w.KuhnOutils;
  var A = D.affaire;

  /** Années des marges affichées par Pappers, triées. */
  function anneesPappers() {
    return Object.keys(A.pappers).map(Number).sort(function (a, b) { return a - b; });
  }

  /* ---------- Fil rouge : d'une punaise à l'autre, avec un mou alterné « posé à la main » ---------- */
  function fil(tableau) {
    var svg = tableau.querySelector('svg.fil');
    if (!svg) return;
    var ombre = svg.querySelector('.fil__ombre');
    var trait = svg.querySelector('.fil__trait');
    var derniere = '';

    function mesurer() {
      var boite = tableau.getBoundingClientRect();
      var pts = Array.prototype.slice.call(tableau.querySelectorAll('[data-punaise]'))
        .filter(function (el) { return el.offsetParent !== null; })
        .sort(function (a, b) { return +a.getAttribute('data-punaise') - +b.getAttribute('data-punaise'); })
        .map(function (el) {
          var r = el.getBoundingClientRect();
          return { x: Math.round(r.left + r.width / 2 - boite.left), y: Math.round(r.top + r.height / 2 - boite.top) };
        });
      var d = '';
      pts.forEach(function (p, i) {
        if (i === 0) { d = 'M' + p.x + ' ' + p.y; return; }
        var a = pts[i - 1], mx = (a.x + p.x) / 2, my = (a.y + p.y) / 2;
        var dx = p.x - a.x, dy = p.y - a.y, len = Math.hypot(dx, dy) || 1;
        var mou = (i % 2 ? 1 : -1) * Math.min(120, len * 0.14);
        var cx = mx - dy / len * mou, cy = my + dx / len * mou + len * 0.04;
        d += ' Q' + Math.round(cx) + ' ' + Math.round(cy) + ' ' + p.x + ' ' + p.y;
      });
      var cle = d + '|' + Math.round(boite.width) + 'x' + Math.round(boite.height);
      if (cle === derniere) return;
      derniere = cle;
      svg.setAttribute('width', Math.round(boite.width));
      svg.setAttribute('height', Math.round(boite.height));
      svg.setAttribute('viewBox', '0 0 ' + Math.round(boite.width) + ' ' + Math.round(boite.height));
      ombre.setAttribute('d', d || 'M0 0');
      trait.setAttribute('d', d || 'M0 0');
    }

    if (w.ResizeObserver) new ResizeObserver(mesurer).observe(tableau);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(mesurer);
    w.addEventListener('resize', mesurer);
    mesurer();

    /* le fil se trace quand la figure arrive à l'écran (sans IntersectionObserver : tracé d'emblée) */
    if (O.mouvementReduit() || !w.IntersectionObserver) { svg.classList.add('fil--trace'); return; }
    var io = new IntersectionObserver(function (entrees) {
      if (entrees.some(function (e) { return e.isIntersecting; })) { svg.classList.add('fil--trace'); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(tableau);
  }

  /* ---------- Tampon : il s'abat quand il arrive à l'écran ----------
     On observe sa boîte, non le tampon lui-même : agrandi en attente (scale 1,7), il déborderait
     d'un écran étroit et n'atteindrait jamais le seuil. */
  function tampon(el) {
    if (O.mouvementReduit() || !w.IntersectionObserver) return;
    el.classList.add('tampon--attente');
    var io = new IntersectionObserver(function (entrees) {
      if (entrees.some(function (e) { return e.isIntersecting; })) {
        el.classList.remove('tampon--attente');
        el.classList.add('tampon--frappe');
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(el.parentNode);
  }

  w.Affaire = {
    annee: A.annee,
    comparaison: A.comparaison,
    pappers: A.pappers,
    anneesPappers: anneesPappers,
    recalcul: A.recalcul.slice(),
    calculs: A.calculs,
    ex: function (annee) { return D.exercices[annee]; },
    fil: fil,
    tampon: tampon
  };
})(window, document);
