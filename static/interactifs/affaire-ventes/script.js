/* Pièce n° 1 : les ventes, de l'année de comparaison à l'année examinée (data/kuhn/affaire.yaml). */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var annees = [];
  for (var y = A.comparaison; y <= A.annee; y++) if (A.ex(y)) annees.push(y);
  var max = Math.max.apply(null, annees.map(function (a) { return A.ex(a).ventes; })) * 1.02;

  var boite = document.getElementById('ventes');
  boite.setAttribute('aria-label', 'Ventes de KUHN SAS : ' + annees.map(function (a) {
    return O.meuros(A.ex(a).ventes, 1) + ' en ' + a;
  }).join(', '));

  annees.forEach(function (a) {
    var v = A.ex(a).ventes;
    boite.appendChild(O.el('div', { class: 'ventes__ligne', 'aria-hidden': 'true' }, [
      O.el('span', { class: 'ventes__annee', text: String(a) }),
      O.el('div', { class: 'ventes__fond' }, [
        O.el('div', { class: 'ventes__barre' + (a === A.annee ? ' ventes__barre--examinee' : ''), style: 'width:' + (v / max * 100) + '%' })
      ]),
      O.el('span', { class: 'ventes__valeur', text: O.meuros(v, 1) })
    ]));
  });
})();
