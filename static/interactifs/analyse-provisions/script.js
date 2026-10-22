/* Analyse, constat 3 : l'effet net des provisions (reprises − dotations), de part et d'autre de zéro. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var D = O.donnees;
  var annees = D.annees();
  var boite = document.getElementById('graphique');
  var etiquettes = document.getElementById('annees');
  /* échelle : la plus forte valeur, en positif ou en négatif, avec une marge pour l'étiquette */
  var amplitude = Math.ceil(Math.max.apply(null, annees.map(function (a) { return Math.abs(D.ex(a).effet_provisions); })) * 1.1);

  boite.setAttribute('aria-label', "Effet net des provisions, en\u00A0M€\u00A0: " + annees.map(function (a) {
    return a + ' ' + O.signe(D.ex(a).effet_provisions, 1);
  }).join('\u00A0; '));
  boite.appendChild(O.el('div', { class: 'ecarts__zero', 'aria-hidden': 'true' }));

  annees.forEach(function (a) {
    var v = D.ex(a).effet_provisions;
    var soutien = v >= 0;
    var h = Math.abs(v) / amplitude * 45;
    boite.appendChild(O.el('div', { class: 'ecarts__col', 'aria-hidden': 'true' }, [
      O.el('div', { class: 'ecarts__barre ' + (soutien ? 'ecarts__barre--soutien' : 'ecarts__barre--frein'), style: 'height:' + Math.max(h, 0.8) + '%' }),
      O.el('span', { class: 'ecarts__valeur', text: O.signe(v, 1),
        style: soutien ? 'bottom:calc(50% + ' + h + '% + 2px)' : 'top:calc(50% + ' + h + '% + 2px)' })
    ]));
    etiquettes.appendChild(O.el('span', { text: String(a) }));
  });
})();
