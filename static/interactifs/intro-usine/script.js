/* intro-usine : bandeau d'ouverture de l'article « Résultats ».
   - montants et exercice : dernier exercice de window.KuhnDonnees (aucun chiffre ni aucune année en dur) ;
   - compteurs animés (animNum de l'ancien app.js) lancés quand les montants arrivent à l'écran ;
   - apparitions .rv à l'arrivée à l'écran (dans une iframe, la racine implicite de
     l'IntersectionObserver est la fenêtre de l'article) ;
   Mouvement réduit : valeurs finales d'emblée, rien ne bouge. */
(function (w, doc) {
  'use strict';

  var O = w.KuhnOutils;
  var D = O.donnees;
  var reduit = O.mouvementReduit();

  /* le script a démarré : le filet de sécurité CSS des apparitions n'a plus lieu d'être */
  doc.documentElement.classList.add('rv-pret');

  function tous(sel, racine) {
    return Array.prototype.slice.call((racine || doc).querySelectorAll(sel));
  }

  /* ---------- Données : le dernier exercice ---------- */

  var annee = D.dernier();
  var ex = D.ex(annee);

  tous('[data-champ="annee"]').forEach(function (el) { el.textContent = String(annee); });

  /* « le creux de … » : l'exercice aux ventes les plus basses depuis le record de ventes, calculé dans
     layouts/partials/kuhn/donnees.html. Si le dernier exercice est lui-même le record, il n'y a pas de creux :
     la phrase reste cachée. */
  var creux = w.KuhnDonnees.meta.extremes.ventes.creux_apres_max;
  if (creux) {
    tous('[data-champ="annee-creux"]').forEach(function (el) { el.textContent = String(creux.annee); });
    doc.getElementById('phrase-creux').hidden = false;
  }

  /* ---------- Compteurs (animNum) ---------- */

  function format(v) { return O.meuros(v, 1); }

  function animNum(el, vers) {
    if (reduit) { el.textContent = format(vers); return; }
    var de = parseFloat(el.dataset.courant || '0') || 0;
    el.dataset.courant = vers;
    var t0 = performance.now(), duree = 900;
    function tick(t) {
      var k = Math.min(1, Math.max(0, (t - t0) / duree));
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(de + (vers - de) * e);
      if (k < 1) w.requestAnimationFrame(tick);
    }
    w.requestAnimationFrame(tick);
  }

  var montants = tous('[data-stat]').map(function (el) {
    var champ = el.getAttribute('data-stat');
    /* badge « estimation » si le champ est estimé (ex. <champ>_estime: true) */
    var badge = O.badgeEstimation(ex[champ + '_estime']);
    if (badge) el.parentNode.insertBefore(badge, el.nextSibling);
    return { el: el, valeur: ex[champ] };
  });

  function compter() {
    montants.forEach(function (m) { animNum(m.el, m.valeur); });
  }

  function valeursFinales() {
    montants.forEach(function (m) { m.el.textContent = format(m.valeur); });
  }

  /* ---------- Apparitions et départ des compteurs ---------- */

  var aReveler = tous('.rv');
  var blocMontants = doc.querySelector('.chips');

  if (reduit) {
    /* la machine reste à mi-tapis : on retire ses animations SVG (le reste est figé par le CSS) */
    tous('#stageFactory animate, #stageFactory animateTransform').forEach(function (a) { a.remove(); });
  }

  if (reduit || !('IntersectionObserver' in w)) {
    aReveler.forEach(function (el) { el.classList.add('in-view'); });
    valeursFinales();
  } else {
    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.classList.add('in-view');
        if (e.target === blocMontants) {
          /* le compte démarre avec l'apparition du bloc (même délai que son fondu) */
          var delai = parseFloat(w.getComputedStyle(blocMontants).transitionDelay) || 0;
          w.setTimeout(compter, delai * 1000);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    aReveler.forEach(function (el) { io.observe(el); });
    /* le bloc des montants n'est peut-être pas un .rv : on l'observe quand même */
    if (blocMontants && aReveler.indexOf(blocMontants) < 0) io.observe(blocMontants);
  }
})(window, document);
