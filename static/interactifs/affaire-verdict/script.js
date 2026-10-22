/* Conclusion de « L'affaire des 2,6 % » : rappel des cinq pièces (chiffres de l'exercice examiné), fil rouge, tampon. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var e = A.ex(A.annee);

  var pieces = [
    O.gabarit('Ventes {v} %', { v: O.signe(e.variation_ventes, 0) }),
    O.gabarit('Métier : {v} % des ventes', { v: O.nombre(e.marge_exploitation, 1) }),
    O.gabarit('{v} M€ de frais refacturés', { v: O.nombre(e.transferts, 1) }),
    'Deux méthodes mélangées',
    O.gabarit('Argent dégagé {v} %', { v: O.signe(A.calculs.variation_ebitda, 0) })
  ];
  var inclinaisons = [-3, 2, -1.5, 2.5, -2];

  var liste = document.getElementById('pieces');
  pieces.forEach(function (fait, i) {
    liste.appendChild(O.el('li', { class: 'verdict__piece', style: '--rot:' + inclinaisons[i] + 'deg' }, [
      O.el('span', { class: 'punaise', 'data-punaise': i + 1 }),
      O.el('span', { class: 'verdict__numero', text: 'Pièce n° ' + (i + 1) }),
      O.el('span', { class: 'verdict__fait', text: fait })
    ]));
  });

  A.fil(document.getElementById('tableau'));
  A.tampon(document.getElementById('tampon'));
})();
