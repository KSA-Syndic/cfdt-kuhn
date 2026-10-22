/* integration.js — côté article. Chargé une fois par layouts/partials/docs/inject/body.html
   quand la page contient {{< interactif >}}, {{< tableau-kuhn >}} ou un lien [terme](#def-…).
   - hauteur « auto » : l'iframe (même origine) prend exactement la hauteur de son contenu ;
   - hauteur « ecran » : l'iframe occupe l'écran sous l'en-tête de hugo-book (--interactif-entete) ;
   - transmet la requête de la page (?image=3) à l'iframe ;
   - transforme les liens [terme](#def-id) en bulles du glossaire (window.KuhnGlossaire). */
(function (w, doc) {
  'use strict';

  /* ---------- Hauteur de l'en-tête de hugo-book (visible sur mobile) ---------- */

  function majEntete() {
    var h = doc.querySelector('.book-header');
    var px = h && h.offsetParent !== null ? Math.ceil(h.getBoundingClientRect().height) : 0;
    doc.documentElement.style.setProperty('--interactif-entete', px + 'px');
  }

  /* ---------- Requête de la page transmise à l'iframe ---------- */

  function transmettreRequete(iframe) {
    if (!w.location.search) return;
    var u = new URL(iframe.getAttribute('src'), w.location.href);
    new URLSearchParams(w.location.search).forEach(function (v, k) {
      if (k !== 'v') u.searchParams.set(k, v);
    });
    iframe.setAttribute('src', u.pathname + u.search + u.hash);
  }

  /* ---------- Iframes ---------- */

  function brancher(iframe) {
    var mode = iframe.getAttribute('data-hauteur') || 'auto';
    var ro = null;

    function document_() {
      try { return iframe.contentDocument; } catch (e) { return null; }
    }

    function mesurer() {
      var d = document_();
      if (!d || !d.documentElement) return;
      var h = Math.ceil(d.documentElement.getBoundingClientRect().height);
      if (h <= 0) return;
      /* la hauteur minimale ne sert qu'à réserver la place avant le chargement */
      if (iframe.style.minHeight) iframe.style.minHeight = '';
      if (iframe.style.height !== h + 'px') iframe.style.height = h + 'px';
    }

    function auChargement() {
      var d = document_();
      if (!d || !d.documentElement || d.URL === 'about:blank') return;
      d.documentElement.classList.add('interactif-integre', 'interactif-' + mode);
      if (mode !== 'auto') return;
      if (ro) ro.disconnect();
      var RO = iframe.contentWindow.ResizeObserver || w.ResizeObserver;
      if (RO) {
        ro = new RO(mesurer);
        ro.observe(d.documentElement);
        if (d.body) ro.observe(d.body);
      }
      if (d.fonts && d.fonts.ready) d.fonts.ready.then(mesurer);
      iframe.contentWindow.addEventListener('load', mesurer);
      mesurer();
    }

    transmettreRequete(iframe);
    iframe.addEventListener('load', auChargement);
    var d = document_();
    if (d && d.readyState === 'complete') auChargement();
  }

  /* ---------- Glossaire : liens [terme](#def-id) ---------- */

  var bulle = null;
  var courant = null;

  function fermer(rendreFocus) {
    if (!bulle) return;
    bulle.remove();
    bulle = null;
    if (courant) {
      courant.setAttribute('aria-expanded', 'false');
      if (rendreFocus) courant.focus();
      courant = null;
    }
  }

  function ouvrir(a) {
    var id = a.getAttribute('href').slice(5);
    var e = w.KuhnGlossaire && w.KuhnGlossaire[id];
    if (!e) return;
    fermer(false);
    courant = a;
    bulle = doc.createElement('div');
    bulle.className = 'terme-bulle';
    bulle.id = 'terme-bulle';
    bulle.setAttribute('role', 'tooltip');
    var x = doc.createElement('button');
    x.type = 'button';
    x.className = 'terme-bulle__fermer';
    x.setAttribute('aria-label', 'Fermer la définition');
    x.textContent = '×';
    x.addEventListener('click', function () { fermer(true); });
    var corps = doc.createElement('div');
    corps.innerHTML = /<b>/.test(e.definition) ? e.definition : '<b>' + e.terme + '</b> : ' + e.definition;
    bulle.appendChild(x);
    bulle.appendChild(corps);
    doc.body.appendChild(bulle);
    a.setAttribute('aria-expanded', 'true');
    placer(a);
  }

  function placer(a) {
    var r = a.getBoundingClientRect();
    var larg = doc.documentElement.clientWidth;
    var bw = bulle.offsetWidth, bh = bulle.offsetHeight;
    var gauche = Math.max(8, Math.min(r.left + r.width / 2 - bw / 2, larg - bw - 8));
    var haut = r.bottom + 8;
    if (haut + bh > w.innerHeight && r.top - bh - 8 > 0) haut = r.top - bh - 8;
    bulle.style.left = (gauche + w.scrollX) + 'px';
    bulle.style.top = (haut + w.scrollY) + 'px';
  }

  function preparerTermes() {
    var liens = doc.querySelectorAll('a[href^="#def-"]');
    Array.prototype.forEach.call(liens, function (a) {
      var id = a.getAttribute('href').slice(5);
      if (!w.KuhnGlossaire || !w.KuhnGlossaire[id]) {
        if (w.console) console.warn('Glossaire : terme inconnu « ' + id + ' »');
        return;
      }
      a.classList.add('terme-lien');
      a.setAttribute('role', 'button');
      a.setAttribute('aria-expanded', 'false');
      a.setAttribute('aria-controls', 'terme-bulle');
    });
  }

  doc.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a.terme-lien') : null;
    if (a) {
      e.preventDefault();
      if (courant === a) fermer(false); else ouvrir(a);
      return;
    }
    if (bulle && !bulle.contains(e.target)) fermer(false);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bulle) { fermer(true); return; }
    if (e.key === ' ' && e.target.classList && e.target.classList.contains('terme-lien')) {
      e.preventDefault();
      e.target.click();
    }
  });
  w.addEventListener('resize', function () {
    majEntete();
    if (bulle && courant) placer(courant);
  }, { passive: true });

  /* ---------- Démarrage ---------- */

  function demarrer() {
    majEntete();
    Array.prototype.forEach.call(doc.querySelectorAll('iframe.interactif__cadre'), brancher);
    preparerTermes();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})(window, document);
