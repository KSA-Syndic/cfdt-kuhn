/* Graphiques en colonnes de l'analyse (window.Analyse) : une colonne par exercice affiché,
   échelle recalculée sur les valeurs, dernier exercice mis en valeur. */
(function (w, doc) {
  'use strict';

  var O = w.KuhnOutils;

  /**
   * colonnes(conteneur, {
   *   valeur: function (e) → nombre, etiquette: function (e, v) → texte,
   *   echelle: nombre (100 % de la hauteur), style: function (e, annee, dernier, v, echelle) → CSS de la barre
   * })
   */
  function colonnes(boite, opt) {
    var annees = O.donnees.annees();
    var dernier = O.donnees.dernier();
    var grille = O.el('div', { class: 'colonnes', 'aria-hidden': 'true' });
    var etiquettes = O.el('div', { class: 'colonnes__annees', 'aria-hidden': 'true' });
    annees.forEach(function (a, j) {
      var e = O.donnees.ex(a);
      var v = opt.valeur(e);
      grille.appendChild(O.el('div', { class: 'colonnes__col' }, [
        O.el('span', { class: 'colonnes__valeur', text: opt.etiquette(e, v) }),
        O.el('div', { class: 'colonnes__barre', style: 'animation-delay:' + j * 40 + 'ms;' + opt.style(e, a, a === dernier, v, opt.echelle) })
      ]));
      etiquettes.appendChild(O.el('span', { text: String(a) }));
    });
    boite.appendChild(O.el('div', { class: 'defile' }, [grille, etiquettes]));
  }

  /** Plus grande valeur d'un champ sur les exercices affichés. */
  function max(champ) {
    return Math.max.apply(null, O.donnees.annees().map(function (a) { return O.donnees.ex(a)[champ]; }));
  }

  /** « 2016 à 2024 » */
  function periode() {
    var a = O.donnees.annees();
    return a[0] + ' à ' + a[a.length - 1];
  }

  w.Analyse = { colonnes: colonnes, max: max, periode: periode };
})(window, document);
