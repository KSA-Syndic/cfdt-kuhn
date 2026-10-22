/* Pièce n° 2 : la marge d'exploitation de l'année précédente et de l'année examinée. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var tuiles = document.getElementById('tuiles');

  [A.annee - 1, A.annee].forEach(function (a) {
    var e = A.ex(a);
    if (!e) return;
    tuiles.appendChild(O.el('div', { class: 'tuile' }, [
      O.el('div', { class: 'tuile__annee', text: String(a) }),
      O.el('div', { class: 'tuile__valeur', text: O.pct(e.marge_exploitation, 1) }),
      O.el('div', { class: 'tuile__unite', text: 'des ventes' })
    ]));
  });
})();
