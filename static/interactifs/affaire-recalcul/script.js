/* Pièce n° 5 : l'EBITDA calculé chaque année de la même façon, pour les exercices choisis dans affaire.yaml. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var annees = A.recalcul.filter(function (a) { return A.ex(a); });
  var max = Math.max.apply(null, annees.map(function (a) { return A.ex(a).ebitda; })) * 1.12;

  var colonnes = document.getElementById('colonnes');
  var etiquettes = document.getElementById('annees');
  colonnes.setAttribute('aria-label', "Argent dégagé par l'activité : " + annees.map(function (a, i) {
    var v = A.ex(a).ebitda;
    return (i === 0 ? O.meuros(v, 1) : O.nombre(v, 1)) + ' en ' + a;
  }).join(', '));

  annees.forEach(function (a) {
    var v = A.ex(a).ebitda;
    colonnes.appendChild(O.el('div', { class: 'colonnes__col', 'aria-hidden': 'true' }, [
      O.el('span', { text: O.nombre(v, 1) }),
      O.el('div', { class: 'colonnes__barre' + (a === A.annee ? ' colonnes__barre--examinee' : ''), style: 'height:' + (v / max * 100) + '%' })
    ]));
    etiquettes.appendChild(O.el('span', { text: String(a) }));
  });
})();
