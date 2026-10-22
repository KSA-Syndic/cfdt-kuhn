/* Pièce n° 4 : marges d'EBITDA affichées par Pappers et marges calculées de la même façon chaque année. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var annees = A.anneesPappers().filter(function (a) { return A.ex(a); });
  var lignes = annees.map(function (a) {
    return { a: a, affiche: A.pappers[a].marge, calcule: A.ex(a).marge_ebitda };
  });
  var echelle = Math.ceil(Math.max.apply(null, lignes.map(function (l) { return Math.max(l.affiche, l.calcule); })));

  function liste(cle) {
    var t = lignes.map(function (l) { return O.nombre(l[cle], 1); });
    return O.gabarit('{debut} et {fin} %', { debut: t.slice(0, -1).join(', '), fin: t[t.length - 1] });
  }

  var boite = document.getElementById('comparaison');
  boite.setAttribute('aria-label', 'Part des ventes dégagée : chiffres affichés ' + liste('affiche') +
    ' ; calculés de la même façon ' + liste('calcule'));

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
