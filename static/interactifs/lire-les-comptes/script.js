/* Lire les comptes en images : tutoriel en parallaxe horizontale.
   Le défilement vertical de .hx fait avancer une caméra le long de dix scènes posées côte à côte.
   La scène 0 occupe une demi-unité de défilement, chaque scène suivante une unité :
   30 % de trajet, puis l'animation de la scène jusqu'à 85 %, puis un temps d'arrêt.
   Les animations sont déclarées dans le dessin (index.html) : data-fx, data-t, data-v.
   Données : la scène 9 lit le DERNIER exercice de window.KuhnDonnees ; les montants de l'Atelier
   (scènes 0 à 8) sont un exemple fictif écrit dans les dessins.
   ?image=N (0 à 9) ouvre directement l'image N. */
(function () {
  'use strict';

  const O = window.KuhnOutils;

  /* ====================================================================================
     1. Scène 9 : les comptes de KUHN SAS, dernier exercice publié
     ==================================================================================== */

  function remplirComptes(racine) {
    const D = O.donnees;
    const annee = D.dernier();
    const e = annee != null ? D.ex(annee) : null;
    if (!racine || !e) return;
    const estime = !!e.dividende_estime;
    const valeurs = {
      annee: annee,
      verse_en: e.dividende_verse_en != null ? e.dividende_verse_en : '',
      marge_ebitda: O.nombre(e.marge_ebitda, 1),
      transferts: O.nombre(e.transferts, 1)
    };

    /* textes à trous : « Compte de résultat {annee} », « {marge_ebitda} % des ventes »… */
    racine.querySelectorAll('[data-gabarit]').forEach((n) => {
      n.textContent = O.gabarit(n.getAttribute('data-gabarit'), valeurs);
    });
    racine.querySelectorAll('[data-si-estime]').forEach((n) => { n.hidden = !estime; });
    /* la phrase sur les transferts de charges n'a de sens que s'il y en a (la réforme ANC 2022-06 les supprime à partir de 2025) */
    racine.querySelectorAll('[data-si-transferts]').forEach((n) => { n.hidden = !(e.transferts > 0.05); });

    /* lignes chiffrées : le compteur animé (data-fx="count") part de 0 et monte jusqu'à la valeur */
    racine.querySelectorAll('[data-champ]').forEach((ligne) => {
      const champ = ligne.getAttribute('data-champ');
      const v = e[champ];
      const b = ligne.querySelector('b');
      if (v == null || isNaN(v)) {
        b.textContent = 'n.c.';
        b.title = 'non communiqué';
        return;
      }
      const dividende = champ === 'dividende';
      const dec = dividende && estime ? 0 : 1;
      const i = b.querySelector('i');
      i.setAttribute('data-v', '0 ' + v + ' ' + dec);
      i.textContent = O.nombre(v, dec);
      if (dividende && estime) {
        const approx = b.querySelector('[data-approx]');
        if (approx) approx.hidden = false;
        const place = ligne.querySelector('[data-badge-estimation]');
        const badge = O.badgeEstimation(true);
        if (place && badge) place.appendChild(badge);
      }
    });
  }

  /* ====================================================================================
     2. Le tutoriel
     ==================================================================================== */

  const media = (q) => window.matchMedia ? window.matchMedia(q) : null;

  class Tutoriel {
    constructor(root) {
      this.root = root;
      this.stage = root.querySelector('.stage');
      this.track = root.querySelector('[data-track]');
      this.LABELS = Array.from(this.stage.querySelectorAll('[data-scene]')).map((el) => el.getAttribute('aria-label'));
      this.N = this.LABELS.length;
      this.T = .3;
      this.DONE = .85;
      this.LEN = 1.4;
      this.END = .5 + (this.N - 1) + .3;
      this.u = 0; this.target = 0; this.raf = 0; this.last = 0; this.hold = 0; this.held = -1;
      this.mx = 0; this.my = 0; this.tmx = 0; this.tmy = 0; this.lastCam = 0;
      this.sp = { beam: { x: 0, v: 0 }, needle: { x: 0, v: 0 } };
      this.cur = 0;
      this.playing = false;
      this.mobile = null;
      this.drivers = { 1: this.drvBalance, 4: this.drvAmort, 5: this.drvUmbrella, 6: this.drvGauge, 7: this.drvJars };
      this.tick = (now) => this.frame(now);
      this.stage.style.setProperty('--n', this.N);

      /* mouvement réduit : coupures franches ; parallaxe de la souris seulement avec une souris */
      const mr = media('(prefers-reduced-motion: reduce)');
      const tactile = media('(hover: none)');
      const regler = () => {
        this.reduce = !!(mr && mr.matches);
        this.souris = !this.reduce && !(tactile && tactile.matches);
        if (!this.souris) { this.tmx = this.tmy = this.mx = this.my = 0; }
        this.force = true;
        this.kick();
      };
      regler();
      [mr, tactile].forEach((m) => { if (m && m.addEventListener) m.addEventListener('change', regler); });

      this.construireInterface();
      this.ecouter();
      this.collect();
      this.measure();
      this.ouvrirImage(O.parametre('image'));
      this.majInterface();
      this.kick();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.measure());
    }

    /* ---------- interface : puces, compteur, étiquette, lecture ---------- */
    construireInterface() {
      const puces = this.stage.querySelector('[data-puces]');
      this.dots = this.LABELS.map((l, j) => {
        const nom = (j ? j + '. ' : '') + l;
        const b = O.el('button', { type: 'button', class: 'dot', 'aria-label': nom, title: nom, 'aria-current': 'false', 'data-aller': j }, [O.el('i')]);
        puces.appendChild(b);
        return b;
      });
      this.compteurs = Array.from(this.stage.querySelectorAll('[data-compteur]'));
      this.etiquette = this.stage.querySelector('[data-etiquette]');
      this.btnLecture = this.stage.querySelector('.ctl .play');
      this.icone = this.btnLecture.querySelector('[data-icone]');
      this.libelle = this.btnLecture.querySelector('[data-libelle]');
    }

    majInterface() {
      const cur = this.cur, last = this.N - 1;
      const compteur = cur === 0 ? '0' : cur + '/' + last;
      const libelle = this.playing ? 'Pause' : (cur >= last ? 'Revoir' : 'Lecture');
      this.compteurs.forEach((n) => { n.textContent = compteur; });
      this.etiquette.textContent = this.LABELS[cur];
      this.btnLecture.setAttribute('aria-pressed', String(this.playing));
      this.btnLecture.setAttribute('aria-label', libelle);
      this.icone.textContent = this.playing ? '❚❚' : '▶';
      this.libelle.textContent = libelle;
      this.dots.forEach((d, j) => d.setAttribute('aria-current', j === cur ? 'step' : 'false'));
    }

    setPlaying(on) {
      if (on === this.playing) return;
      this.playing = on;
      this.hold = 0;
      this.majInterface();
      this.kick();
    }

    /* ---------- écouteurs ---------- */
    ecouter() {
      const root = this.root;
      this.onUser = () => { this.tween = null; if (this.playing) this.setPlaying(false); };
      root.addEventListener('scroll', () => { if (this.unit) { this.target = root.scrollTop / this.unit; this.kick(); } }, { passive: true });
      root.addEventListener('wheel', this.onUser, { passive: true });
      root.addEventListener('touchstart', this.onUser, { passive: true });
      root.addEventListener('keydown', (e) => this.onKey(e));
      this.stage.addEventListener('pointermove', (e) => {
        if (!this.souris || e.pointerType !== 'mouse' || this.mobile) return;
        const r = this.stage.getBoundingClientRect();
        this.tmx = (e.clientX - r.left) / r.width - .5;
        this.tmy = (e.clientY - r.top) / r.height - .5;
        this.kick();
      });
      this.stage.addEventListener('click', (e) => {
        const cible = e.target.closest ? e.target.closest('[data-action], [data-aller], .lire-suite') : null;
        if (!cible) return;
        if (cible.classList.contains('lire-suite')) { this.basculerTexte(cible.closest('.cap')); return; }
        if (cible.hasAttribute('data-aller')) { this.onUser(); this.goTo(+cible.getAttribute('data-aller')); return; }
        switch (cible.getAttribute('data-action')) {
          case 'commencer': this.onUser(); this.goTo(1); break;
          case 'lecture': this.togglePlay(); break;
          case 'precedent': this.onUser(); this.step(-1); break;
          case 'suivant': this.onUser(); this.step(1); break;
          case 'debut': this.onUser(); this.goTo(0); break;
        }
      });
      if (typeof ResizeObserver !== 'undefined') {
        this.ro = new ResizeObserver(() => this.measure());
        this.ro.observe(this.stage);
      } else {
        window.addEventListener('resize', () => this.measure());
      }
    }

    /* ---------- mobile : panneau de texte repliable ---------- */
    basculerTexte(cap, ouvrir) {
      if (!cap) return;
      const ouvert = ouvrir == null ? !cap.classList.contains('ouvert') : ouvrir;
      if (ouvert === cap.classList.contains('ouvert')) return;
      cap.classList.toggle('ouvert', ouvert);
      const b = cap.querySelector('.lire-suite');
      if (b) {
        b.setAttribute('aria-expanded', String(ouvert));
        b.textContent = ouvert ? 'Réduire' : 'Lire la suite';
      }
      if (!ouvert) cap.scrollTop = 0;
      this.stage.classList.toggle('feuille-ouverte', !!this.stage.querySelector('.cap.ouvert'));
    }

    fermerTextes() {
      this.stage.querySelectorAll('.cap.ouvert').forEach((c) => this.basculerTexte(c, false));
    }

    /* hauteur commune des panneaux repliés, et place laissée en bas pour la route */
    mesurerFeuilles() {
      const st = this.stage.style;
      this.fermerTextes();
      st.setProperty('--cap-h', '0px');
      let max = 0, bas = 8;
      const rs = this.stage.getBoundingClientRect();
      for (const s of this.scenes) {
        if (!s.cap) continue;
        max = Math.max(max, s.cap.offsetHeight);
        bas = rs.bottom - s.cap.getBoundingClientRect().bottom;
      }
      st.setProperty('--cap-h', Math.ceil(max) + 'px');
      st.setProperty('--feuille', Math.ceil(max + bas) + 'px');
    }

    /* ---------- éléments animés ---------- */
    collect() {
      const nums = (s) => (s || '').trim().split(/\s+/).filter(Boolean).map(Number);
      const effets = (racine) => Array.from(racine.querySelectorAll('[data-fx]')).map((n) => {
        const t = nums(n.getAttribute('data-t'));
        return { el: n, type: n.getAttribute('data-fx'), s: t[0] || 0, d: t[1] || 0, v: nums(n.getAttribute('data-v')), k: -1 };
      });
      this.layers = Array.from(this.stage.querySelectorAll('[data-f]')).map((el) => ({ el, f: +el.getAttribute('data-f'), m: +(el.getAttribute('data-m') || 0) }));
      this.scenes = Array.from(this.stage.querySelectorAll('[data-scene]')).map((el) => {
        const cap = el.querySelector('.cap');
        const art = el.querySelector('.art');
        const txt = cap ? Array.from(cap.querySelectorAll('h1, h2, .cap > p')).map((n) => n.textContent).join(' ') : '';
        /* deux dessins par scène : paysage et portrait ; la scène 9 (tableau) n'en a qu'un */
        const pays = art.querySelector('svg.paysage') || art;
        const port = art.querySelector('svg.portrait') || art;
        const v = (racine) => ({ racine, fx: effets(racine) });
        const paysage = v(pays);
        const portrait = port === pays ? paysage : v(port);
        return { el, i: +el.getAttribute('data-scene'), cap, art, paysage, portrait, v: paysage, fx: paysage.fx, p: -1, near: null, words: txt.split(/\s+/).filter(Boolean).length };
      });
      this.wheels = Array.from(this.stage.querySelectorAll('[data-wheel]')).map((el) => ({ el, k: +el.getAttribute('data-wheel') }));
      this.convoi = this.stage.querySelector('[data-convoi]');
      this.caisses = Array.from(this.stage.querySelectorAll('[data-tbody]')).map((el) => ({ el, amp: +(el.getAttribute('data-amp') || 1.4) }));
      this.prog = this.stage.querySelector('[data-prog]');
      this.hint = this.stage.querySelector('[data-hint]');
      this.force = true;
    }

    /* choisit le dessin (paysage ou portrait) de chaque scène */
    changerVariante() {
      for (const s of this.scenes) {
        s.v = this.mobile ? s.portrait : s.paysage;
        s.fx = s.v.fx;
        s.p = -1;
        for (const e of s.fx) e.k = -1;
      }
      this.force = true;
    }

    measure() {
      if (!this.root || !this.stage || !this.scenes) return;
      const vh = this.root.clientHeight || 800;
      this.W = this.stage.clientWidth || 1200;
      /* même règle que la requête de conteneur de style.css */
      const mobile = this.W <= 760 || (vh > this.W && this.W <= 1100);
      if (mobile !== this.mobile) {
        this.mobile = mobile;
        this.changerVariante();
        if (mobile) { this.tmx = this.tmy = 0; }
      }
      if (mobile) this.mesurerFeuilles();
      else { this.fermerTextes(); this.stage.style.removeProperty('--cap-h'); this.stage.style.removeProperty('--feuille'); }
      this.unit = vh * this.LEN;
      if (this.track) this.track.style.height = Math.round(this.END * this.unit + vh) + 'px';
      if (this.ready) this.root.scrollTop = this.target * this.unit;
      else { this.target = this.u = this.root.scrollTop / this.unit; this.ready = true; }
      this.force = true;
      this.kick();
    }

    /* ?image=N : ouvre directement l'image N, animation terminée */
    ouvrirImage(p) {
      if (p == null || !/^\d+$/.test(p)) return;
      const j = +p;
      if (j < 0 || j >= this.N) return;
      this.setScroll(this.doneAt(j));
      this.u = this.target;
      this.force = true;
    }

    /* ---------- position de la caméra ---------- */
    camAt(u) {
      if (u < .5) return { cam: 0, i: 0, a: Math.max(0, u / .5), travel: false };
      const v = u - .5, i = Math.min(this.N - 1, Math.floor(v) + 1), f = v - (i - 1);
      if (f < this.T) return { cam: i - 1 + this.easeIO(f / this.T), i, a: 0, travel: true };
      return { cam: i, i, a: Math.min(1, (f - this.T) / (this.DONE - this.T)), travel: false };
    }

    doneAt(j) { return j <= 0 ? 0 : Math.min(this.END, .5 + (j - 1) + this.DONE + .02); }

    /* ---------- navigation ---------- */
    kick() { if (!this.raf && typeof requestAnimationFrame !== 'undefined') this.raf = requestAnimationFrame(this.tick); }

    setScroll(v) { this.target = v; if (this.root && this.unit) this.root.scrollTop = v * this.unit; }

    goTo(j) {
      j = Math.max(0, Math.min(this.N - 1, j));
      const to = this.doneAt(j), from = this.target;
      if (this.reduce) { this.setScroll(to); this.u = to; this.kick(); return; }
      this.tween = { j, from, to, t0: performance.now(), dur: Math.min(4800, Math.max(900, Math.abs(to - from) * 2600)) };
      this.kick();
    }

    step(dir) {
      const base = this.tween ? this.tween.j : Math.round(this.camAt(this.target).cam);
      this.goTo(base + dir);
    }

    togglePlay() {
      if (this.playing) { this.setPlaying(false); return; }
      this.tween = null; this.held = -1; this.hold = 0;
      if (this.target >= this.END - .01) { this.setScroll(0); this.u = 0; }
      this.setPlaying(true);
      this.root.focus({ preventScroll: true });
    }

    holdFor(i) {
      const s = this.scenes && this.scenes[i];
      return Math.max(2500, Math.min(12000, (s ? s.words : 50) * 220 - 3500));
    }

    autoStep(dt) {
      if (this.target >= this.END - .001) { this.setPlaying(false); return false; }
      const c = this.camAt(this.target);
      if (!c.travel && c.a >= 1 && c.i > 0 && this.held !== c.i) {
        this.hold += dt;
        if (this.hold < this.holdFor(c.i)) return true;
        this.held = c.i; this.hold = 0;
      }
      const rate = c.i === 0 ? 1 / 1600 : (c.travel ? 1 / 5000 : 1 / 6500);
      this.setScroll(Math.min(this.END, this.target + dt * rate));
      return true;
    }

    onKey(e) {
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); this.onUser(); this.step(1); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); this.onUser(); this.step(-1); }
      else if (k === 'Home') { e.preventDefault(); this.onUser(); this.goTo(0); }
      else if (k === 'End') { e.preventDefault(); this.onUser(); this.goTo(this.N - 1); }
      else if (k === ' ' || k === 'Spacebar') {
        if (e.target && /^(BUTTON|A|SUMMARY)$/.test(e.target.tagName)) return;
        e.preventDefault(); this.togglePlay();
      }
    }

    /* ---------- boucle d'animation ---------- */
    frame(now) {
      this.raf = 0;
      const dt = this.last ? Math.min(50, now - this.last) : 16.7;
      this.last = now;
      let busy = false;
      if (this.tween) {
        const tw = this.tween, p = Math.min(1, (now - tw.t0) / tw.dur);
        this.setScroll(tw.from + (tw.to - tw.from) * this.easeIO(p));
        if (p >= 1) this.tween = null;
        busy = true;
      } else if (this.playing) busy = this.autoStep(dt);
      if (this.reduce || this.tween) this.u = this.target;
      else {
        this.u += (this.target - this.u) * (1 - Math.pow(.86, dt / 16.7));
        if (Math.abs(this.target - this.u) < 2e-4) this.u = this.target; else busy = true;
      }
      const km = 1 - Math.pow(.92, dt / 16.7);
      this.mx += (this.tmx - this.mx) * km; this.my += (this.tmy - this.my) * km;
      if (Math.abs(this.tmx - this.mx) + Math.abs(this.tmy - this.my) > 1e-3) busy = true;
      if (this.paint(dt)) busy = true;
      if (busy) this.kick(); else this.last = 0;
    }

    paint(dt) {
      if (!this.stage || !this.W || !this.scenes) return false;
      const c = this.camAt(this.u), W = this.W;
      const cam = this.reduce ? Math.round(c.cam) : c.cam;
      const moving = Math.abs(cam - this.lastCam) > 1e-5;
      let busy = moving;
      /* parallaxe de la souris : horizontale libre, verticale bornée à ±6 px */
      const mx = this.mx * 40, my = this.my * 24;
      for (const L of this.layers) {
        const y = Math.max(-6, Math.min(6, my * L.m / 10));
        L.el.style.transform = 'translate3d(' + (-cam * W * L.f + mx * L.m / 10).toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      }
      for (const s of this.scenes) {
        const d = s.i - cam, near = Math.abs(d) < .999;
        if (near !== s.near) { s.el.style.visibility = near ? 'visible' : 'hidden'; s.near = near; }
        if (!near) continue;
        if (s.cap) s.cap.style.transform = 'translate3d(' + (d * .28 * W).toFixed(1) + 'px,0,0)';
        if (s.art) s.art.style.transform = 'translate3d(' + (d * .04 * W).toFixed(1) + 'px,0,0)';
        const p = s.i < c.i ? 1 : s.i > c.i ? 0 : c.a;
        if (p !== s.p || this.force) { for (const e of s.fx) this.applyFx(e, p); s.p = p; }
        const drv = this.drivers[s.i];
        if (drv && drv.call(this, s, p, dt)) busy = true;
      }
      this.force = false;
      for (const w of this.wheels) w.el.style.transform = 'rotate(' + (cam * 420 * w.k).toFixed(1) + 'deg)';
      if (this.convoi) {
        const m = moving ? '1' : '0';
        if (this.convoi.getAttribute('data-moving') !== m) this.convoi.setAttribute('data-moving', m);
        for (const t of this.caisses) t.el.style.transform = 'translateY(' + (moving ? Math.sin(cam * 47) * t.amp : 0).toFixed(2) + 'px)';
      }
      this.lastCam = cam;
      if (this.prog) this.prog.style.transform = 'scaleX(' + Math.min(1, this.u / this.END).toFixed(4) + ')';
      if (this.hint) this.hint.style.opacity = Math.max(0, 1 - this.u * 5).toFixed(3);
      const cur = Math.round(cam);
      if (cur !== this.cur) {
        this.cur = cur;
        this.fermerTextes();
        this.majInterface();
      }
      return busy;
    }

    /* ---------- effets déclarés dans le dessin (data-fx, data-t, data-v) ---------- */
    applyFx(e, p) {
      let k = e.d > 0 ? (p - e.s) / e.d : (p >= e.s ? 1 : 0);
      k = k < 0 ? 0 : k > 1 ? 1 : k;
      if (k === e.k && !this.force) return;
      e.k = k;
      const st = e.el.style, v = e.v;
      switch (e.type) {
        case 'fade': st.opacity = k; break;
        case 'out': st.opacity = 1 - k; break;
        case 'flash': st.opacity = (Math.sin(Math.PI * k) * .85).toFixed(3); break;
        case 'pop': { const b = this.back(k); st.opacity = Math.min(1, k * 3); st.transform = 'translateY(' + ((1 - b) * 14).toFixed(1) + 'px) scale(' + (.55 + .45 * b).toFixed(3) + ')'; break; }
        case 'rise': { const b = this.easeO(k); st.opacity = b; st.transform = 'translateY(' + ((1 - b) * 26).toFixed(1) + 'px)'; break; }
        case 'drop': { const b = this.bounce(k); st.opacity = k > 0 ? 1 : 0; st.transform = 'translateY(' + (-(1 - b) * (v[0] || 300)).toFixed(1) + 'px)'; break; }
        case 'grow': { const b = this.back(k); st.opacity = k > 0 ? 1 : 0; st.transform = 'scale(' + Math.max(0, b).toFixed(3) + ')'; break; }
        case 'growx': st.transform = 'scaleX(' + this.easeIO(k).toFixed(3) + ')'; break;
        case 'growy': st.transform = 'scaleY(' + this.easeIO(k).toFixed(3) + ')'; break;
        case 'slide': { const b = this.easeO(k); st.opacity = Math.min(1, k * 2.5); st.transform = 'translate(' + ((1 - b) * (v[0] || 0)).toFixed(1) + 'px,' + ((1 - b) * (v[1] || 0)).toFixed(1) + 'px)'; break; }
        case 'fly': { const b = this.easeIO(k); st.transform = 'translate(' + (b * (v[0] || 0)).toFixed(1) + 'px,' + (b * (v[1] || 0)).toFixed(1) + 'px)'; break; }
        case 'arc': { const b = this.easeIO(k); st.transform = 'translate(' + (b * v[0]).toFixed(1) + 'px,' + (b * v[1] - Math.sin(Math.PI * b) * (v[2] || 60)).toFixed(1) + 'px)'; break; }
        case 'draw': {
          /* longueur mesurée au premier affichage (le dessin portrait est masqué sur ordinateur) */
          if (!e.len) {
            try { e.len = Math.ceil(e.el.getTotalLength()) + 2; } catch (er) { e.len = 0; }
            if (e.len) st.strokeDasharray = e.len + ' ' + e.len;
          }
          if (e.len) st.strokeDashoffset = ((1 - this.easeIO(k)) * e.len).toFixed(1);
          break;
        }
        case 'spin': st.transform = 'rotate(' + (this.easeIO(k) * (v[0] || 360)).toFixed(1) + 'deg)'; break;
        case 'count': {
          const n = v[0] + (v[1] - v[0]) * this.easeO(k);
          const t = O.nombre(n, v[2] || 0);
          if (e.el.textContent !== t) e.el.textContent = t;
          break;
        }
        case 'win': {
          const f = .03, o = Math.max(0, Math.min(1, (p - e.s) / f, (e.s + e.d - p) / f));
          st.opacity = o.toFixed(3); st.visibility = o > 0 ? 'visible' : 'hidden';
          break;
        }
      }
    }

    spring(sp, target, dt, live) {
      if (this.reduce || !live) { sp.x = target; sp.v = 0; return false; }
      const s = dt / 16.7;
      sp.v += (target - sp.x) * .07 * s; sp.v *= Math.pow(.84, s); sp.x += sp.v * s;
      return Math.abs(sp.v) > .005 || Math.abs(target - sp.x) > .005;
    }

    seg(p, segs, v0) {
      let v = v0;
      for (const [a, b, from, to] of segs) {
        if (p >= b) v = to;
        else { if (p > a) v = from + (to - from) * this.easeIO((p - a) / (b - a)); break; }
      }
      return v;
    }

    setText(el, t) { if (el && el.textContent !== t) el.textContent = t; }

    /* éléments d'un pilote, cherchés dans le dessin affiché (paysage ou portrait) */
    piece(s, sel) { return s.v.racine.querySelector(sel); }

    /* 1 · la balance penche selon les blocs posés, puis revient à l'équilibre */
    drvBalance(s, p, dt) {
      const v = s.v;
      if (!v.b) {
        const beam = this.piece(s, '[data-beam]');
        v.b = { beam, bras: +(beam.getAttribute('data-bras') || 190), L: this.piece(s, '[data-pl="L"]'), R: this.piece(s, '[data-pl="R"]'),
          blocks: Array.from(v.racine.querySelectorAll('[data-w]')).map((n) => ({ side: n.getAttribute('data-side'), w: +n.getAttribute('data-w'), e: v.fx.find((f) => f.el === n) })) };
      }
      let L = 0, R = 0;
      for (const b of v.b.blocks) if (b.e && b.e.k >= .9) { if (b.side === 'L') L += b.w; else R += b.w; }
      const target = Math.max(-9, Math.min(9, (R - L) * .12));
      const live = this.spring(this.sp.beam, target, dt, s.p > 0 && s.p < 1);
      const th = this.sp.beam.x, dy = v.b.bras * Math.sin(th * Math.PI / 180);
      v.b.beam.style.transform = 'rotate(' + th.toFixed(2) + 'deg)';
      v.b.L.style.transform = 'translateY(' + (-dy).toFixed(1) + 'px)';
      v.b.R.style.transform = 'translateY(' + dy.toFixed(1) + 'px)';
      return live;
    }

    /* 4 · cinq années d'usure */
    drvAmort(s, p) {
      const v = s.v;
      if (!v.m) {
        const tok = this.piece(s, '[data-tok]');
        const tv = (tok.getAttribute('data-v') || '368 -36 70').split(/\s+/).map(Number);
        v.m = { yr: this.piece(s, '[data-yr]'), val: this.piece(s, '[data-val]'), bar: this.piece(s, '[data-bar]'), rust: this.piece(s, '[data-rust]'), tok, tv, badge: this.piece(s, '[data-badge]'), pills: Array.from(v.racine.querySelectorAll('[data-pill]')) };
      }
      const m = v.m, yp = Math.max(0, Math.min(1, (p - .12) / .8)) * 5;
      const n = p <= .12 ? 0 : Math.min(5, Math.floor(yp) + 1);
      const ph = yp >= 5 ? 1 : yp - Math.floor(yp);
      this.setText(m.yr, n ? 'Année ' + n : 'À l’achat');
      this.setText(m.val, String(Math.max(0, 100 - 20 * n)));
      m.bar.style.transform = 'scaleX(' + Math.max(0, (100 - 20 * yp) / 100).toFixed(3) + ')';
      m.rust.style.opacity = (yp / 5).toFixed(3);
      m.pills.forEach((el, j) => { el.style.opacity = j < n ? 1 : 0; });
      const live = n >= 1 && ph < .7;
      const t = live ? this.easeIO(ph / .7) : 0;
      m.tok.style.opacity = live ? Math.sin(Math.PI * Math.min(1, ph / .7)).toFixed(3) : 0;
      m.tok.style.transform = 'translate(' + (t * m.tv[0]).toFixed(1) + 'px,' + (t * m.tv[1] - Math.sin(Math.PI * t) * m.tv[2]).toFixed(1) + 'px)';
      m.badge.style.transform = 'scale(' + (1 + (n >= 1 ? .14 * Math.max(0, 1 - Math.abs(ph - .3) / .2) : 0)).toFixed(3) + ')';
      return false;
    }

    /* 5 · le nuage arrive, le parapluie s'ouvre, puis se replie en partie */
    drvUmbrella(s, p) {
      const v = s.v;
      if (!v.u) {
        const cloud = this.piece(s, '[data-cloud]');
        /* course du nuage : entrée, sortie, montée (data-v ; le portrait sort moins loin pour rester dans le cadre) */
        const cv = (cloud.getAttribute('data-v') || '460 300 40').split(/\s+/).map(Number);
        v.u ={ cloud, cv, rain: this.piece(s, '[data-rain]'), can: this.piece(s, '[data-canopy]'), txt: this.piece(s, '[data-provtxt]') };
      }
      const u = v.u, c = (x) => Math.max(0, Math.min(1, x));
      const kin = this.easeO(c(p / .22)), kout = this.easeIO(c((p - .6) / .2));
      u.cloud.style.transform = 'translate(' + ((1 - kin) * u.cv[0] + kout * u.cv[1]).toFixed(1) + 'px,' + (-kout * u.cv[2]).toFixed(1) + 'px) scale(' + (1 - .25 * kout).toFixed(3) + ')';
      u.cloud.style.opacity = (1 - .5 * kout).toFixed(3);
      const heavy = c((p - .18) / .06) * (1 - c((p - .6) / .1));
      u.rain.style.opacity = (heavy + (p > .6 && p < .78 ? .3 : 0)).toFixed(3);
      u.rain.style.transform = 'translateX(' + (kout * u.cv[1]).toFixed(1) + 'px)';
      const open = this.easeO(c((p - .25) / .1)), fold = this.easeIO(c((p - .8) / .1));
      u.can.style.transform = 'scaleX(' + (.1 + .9 * open - .3 * fold).toFixed(3) + ')';
      u.txt.style.opacity = open.toFixed(3);
      this.setText(u.txt, p < .85 ? 'Provision : 10' : 'Provision : 6');
      return false;
    }

    /* 6 · le compteur monte, avec un ressort sur l'aiguille */
    drvGauge(s, p, dt) {
      const v = s.v;
      if (!v.g) {
        const arc = this.piece(s, '[data-arc]');
        v.g = { needle: this.piece(s, '[data-needle]'), arc, l: +(arc.getAttribute('data-l') || 553), val: this.piece(s, '[data-ebv]') };
      }
      const val = this.seg(p, [[.06, .18, 0, 64], [.3, .4, 64, 84], [.48, .56, 84, 94], [.64, .72, 94, 90]], 0);
      const live = this.spring(this.sp.needle, val, dt, p > 0 && p < 1);
      const x = this.sp.needle.x;
      v.g.needle.style.transform = 'rotate(' + (-90 + x / 120 * 180).toFixed(2) + 'deg)';
      v.g.arc.style.strokeDashoffset = (v.g.l * (1 - Math.max(0, Math.min(1, x / 120)))).toFixed(1);
      this.setText(v.g.val, String(Math.round(val)));
      return live;
    }

    /* 7 · deux bocaux qui ne bougent pas ensemble */
    drvJars(s, p) {
      const v = s.v;
      if (!v.j) v.j = { r: this.piece(s, '[data-jr]'), c: this.piece(s, '[data-jc]'), rv: this.piece(s, '[data-rv]'), cv: this.piece(s, '[data-cv]') };
      const res = this.seg(p, [[.14, .26, 0, 50], [.36, .48, 50, 30]], 0);
      const cai = this.seg(p, [[.58, .7, 100, 0], [.8, .92, 0, 60]], 100);
      v.j.r.style.transform = 'scaleY(' + (res / 120).toFixed(3) + ')';
      v.j.c.style.transform = 'scaleY(' + (cai / 120).toFixed(3) + ')';
      this.setText(v.j.rv, String(Math.round(res)));
      this.setText(v.j.cv, String(Math.round(cai)));
      return false;
    }

    easeIO(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    easeO(t) { return 1 - Math.pow(1 - t, 3); }
    back(t) { const c1 = 1.70158, c3 = c1 + 1; return t <= 0 ? 0 : 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
    bounce(t) {
      const n = 7.5625, d = 2.75;
      if (t < 1 / d) return n * t * t;
      if (t < 2 / d) { t -= 1.5 / d; return n * t * t + .75; }
      if (t < 2.5 / d) { t -= 2.25 / d; return n * t * t + .9375; }
      t -= 2.625 / d; return n * t * t + .984375;
    }
  }

  /* ====================================================================================
     3. Démarrage
     ==================================================================================== */

  const ligne = document.querySelector('[data-champ]');
  remplirComptes(ligne && ligne.closest('[data-scene]'));
  window.KuhnTutoriel = new Tutoriel(document.querySelector('.hx'));
})();
