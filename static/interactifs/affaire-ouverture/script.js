/* Ouverture de « L'affaire des 2,6 % » : chiffres lus dans l'exercice de l'affaire (data/kuhn/affaire.yaml). */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var annees = A.anneesPappers();
  var avant = A.pappers[A.comparaison];
  var apres = A.pappers[A.annee];

  function texte(id, t) { document.getElementById(id).textContent = t; }

  texte('source', O.gabarit('Comptes déposés de KUHN SAS, {de}–{a}', { de: annees[0], a: A.annee }));
  texte('titre', O.gabarit("L'affaire des {marge} %", { marge: O.nombre(apres.marge, 1) }));
  texte('chiffre', O.gabarit('{avant} M€ en {comparaison} → {apres} M€ en {annee}', {
    avant: O.nombre(avant.ebitda, 1), comparaison: A.comparaison,
    apres: O.nombre(apres.ebitda, 1), annee: A.annee
  }));
  /* « divisé par 4 » : rapport des deux chiffres affichés, arrondi */
  texte('note-texte', O.gabarit('Ventes {ventes} %… et l\'argent dégagé divisé par {rapport} ??', {
    ventes: O.signe(A.ex(A.annee).variation_ventes, 0),
    rapport: Math.round(A.calculs.rapport_pappers)
  }));

  A.fil(document.getElementById('tableau'));
})();
