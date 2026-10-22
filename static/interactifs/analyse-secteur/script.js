/* Analyse, « Le secteur a vécu le même cycle » : KUHN Group (Bucher) et ses concurrents cotés.
   Chiffre d'affaires, indice (record = 100, calculé dans donnees.html) et marge publiée, par exercice. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var D = window.KuhnDonnees;
  var SERIES = D.secteur;
  var ANNEES = D.meta.secteur.annees;
  var onglets = document.getElementById('onglets');
  var choix = 0;

  SERIES.forEach(function (s, j) {
    onglets.appendChild(O.el('button', {
      type: 'button', role: 'tab', id: 'onglet-' + j, 'aria-controls': 'panneau', text: s.nom,
      onclick: function () { choisir(j); }
    }));
  });

  /* flèches gauche / droite entre les onglets */
  onglets.addEventListener('keydown', function (e) {
    var pas = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
    if (!pas) return;
    e.preventDefault();
    choisir((choix + pas + SERIES.length) % SERIES.length);
    onglets.children[choix].focus();
  });

  function choisir(j) {
    choix = j;
    var s = SERIES[j];
    Array.prototype.forEach.call(onglets.children, function (b, k) {
      b.setAttribute('aria-selected', String(k === j));
      b.tabIndex = k === j ? 0 : -1;
    });
    document.getElementById('panneau').setAttribute('aria-labelledby', 'onglet-' + j);
    var ca = function (a) {
      var v = s.ca[a];
      return v == null ? '—' : O.nombre(v, s.unite === 'M€' ? 0 : 1);
    };
    var ligne = function (titre, cellule) {
      return O.el('tr', null, [O.el('th', { scope: 'row', text: titre })].concat(ANNEES.map(function (a) {
        return O.el('td', { text: cellule(a) });
      })));
    };
    var table = document.getElementById('table');
    table.textContent = '';
    table.appendChild(O.el('thead', null, [O.el('tr', null, [O.el('th', { scope: 'col', text: 'Exercice' })].concat(ANNEES.map(function (a) {
      return O.el('th', { scope: 'col', text: String(a) });
    })))]));
    table.appendChild(O.el('tbody', null, [
      ligne('CA (' + s.unite + ')', ca),
      ligne('Indice (record = 100)', function (a) { return s.indice[a] == null ? '—' : O.nombre(s.indice[a], 0); }),
      ligne('Marge', function (a) { return s.marge[a] == null ? '—' : O.pct(s.marge[a], 1); })
    ]));
    document.getElementById('note').textContent = s.note;
  }

  choisir(0);
})();
