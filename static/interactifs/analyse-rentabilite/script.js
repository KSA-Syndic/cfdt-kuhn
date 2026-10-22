/* Analyse, constat 2 : la marge d'EBITDA à méthode constante, exercice par exercice. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Analyse;
  var X = window.KuhnDonnees.meta.extremes;
  var boite = document.getElementById('graphique');
  var echelle = Math.ceil(A.max('marge_ebitda'));

  boite.setAttribute('aria-label', O.gabarit("Marge d'EBITDA de {periode}, entre {min} et {max} %", {
    periode: A.periode(), min: O.nombre(X.marge_ebitda.min.valeur, 1), max: O.nombre(X.marge_ebitda.max.valeur, 1)
  }));
  A.colonnes(boite, {
    echelle: echelle,
    valeur: function (e) { return e.marge_ebitda; },
    etiquette: function (e, v) { return O.nombre(v, 1); },
    style: function (e, a, dernier, v) {
      return 'height:' + (v / echelle * 85) + '%;background:' + (dernier ? 'var(--lien-livre)' : 'var(--gris-colonne)');
    }
  });
})();
