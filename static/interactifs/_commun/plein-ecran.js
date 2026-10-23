/* plein-ecran.js — côté article. Chargé une fois par layouts/partials/docs/inject/body.html quand la page
   contient une {{< bulle-lien nom="…" >}}. Un clic sur la bulle agrandit la page interactive en plein
   écran, par-dessus l'article : la fenêtre part du dessin de la bulle et s'ouvre jusqu'aux bords.
   - « Fermer », Échap ou le bouton Retour du navigateur la referment (elle se rétracte dans la bulle) ;
   - l'adresse #voir-<nom> ouvre directement la page en plein écran (lien partageable), et la requête de
     l'article est transmise à la page (?image=3) ; un lien #voir-<autre> suivi depuis la page ouverte
     (même article) passe d'une page plein écran à l'autre ;
   - Ctrl/Cmd + clic ou clic du milieu ouvrent le lien normalement (nouvel onglet).
   Styles : assets/_custom.scss (« Plein écran »). */
(function (w, doc) {
  'use strict';

  var PREFIXE = '#voir-';
  var ouvert = null;

  function mouvementReduit() {
    return !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function el(tag, classe, texte) {
    var n = doc.createElement(tag);
    if (classe) n.className = classe;
    if (texte) n.textContent = texte;
    return n;
  }

  /** Découpe qui ramène la fenêtre plein écran au dessin de la bulle. */
  function decoupeBulle(bulle) {
    var r = (bulle.querySelector('.bulle-lien__image') || bulle).getBoundingClientRect();
    var rayon = Math.round(Math.min(r.width, r.height) / 2);
    return 'inset(' + Math.round(r.top) + 'px ' + Math.round(w.innerWidth - r.right) + 'px ' +
      Math.round(w.innerHeight - r.bottom) + 'px ' + Math.round(r.left) + 'px round ' + rayon + 'px)';
  }
  var DECOUPE_ECRAN = 'inset(0px 0px 0px 0px round 0px)';

  /** Adresse de la page, avec la requête de l'article (…/lire-les-comptes/?image=3 ouvre l'image 3). */
  function adressePage(src) {
    if (!w.location.search) return src;
    var u = new URL(src, w.location.href);
    new URLSearchParams(w.location.search).forEach(function (v, k) { if (k !== 'v') u.searchParams.set(k, v); });
    return u.pathname + u.search;
  }

  /** Le reste de la page devient inerte : le clavier et les lecteurs d'écran restent dans la fenêtre. */
  function inerte(actif) {
    Array.prototype.forEach.call(doc.body.children, function (n) {
      if (ouvert && n === ouvert.cadre) return;
      if (actif) n.setAttribute('inert', ''); else n.removeAttribute('inert');
    });
  }

  function ouvrir(bulle, depuisAdresse) {
    if (ouvert) return;
    var titre = bulle.getAttribute('data-titre') || '';
    var cadre = el('div', 'plein-ecran');
    cadre.setAttribute('role', 'dialog');
    cadre.setAttribute('aria-modal', 'true');
    cadre.setAttribute('aria-label', titre);

    var barre = el('div', 'plein-ecran__barre');
    var fermerBtn = el('button', 'plein-ecran__fermer', 'Fermer ✕');
    fermerBtn.type = 'button';
    fermerBtn.setAttribute('aria-label', 'Fermer le plein écran');
    fermerBtn.addEventListener('click', function () { fermer(false); });
    barre.appendChild(el('span', 'plein-ecran__titre', titre));
    barre.appendChild(fermerBtn);

    var corps = el('div', 'plein-ecran__corps');
    var apercu = el('div', 'plein-ecran__apercu');
    apercu.setAttribute('aria-hidden', 'true');
    var dessin = bulle.querySelector('.bulle-lien__dessin');
    if (dessin) apercu.appendChild(dessin.cloneNode(true));
    var page = el('iframe', 'plein-ecran__page');
    page.title = titre;
    page.src = adressePage(bulle.getAttribute('data-plein-ecran'));
    page.addEventListener('load', function () { cadre.classList.add('plein-ecran--charge'); });
    corps.appendChild(page);
    corps.appendChild(apercu);

    cadre.appendChild(barre);
    cadre.appendChild(corps);
    ouvert = { bulle: bulle, cadre: cadre, nom: bulle.getAttribute('data-nom'), depuisAdresse: !!depuisAdresse };
    doc.body.appendChild(cadre);
    doc.documentElement.classList.add('plein-ecran-actif');
    inerte(true);

    if (!depuisAdresse && !mouvementReduit()) {
      cadre.style.clipPath = decoupeBulle(bulle);
      cadre.getBoundingClientRect(); // fixe la découpe de départ avant la transition
      cadre.classList.add('plein-ecran--anime');
      cadre.style.clipPath = DECOUPE_ECRAN;
    }
    if (!depuisAdresse) w.history.pushState({ pleinEcran: ouvert.nom }, '', PREFIXE + ouvert.nom);
    fermerBtn.focus();
  }

  function fermer(depuisHistorique) {
    if (!ouvert) return;
    var o = ouvert;
    ouvert = null;
    inerte(false);
    function retirer() {
      o.cadre.remove();
      if (!ouvert) doc.documentElement.classList.remove('plein-ecran-actif');
    }
    if (mouvementReduit()) retirer();
    else {
      o.cadre.classList.add('plein-ecran--anime');
      o.cadre.style.clipPath = decoupeBulle(o.bulle);
      o.cadre.addEventListener('transitionend', retirer, { once: true });
      setTimeout(retirer, 900); // au cas où la transition n'aurait pas lieu
    }
    o.bulle.focus({ preventScroll: true });
    if (depuisHistorique) return;
    if (o.depuisAdresse) w.history.replaceState(null, '', w.location.pathname + w.location.search);
    else w.history.back();
  }

  doc.addEventListener('click', function (e) {
    var bulle = e.target.closest ? e.target.closest('a[data-plein-ecran]') : null;
    if (!bulle || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    ouvrir(bulle, false);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ouvert) fermer(false);
  });
  w.addEventListener('popstate', function () {
    if (ouvert && !(w.history.state && w.history.state.pleinEcran)) fermer(true);
  });

  /* #voir-<nom> : ouverture directe, au chargement ou quand l'ancre change (la page déjà ouverte, s'il y en
     a une autre, se referme d'abord) */
  function depuisAdresse() {
    var h = w.location.hash;
    if (h.indexOf(PREFIXE) !== 0 || ouvert) return;
    var bulle = doc.querySelector('a[data-plein-ecran][data-nom="' + h.slice(PREFIXE.length).replace(/[^a-z0-9-]/g, '') + '"]');
    if (bulle) ouvrir(bulle, true);
  }
  w.addEventListener('hashchange', function () {
    if (ouvert && w.location.hash !== PREFIXE + ouvert.nom) fermer(true);
    depuisAdresse();
  });
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', depuisAdresse);
  else depuisAdresse();
})(window, document);
