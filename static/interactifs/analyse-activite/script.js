/* Analyse, constat 1 : le chiffre d'affaires de KUHN SAS, exercice par exercice. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Analyse;
  var X = window.KuhnDonnees.meta.extremes;
  var boite = document.getElementById('graphique');

  boite.setAttribute('aria-label', O.gabarit("Chiffre d'affaires de KUHN SAS de {periode}, pic en {pic}", { periode: A.periode(), pic: X.ventes.max.annee }));
  A.colonnes(boite, {
    echelle: A.max('ventes') / 0.85,
    valeur: function (e) { return e.ventes; },
    etiquette: function (e, v) { return O.nombre(v, 0); },
    style: function (e, a, dernier, v, echelle) {
      return 'height:' + (v / echelle * 100) + '%;background:' + (dernier ? 'var(--lien-livre)' : 'var(--gris-colonne)');
    }
  });
})();
