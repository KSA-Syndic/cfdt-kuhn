/* Modèle de page interactive : lit window.KuhnDonnees, n'écrit aucun chiffre ni aucune année en dur. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var D = O.donnees;
  var annees = D.annees();
  var annee = D.dernier();

  /* Années : autant de boutons que d'exercices disponibles ; le dernier est choisi par défaut. */
  var nav = document.getElementById('annees');
  annees.forEach(function (a) {
    nav.appendChild(O.el('button', { type: 'button', 'data-annee': a, text: String(a), onclick: function () { choisir(a); } }));
  });

  /* Échelle recalculée sur les données : la plus grande valeur fait 85 % de la hauteur. */
  var max = Math.max.apply(null, annees.map(function (a) { return D.ex(a).ventes; }));
  var barres = document.getElementById('barres');
  barres.setAttribute('aria-label', O.gabarit('Chiffre d\'affaires de KUHN SAS de {de} à {a}', { de: annees[0], a: annees[annees.length - 1] }));
  annees.forEach(function (a, i) {
    var v = D.ex(a).ventes;
    barres.appendChild(O.el('div', { class: 'barres__col', 'data-annee': a }, [
      O.el('span', { class: 'chiffre', text: O.nombre(v, 0) }),
      O.el('div', { class: 'barres__barre', style: 'height:' + (v / max * 85) + '%;animation-delay:' + i * 40 + 'ms' }),
      O.el('span', { text: String(a) })
    ]));
  });

  function choisir(a) {
    annee = a;
    var e = D.ex(a);
    Array.prototype.forEach.call(nav.children, function (b) {
      b.setAttribute('aria-pressed', String(+b.getAttribute('data-annee') === a));
    });
    Array.prototype.forEach.call(barres.children, function (c) {
      c.classList.toggle('barres__col--actif', +c.getAttribute('data-annee') === a);
    });
    document.getElementById('grand').textContent = O.nombre(e.ventes, 1);
    /* Remarque calculée : comparée à l'année précédente quand elle existe. */
    var texte = e.variation_ventes == null
      ? 'En {annee}, KUHN SAS a facturé {ventes} M€.'
      : 'En {annee}, KUHN SAS a facturé {ventes} M€, soit {variation} % sur un an.';
    document.getElementById('texte').textContent = O.gabarit(texte, {
      annee: a, ventes: O.nombre(e.ventes, 1), variation: O.signe(e.variation_ventes, 0)
    });
    document.getElementById('dividende').textContent = O.meuros(e.dividende, 1);
    var badge = document.getElementById('badge-dividende');
    badge.textContent = '';
    var b = O.badgeEstimation(e.dividende_estime);
    if (b) badge.appendChild(b);
  }

  choisir(annee);
})();
