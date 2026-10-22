/* Analyse, constat 4 : le bénéfice de chaque exercice et la part versée en dividende l'année suivante. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Analyse;
  var D = O.donnees;
  var boite = document.getElementById('graphique');
  var echelle = Math.ceil(A.max('resultat_net') / 10) * 10;
  var estimes = D.annees().filter(function (a) { return D.ex(a).dividende_estime; });

  boite.setAttribute('aria-label', O.gabarit('Bénéfice et dividende de {periode}', { periode: A.periode() }));
  if (estimes.length) document.getElementById('legende-estimation').textContent = ' ' + estimes.join(', ') + '\u00A0: estimation.';

  A.colonnes(boite, {
    echelle: echelle,
    valeur: function (e) { return e.resultat_net; },
    etiquette: function (e) { return (e.dividende_estime ? '≈\u00A0' : '') + O.pct(e.taux_distribution, 0); },
    style: function (e, a, dernier, v) {
      var part = e.taux_distribution;
      var fonce = dernier ? 'var(--lien-livre)' : '#6c757d', clair = dernier ? '#a8c4e8' : '#dee2e6';
      return 'height:' + (v / echelle * 85) + '%;background:linear-gradient(to top,' + fonce + ' 0 ' + part + '%,' + clair + ' ' + part + '% 100%)';
    }
  });
})();
