/* Outils communs des pages interactives (window.KuhnOutils).
   Chargé après ../_donnees/kuhn.js et avant le script de la page :
   nombres à la française, mouvement réduit, écran tactile, gabarits de texte (remplir), badge « estimation »,
   bulles du glossaire (<button class="terme" data-def="…">, ou data-place="note" pour une note sous le
   paragraphe), liens d'ancre internes. */
(function (w, doc) {
  'use strict';

  var NBSP = ' ';
  var MOINS = '−';
  var D = w.KuhnDonnees || null;

  /* ---------- Nombres ---------- */

  function arrondi(v, dec) {
    var p = Math.pow(10, dec);
    return Math.round(Math.abs(v) * p) / p;
  }

  /** 1217 → « 1 217 » ; −1.83 → « −1,8 » ; null → « — » */
  function nombre(v, dec) {
    if (v == null || isNaN(v)) return '—';
    dec = dec == null ? 1 : dec;
    var r = arrondi(v, dec);
    var s = r.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    return (v < 0 && r > 0 ? MOINS : '') + s;
  }

  /** Avec signe : « +4,4 », « −14,5 », « 0,0 » */
  function signe(v, dec) {
    if (v == null || isNaN(v)) return '—';
    dec = dec == null ? 1 : dec;
    var s = nombre(v, dec);
    return v > 0 && arrondi(v, dec) > 0 ? '+' + s : s;
  }

  function meuros(v, dec) { return nombre(v, dec) + NBSP + 'M€'; }
  function pct(v, dec) { return nombre(v, dec) + NBSP + '%'; }

  /** Remplit « En {annee}, {ventes} M€ » avec un objet de valeurs déjà mises en forme ;
      espaces insécables à la française (avant % € M€ : ; ! ? », après «). */
  function gabarit(texte, valeurs) {
    return String(texte).replace(/\{(\w+)\}/g, function (m, k) {
      return valeurs[k] != null ? valeurs[k] : m;
    }).replace(/(\d) (%|€|M€|Md\$|M CHF)/g, '$1' + NBSP + '$2')
      .replace(/ ([:;!?»])/g, NBSP + '$1')
      .replace(/« /g, '«' + NBSP)
      .replace(/≈ /g, '≈' + NBSP);
  }

  /** Remplit les gabarits écrits dans le HTML : dans chaque élément [data-gabarit] de racine, les {cle}
      des textes et de l'attribut aria-label reçoivent valeurs[cle]. Les balises internes (termes du
      glossaire, <b>…) sont conservées. */
  function remplir(racine, valeurs) {
    var blocs = Array.prototype.slice.call(racine.querySelectorAll('[data-gabarit]'));
    if (racine.hasAttribute && racine.hasAttribute('data-gabarit')) blocs.unshift(racine);
    blocs.forEach(function (n) {
      var aria = n.getAttribute('aria-label');
      if (aria && aria.indexOf('{') >= 0) n.setAttribute('aria-label', gabarit(aria, valeurs));
      var it = doc.createTreeWalker(n, 4 /* NodeFilter.SHOW_TEXT */);
      for (var t = it.nextNode(); t; t = it.nextNode()) {
        if (t.nodeValue.indexOf('{') >= 0) t.nodeValue = gabarit(t.nodeValue, valeurs);
      }
    });
  }

  /* ---------- Environnement ---------- */

  function media(q) { return !!(w.matchMedia && w.matchMedia(q).matches); }
  function mouvementReduit() { return media('(prefers-reduced-motion: reduce)'); }
  function tactile() { return media('(hover: none)'); }
  /** Rappelle fonction quand l'une des requêtes média change (largeur, mouvement réduit, écran tactile…). */
  function suivreMedia(requetes, fonction) {
    if (!w.matchMedia) return;
    [].concat(requetes).forEach(function (q) {
      var m = w.matchMedia(q);
      if (m.addEventListener) m.addEventListener('change', fonction);
      else if (m.addListener) m.addListener(fonction);
    });
  }
  function parametre(nom) {
    try { return new URLSearchParams(w.location.search).get(nom); } catch (e) { return null; }
  }

  /* ---------- DOM ---------- */

  /** el('span', {class: 'x', 'aria-hidden': 'true'}, ['texte', autreNoeud]) */
  function el(tag, attrs, enfants) {
    var n = doc.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    });
    [].concat(enfants || []).forEach(function (c) {
      if (c == null || c === false) return;
      n.appendChild(typeof c === 'string' ? doc.createTextNode(c) : c);
    });
    return n;
  }

  /** Badge « estimation » si est vaut vrai, sinon null. */
  function badgeEstimation(est, texte) {
    return est ? el('span', { class: 'badge-estimation', text: texte || 'estimation' }) : null;
  }

  /* ---------- Données ---------- */

  var donnees = {
    brut: D,
    annees: function () { return D ? D.meta.annees.slice() : []; },
    dernier: function () { return D ? D.meta.dernierExercice : null; },
    ex: function (annee) { return D ? D.exercices[annee] : null; },
    filiales: function (annee) { return D ? D.filiales[annee] : null; }
  };

  /* ---------- Glossaire : bulles sur <button class="terme" data-def="id"> ---------- */

  var bulle = null;
  var courant = null;

  function chargerGlossaire(suite) {
    if (w.KuhnGlossaire) { suite(); return; }
    var s = doc.createElement('script');
    s.src = '../_donnees/glossaire.js';
    s.onload = suite;
    doc.head.appendChild(s);
  }

  function fermer(rendreFocus) {
    if (!bulle) return;
    bulle.remove();
    bulle = null;
    if (courant) {
      courant.setAttribute('aria-expanded', 'false');
      courant.removeAttribute('aria-describedby');
      if (rendreFocus) courant.focus();
      courant = null;
    }
  }

  function ouvrir(btn) {
    var id = btn.getAttribute('data-def');
    var e = w.KuhnGlossaire && w.KuhnGlossaire[id];
    if (!e) { if (w.console) console.warn('Glossaire : terme inconnu « ' + id + ' »'); return; }
    fermer(false);
    courant = btn;
    var texte = /^<b>/.test(e.definition) ? e.definition : '<b>' + e.terme + '</b>' + NBSP + ': ' + e.definition;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-describedby', 'bulle-glossaire');
    /* data-place="note" : la définition s'insère sous le paragraphe, dans le fil du texte */
    if (btn.getAttribute('data-place') === 'note') {
      bulle = el('div', { class: 'note-def', id: 'bulle-glossaire', role: 'note', html: texte });
      var bloc = btn.closest('p, li') || btn;
      bloc.parentNode.insertBefore(bulle, bloc.nextSibling);
      return;
    }
    bulle = el('div', { class: 'bulle', id: 'bulle-glossaire', role: 'tooltip' }, [
      el('button', { type: 'button', class: 'bulle__fermer', 'aria-label': 'Fermer la définition', text: '×', onclick: function () { fermer(true); } }),
      el('div', { html: texte })
    ]);
    doc.body.appendChild(bulle);
    placer(btn);
  }

  function placer(btn) {
    var r = btn.getBoundingClientRect();
    var sx = w.scrollX || 0, sy = w.scrollY || 0;
    var larg = doc.documentElement.clientWidth;
    var bw = bulle.offsetWidth, bh = bulle.offsetHeight;
    var gauche = Math.max(8, Math.min(r.left + r.width / 2 - bw / 2, larg - bw - 8));
    var haut = r.bottom + 8;
    var docH = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
    if (haut + sy + bh > docH && r.top - bh - 8 + sy >= 0) haut = r.top - bh - 8;
    bulle.style.left = (gauche + sx) + 'px';
    bulle.style.top = (haut + sy) + 'px';
  }

  doc.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('.terme[data-def]') : null;
    if (t) {
      e.preventDefault();
      if (courant === t) { fermer(false); return; }
      chargerGlossaire(function () { ouvrir(t); });
      return;
    }
    if (bulle && !bulle.contains(e.target) && bulle.className === 'bulle') fermer(false);

    /* Liens d'ancre internes : <base target="_top"> les enverrait vers la page parente. */
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (a && a.getAttribute('href').length > 1) {
      var cible = doc.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
      if (cible) {
        e.preventDefault();
        cible.scrollIntoView({ behavior: mouvementReduit() ? 'auto' : 'smooth', block: 'start' });
      }
    }
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bulle) fermer(true);
  });
  w.addEventListener('resize', function () { if (bulle && courant && bulle.className === 'bulle') placer(courant); });

  w.KuhnOutils = {
    nombre: nombre,
    signe: signe,
    meuros: meuros,
    pct: pct,
    gabarit: gabarit,
    remplir: remplir,
    media: media,
    suivreMedia: suivreMedia,
    mouvementReduit: mouvementReduit,
    tactile: tactile,
    parametre: parametre,
    el: el,
    badgeEstimation: badgeEstimation,
    donnees: donnees,
    fermerBulle: fermer
  };
})(window, document);
