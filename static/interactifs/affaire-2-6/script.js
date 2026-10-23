/* « L'affaire des 2,6 % » : remplit les gabarits de index.html, dessine les graphiques des pièces,
   trace le fil rouge et abat le tampon.
   L'article porte, par nature, sur un exercice précis, désigné une seule fois dans data/kuhn/affaire.yaml
   (KuhnDonnees.affaire.annee et .comparaison), jamais le dernier exercice. */
(function (w, doc) {
  'use strict';

  var O = w.KuhnOutils;
  var D = w.KuhnDonnees;
  var A = D.affaire;
  var ex = function (a) { return D.exercices[a]; };
  var tableau = doc.getElementById('tableau');

  var annee = A.annee;
  var e = ex(annee);
  var prec = ex(annee - 1);
  var cmp = ex(A.comparaison);
  var anneesPappers = Object.keys(A.pappers).map(Number).sort(function (a, b) { return a - b; });
  var anneesAffichees = D.meta.annees.filter(function (a) { return !ex(a).dividende_estime; });

  /* ---------- Mots ---------- */

  var MOTS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
  function enMots(n) { return MOTS[n] || String(n); }

  /** « 9 » pour 9,0 ; « 2,6 » sinon */
  function court(v) { return O.nombre(v, Math.round(v * 10) % 10 === 0 ? 0 : 1); }

  /** Baisse en toutes lettres quand elle tombe près d'une fraction simple : « d'un quart », « de moitié »… */
  function baisseEnMots(pct) {
    var b = Math.abs(pct);
    var fractions = [[25, "d'un quart"], [100 / 3, "d'un tiers"], [50, 'de moitié']];
    for (var i = 0; i < fractions.length; i++) if (Math.abs(b - fractions[i][0]) < 3) return fractions[i][1];
    return 'de ' + O.nombre(b, 0) + ' %';
  }

  /* exercices compris entre le premier et le dernier de la pièce n° 5, mais omis pour la lisibilité */
  var omises = [];
  for (var y = A.recalcul[0]; y <= A.recalcul[A.recalcul.length - 1]; y++) {
    if (A.recalcul.indexOf(y) < 0 && ex(y)) omises.push(y);
  }

  var distribution = anneesAffichees.map(function (a) { return ex(a).taux_distribution; });

  /* ---------- Gabarits ---------- */

  O.remplir(tableau, {
    annee: annee,
    annee_prec: annee - 1,
    annee_suiv: annee + 1,
    comparaison: A.comparaison,
    pappers_de: anneesPappers[0],
    pappers_rupture: anneesPappers.filter(function (a) { return a > A.comparaison; })[0],
    marge_affichee: court(A.pappers[annee].marge),
    marge_affichee_1: O.nombre(A.pappers[annee].marge, 1),
    marge_comparaison: court(A.pappers[A.comparaison].marge),
    ebitda_affiche: O.nombre(A.pappers[annee].ebitda, 1),
    ebitda_comparaison: O.nombre(A.pappers[A.comparaison].ebitda, 1),
    rapport: Math.round(A.calculs.rapport_pappers),
    rapport_mots: enMots(Math.round(A.calculs.rapport_pappers)),
    ecart_mots: enMots(annee - A.comparaison),
    variation_ventes: O.signe(e.variation_ventes, 0),
    baisse_ventes: O.nombre(-e.variation_ventes, 0),
    ventes: O.nombre(e.ventes, 0),
    ventes_prec: O.nombre(prec.ventes, 0),
    marge_exploitation: O.nombre(e.marge_exploitation, 0),
    effet_provisions: O.signe(e.effet_provisions, 1),
    rex: O.nombre(e.resultat_exploitation, 1),
    rex_prec: O.nombre(prec.resultat_exploitation, 1),
    ligne_total: O.nombre(e.reprises_et_transferts, 1),
    ligne_provisions: O.nombre(e.reprises_provisions, 1),
    ligne_frais: O.nombre(e.transferts, 1),
    transferts_arrondis: O.nombre(e.transferts, 0),
    ebe: O.nombre(e.ebe, 1),
    marge_ebe: O.nombre(e.marge_ebe, 1),
    ebitda: O.nombre(e.ebitda, 1),
    marge_ebitda: O.nombre(e.marge_ebitda, 1),
    ebitda_comparaison_calcule: O.nombre(cmp.ebitda, 1),
    baisse_mots: baisseEnMots(A.calculs.variation_ebitda),
    niveau_de: A.niveau_comparable[0],
    niveau_a: A.niveau_comparable[A.niveau_comparable.length - 1],
    omises: omises.length ? ' ' + omises.map(function (a) {
      return O.gabarit('Année {a} omise ici pour la lisibilité ({v} M€).', { a: a, v: O.nombre(ex(a).ebitda, 1) });
    }).join(' ') : '',
    distribution_min: O.nombre(Math.min.apply(null, distribution), 0),
    distribution_max: O.nombre(Math.max.apply(null, distribution), 0)
  });

  /* ---------- Pièce n° 1 : les ventes, de l'année de comparaison à l'année examinée ---------- */

  (function () {
    var annees = [];
    for (var a = A.comparaison; a <= annee; a++) if (ex(a)) annees.push(a);
    var boite = doc.getElementById('ventes');
    boite.setAttribute('aria-label', 'Ventes de KUHN SAS : ' + annees.map(function (a) {
      return O.meuros(ex(a).ventes, 1) + ' en ' + a;
    }).join(', '));
    /* échelle de la maquette : 1 000 M€, ou plus si les ventes la dépassent */
    var max = Math.max(1000, Math.ceil(Math.max.apply(null, annees.map(function (a) { return ex(a).ventes; })) / 100) * 100);
    annees.forEach(function (a) {
      boite.appendChild(O.el('div', { class: 'ventes__ligne', 'aria-hidden': 'true' }, [
        O.el('span', { class: 'ventes__annee', text: String(a) }),
        O.el('div', { class: 'ventes__fond' }, [
          O.el('div', { class: 'ventes__barre' + (a === annee ? ' ventes__barre--examinee' : ''), style: 'width:' + (ex(a).ventes / max * 100) + '%' })
        ]),
        O.el('span', { class: 'ventes__valeur', text: O.meuros(ex(a).ventes, 1) })
      ]));
    });
  })();

  /* ---------- Pièce n° 2 : marge d'exploitation de l'année précédente et de l'année examinée ---------- */

  (function () {
    var tuiles = doc.getElementById('tuiles');
    [annee - 1, annee].forEach(function (a) {
      if (!ex(a)) return;
      tuiles.appendChild(O.el('div', { class: 'tuile' }, [
        O.el('div', { class: 'tuile__annee', text: String(a) }),
        O.el('div', { class: 'tuile__valeur', text: O.pct(ex(a).marge_exploitation, 1) }),
        O.el('div', { class: 'tuile__unite', text: 'des ventes' })
      ]));
    });
  })();

  /* ---------- Pièce n° 3 : les deux parts de la ligne ---------- */

  doc.getElementById('part-provisions').style.flex = e.reprises_provisions + ' 1 0';
  doc.getElementById('part-frais').style.flex = e.transferts + ' 1 0';

  /* ---------- Pièce n° 4 : marges affichées par Pappers et marges calculées de la même façon ---------- */

  (function () {
    var lignes = anneesPappers.filter(ex).map(function (a) {
      return { a: a, affiche: A.pappers[a].marge, calcule: ex(a).marge_ebitda };
    });
    function liste(cle) {
      var t = lignes.map(function (l) { return O.nombre(l[cle], 1); });
      return t.slice(0, -1).join(', ') + ' et ' + t[t.length - 1] + ' %';
    }
    var boite = doc.getElementById('comparaison');
    boite.setAttribute('aria-label', O.gabarit('Part des ventes dégagée : chiffres affichés {a} ; calculés de la même façon {b}', {
      a: liste('affiche'), b: liste('calcule')
    }));
    /* échelle de la maquette : 10 % des ventes = 70 % de la largeur */
    var echelle = Math.max(10, Math.ceil(Math.max.apply(null, lignes.map(function (l) { return Math.max(l.affiche, l.calcule); }))));
    function barre(classe, v) {
      return O.el('div', { class: 'comparaison__barre ' + classe }, [
        O.el('i', { style: 'width:' + (v / echelle * 70) + '%' }),
        O.el('span', { text: O.pct(v, 1) })
      ]);
    }
    lignes.forEach(function (l) {
      boite.appendChild(O.el('div', { class: 'comparaison__ligne', 'aria-hidden': 'true' }, [
        O.el('span', { class: 'comparaison__annee', text: String(l.a) }),
        O.el('div', { class: 'comparaison__barres' }, [
          barre('comparaison__barre--affiche', l.affiche),
          barre('comparaison__barre--calcule', l.calcule)
        ])
      ]));
    });
  })();

  /* ---------- Pièce n° 5 : l'EBITDA recalculé de la même façon chaque année ---------- */

  (function () {
    var annees = A.recalcul.filter(ex);
    var colonnes = doc.getElementById('colonnes');
    var etiquettes = doc.getElementById('colonnes-annees');
    colonnes.style.setProperty('--n', annees.length);
    etiquettes.style.setProperty('--n', annees.length);
    colonnes.setAttribute('aria-label', "Argent dégagé par l'activité : " + annees.map(function (a, i) {
      return (i === 0 ? O.meuros(ex(a).ebitda, 1) : O.nombre(ex(a).ebitda, 1)) + ' en ' + a;
    }).join(', '));
    /* échelle de la maquette : 95 M€, ou plus si l'EBITDA la dépasse */
    var max = Math.max(95, Math.ceil(Math.max.apply(null, annees.map(function (a) { return ex(a).ebitda; })) * 1.12));
    annees.forEach(function (a) {
      colonnes.appendChild(O.el('div', { class: 'colonnes__col', 'aria-hidden': 'true' }, [
        O.el('span', { text: O.nombre(ex(a).ebitda, 1) }),
        O.el('div', { class: 'colonnes__barre' + (a === annee ? ' colonnes__barre--examinee' : ''), style: 'height:' + (ex(a).ebitda / max * 100) + '%' })
      ]));
      etiquettes.appendChild(O.el('span', { text: String(a) }));
    });
  })();

  /* ---------- Fil rouge : d'une punaise à l'autre, avec un mou alterné « posé à la main » ---------- */

  (function () {
    var svg = tableau.querySelector('svg.fil');
    var ombre = svg.querySelector('.fil__ombre');
    var trait = svg.querySelector('.fil__trait');
    var derniere = '';

    function mesurer() {
      var boite = tableau.getBoundingClientRect();
      var pts = Array.prototype.slice.call(tableau.querySelectorAll('[data-punaise]'))
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
      var l = Math.round(boite.width), h = Math.round(boite.height);
      var cle = d + '|' + l + 'x' + h;
      if (cle === derniere) return;
      derniere = cle;
      svg.setAttribute('width', l);
      svg.setAttribute('height', h);
      svg.setAttribute('viewBox', '0 0 ' + l + ' ' + h);
      ombre.setAttribute('d', d || 'M0 0');
      trait.setAttribute('d', d || 'M0 0');
    }

    if (w.ResizeObserver) new ResizeObserver(mesurer).observe(tableau);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(mesurer);
    w.addEventListener('resize', mesurer);
    mesurer();
    svg.classList.add('fil--trace');
  })();

  /* ---------- Tampon : il s'abat quand la fiche finale arrive à l'écran ----------
     On observe sa boîte, non le tampon lui-même : agrandi en attente (scale 1,7), il déborderait
     d'un écran étroit et n'atteindrait jamais le seuil. */

  (function () {
    var el = doc.getElementById('tampon');
    if (O.mouvementReduit() || !w.IntersectionObserver) return;
    el.classList.add('tampon--attente');
    var io = new IntersectionObserver(function (entrees) {
      if (entrees.some(function (en) { return en.isIntersecting; })) {
        el.classList.remove('tampon--attente');
        el.classList.add('tampon--frappe');
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(el.parentNode);
  })();
})(window, document);
