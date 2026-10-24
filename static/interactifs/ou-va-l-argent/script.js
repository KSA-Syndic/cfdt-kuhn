/* « Où va l'argent d'une année ? » (maquette A) : la cascade des comptes de KUHN SAS en six étapes.
   Exercices, montants et remarques entre années viennent de window.KuhnDonnees : aucun chiffre en dur. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var D = window.KuhnDonnees;
  var ANNEES = O.donnees.annees();
  var AFF = D.affaire;
  var NB_ETAPES = 6;

  /* ?annee=2022&etape=4 ouvre directement un exercice et une étape (liens, vérifications) */
  var demandee = +O.parametre('annee');
  var etapeDemandee = +O.parametre('etape');
  var etat = {
    annee: ANNEES.indexOf(demandee) >= 0 ? demandee : O.donnees.dernier(),
    etape: etapeDemandee >= 1 && etapeDemandee <= NB_ETAPES ? Math.floor(etapeDemandee) : 1,
    detail: false,
    info: null
  };
  /* l'étape 3 « coupe » la valeur ajoutée : on se souvient de la précédente pour rejouer les fondus */
  var precedent = { annee: null, etape: null };

  var $ = function (id) { return document.getElementById(id); };
  var f = function (v) { return O.nombre(Math.abs(v), 1); };
  var p0 = function (v) { return O.nombre(v, 0); };
  var signe = function (v) { return Math.round(v * 10) / 10 < 0 ? '−' : '+'; };
  var g = O.gabarit;
  var ENCRE = '#14171C', SORT = '#C8102E', AJOUT = '#1F5FBF';
  var MOTS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
  var BADGES = {
    off: ['Officiel', 'badge--officiel'],
    calc: ['Calculé', 'badge--calcule'],
    est: ['Estimé', 'badge--estime']
  };

  /* ---------- Exercices : boutons (écran large) et liste déroulante (mobile) ---------- */
  var nav = $('annees');
  var liste = $('annees-liste');
  ANNEES.forEach(function (a) {
    nav.appendChild(O.el('button', { type: 'button', 'data-annee': a, text: String(a), onclick: function () { choisir(a); } }));
    liste.appendChild(O.el('option', { value: a, text: String(a) }));
  });
  liste.addEventListener('change', function () { choisir(+liste.value); });

  function choisir(a) {
    etat.annee = a;
    etat.info = null;
    rendre();
  }

  /* ---------- Les lignes de la cascade (créées une fois, mises à jour à chaque rendu) ---------- */
  var DEFS = [
    { id: 'va', libelle: 'Valeur ajoutée', total: true, badge: 'calc' },
    { id: 'perso', libelle: 'Salaires & cotisations', badge: 'off' },
    { id: 'divers', libelle: 'Refacturations & divers', badge: 'calc' },
    { id: 'ebitda', libelle: 'EBITDA', total: true, badge: 'calc' },
    { id: 'ap', libelle: 'Usure & provisions', badge: 'calc' },
    { id: 'fi', libelle: 'Financier & impôts', badge: 'off' },
    { id: 'rn', libelle: 'Bénéfice', total: true, badge: 'off' },
    { id: 'div', libelle: 'Dividende', badge: 'calc' },
    { id: 'kept', libelle: 'Gardé dans l’entreprise', total: true, badge: 'calc' }
  ];
  var lignes = $('lignes');
  var RANGS = DEFS.map(function (r) {
    var barre = O.el('div', { class: 'barre' });
    var valeur = O.el('div', { class: 'ligne__valeur chiffre' + (r.total ? ' ligne__valeur--total' : '') });
    var bouton = O.el('button', { type: 'button', class: 'ligne__info', 'aria-expanded': 'false', 'aria-controls': 'info-' + r.id, 'aria-label': 'Détail\u00A0: ' + r.libelle,
      html: '<svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"></circle><path d="M8 7.2v4M8 4.8v.2"></path></svg>',
      onclick: function () { etat.info = etat.info === r.id ? null : r.id; rendre(); } });
    var badge = O.el('span', { class: 'badge' });
    var texte = O.el('span', { class: 'info__texte' });
    var info = O.el('div', { class: 'info info--ligne', id: 'info-' + r.id, hidden: true }, [badge, texte]);
    var ligne = O.el('div', { class: 'lignes__ligne' }, [
      O.el('div', { class: 'ligne__libelle' + (r.total ? ' ligne__libelle--total' : ''), text: r.libelle }),
      O.el('div', { class: 'ligne__piste' }, [barre]),
      valeur,
      bouton
    ]);
    var rang = O.el('div', { role: 'listitem', class: 'lignes__rang' }, [ligne, info]);
    lignes.appendChild(rang);
    return { def: r, rang: rang, ligne: ligne, barre: barre, valeur: valeur, bouton: bouton, info: info, badge: badge, texte: texte };
  });

  /* ---------- Étapes ---------- */
  var etapes = $('etapes');
  var PASTILLES = [];
  for (var i = 1; i <= NB_ETAPES; i++) {
    (function (n) {
      var b = O.el('button', { type: 'button', class: 'etapes__pastille', onclick: function () { aller(n); } }, [
        O.el('span', { class: 'etapes__num', text: String(n) }),
        O.el('span', { class: 'etapes__libelle' })
      ]);
      etapes.appendChild(b);
      PASTILLES.push(b);
    })(i);
  }
  function aller(n) {
    etat.etape = n; etat.info = null; rendre();
    centrer(nouveautes(n));
  }

  /** Ce qui apparaît à l'étape n : la ligne des ventes, leur partage, puis la loupe et les lignes du moment. */
  function nouveautes(n) {
    if (n === 1) return [document.querySelector('.ligne--ventes')];
    if (n === 2) return [$('partage')];
    var rangs = RANGS.filter(function (R) { return R.rang.classList.contains('lignes__rang--courant'); })
      .map(function (R) { return R.rang; });
    return n === 3 ? [$('entonnoir')].concat(rangs) : rangs;
  }

  /** Centre ces éléments dans la partie visible de l'écran, entre le récit (collé en haut sur mobile) et
      la barre des étapes (collée en bas) ; trop hauts, ils s'alignent en haut de cette zone. Sur ordinateur, on ne bouge que s'ils sortent de
      l'écran ; sur mobile, on centre à chaque étape. */
  function centrer(els) {
    var haut = Infinity, bas = -Infinity;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      haut = Math.min(haut, r.top);
      bas = Math.max(bas, r.bottom);
    });
    if (!isFinite(haut)) return;
    var marge = 16;
    var zoneHaut = 0, zoneBas = window.innerHeight;
    /* mobile : le récit collé en haut et la barre des étapes collée en bas bornent la zone visible
       (leur hauteur, pas leur position du moment : elles ne sont pas toujours déjà collées) */
    var recit = document.querySelector('.recit'), barre = document.querySelector('.etapes');
    if (getComputedStyle(recit).position === 'sticky') zoneHaut = recit.offsetHeight;
    if (getComputedStyle(barre).position === 'sticky') zoneBas -= barre.offsetHeight;
    if (!O.media('(max-width: 640px)') && haut >= zoneHaut + marge && bas <= zoneBas - marge) return;
    var decalage = bas - haut <= zoneBas - zoneHaut - 2 * marge
      ? (haut + bas) / 2 - (zoneHaut + zoneBas) / 2
      : haut - zoneHaut - marge;
    if (Math.abs(decalage) < 4) return;
    window.scrollBy({ top: decalage, behavior: O.mouvementReduit() ? 'auto' : 'smooth' });
  }
  $('prec').addEventListener('click', function () { aller(Math.max(1, etat.etape - 1)); });
  $('suiv').addEventListener('click', function () { aller(etat.etape === NB_ETAPES ? 1 : etat.etape + 1); });
  $('plus').addEventListener('click', function () { etat.detail = !etat.detail; rendre(); });
  $('ventes-info').addEventListener('click', function () { etat.info = etat.info === 'top' ? null : 'top'; rendre(); });
  $('loupe').addEventListener('click', function () { etat.info = etat.info === 'zoom' ? null : 'zoom'; rendre(); });
  /* la bulle de la loupe se ferme d'un clic ailleurs ou avec Échap */
  document.addEventListener('click', function (e) {
    if (etat.info !== 'zoom' || $('loupe').contains(e.target) || $('loupe-bulle').contains(e.target)) return;
    etat.info = null; rendre();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || etat.info !== 'zoom') return;
    etat.info = null; rendre();
  });

  /* affiche ou masque un panneau ; il apparaît en fondu quand il s'ouvre */
  function montrer(el, visible) {
    var ouvre = visible && el.hidden;
    el.hidden = !visible;
    if (ouvre) fondu(el);
  }

  /* rejoue l'apparition d'un élément dont le contenu change */
  function fondu(el) {
    if (O.mouvementReduit()) return;
    el.classList.remove('fondu--joue');
    void el.offsetWidth;
    el.classList.add('fondu--joue');
  }

  /* ---------- Les textes de chaque étape : des gabarits remplis par les données ---------- */
  function recit(y, d) {
    var est = d.dividende_estime;
    var x = D.meta.extremes;
    var dernier = O.donnees.dernier();
    /* poids des salaires : au plus bas du cycle, puis au dernier exercice */
    var creux = x.poids_personnel.min.annee !== dernier ? x.poids_personnel.min : x.poids_personnel.max;
    var pa = AFF.pappers[AFF.annee], xa = D.exercices[AFF.annee], xc = D.exercices[AFF.comparaison];
    var methode = d.dividende_methode || {};
    var v = {
      annee: y, ca: f(d.ventes), achats: f(d.achats), va: f(d.valeur_ajoutee), perso: f(d.personnel),
      ppva: p0(d.part_personnel_va), divers: f(d.refacturations_divers), ebitda: f(d.ebitda),
      marge: f(d.marge_ebitda), ap: signe(d.usure_provisions) + f(d.usure_provisions),
      fi: signe(d.financier_impots) + f(d.financier_impots), rn: f(d.resultat_net),
      div: f(d.dividende), taux: p0(d.taux_distribution), garde: f(d.garde), prov: f(d.effet_provisions),
      verse: d.dividende_verse_en,
      creux: O.nombre(creux.valeur, 1), anneeCreux: creux.annee,
      pDernier: O.nombre(D.exercices[dernier].poids_personnel, 1), dernier: dernier,
      bas: Math.floor(pa.ebitda), margeBas: O.nombre(pa.marge, 1), anneeAff: AFF.annee,
      transfAff: f(xa.transferts), anneeComp: AFF.comparaison,
      margeComp: O.nombre(xc.marge_ebitda, 1), margeAff: O.nombre(xa.marge_ebitda, 1),
      sur: MOTS[methode.sur] || methode.sur,
      tmin: p0(x.taux_distribution.min.valeur), tmax: p0(x.taux_distribution.max.valeur),
      actions: O.nombre(D.meta.actions, 0)
    };
    return [
      { libelle: 'Ventes', titre: 'Les ventes', grand: v.ca, couleur: ENCRE,
        texte: g("En {annee}, KUHN SAS a facturé {ca} M€. Une partie de ces ventes va à d'autres sociétés du groupe.", v),
        detail: "Chiffre d'affaires net des comptes sociaux. Ce n'est pas le CA du groupe KUHN mondial, publié par Bucher Industries, qui additionne toutes les filiales sans les ventes internes.",
        source: 'comptes sociaux de KUHN SAS' },
      { libelle: 'Valeur ajoutée', titre: 'La valeur ajoutée', grand: v.va, couleur: ENCRE,
        texte: g("Une fois payés l'acier, les composants et les services ({achats} M€), il reste {va} M€ : la richesse créée par le travail des sites. C'est cette part qu'on suit ensuite.", v),
        detail: g("Valeur ajoutée = production de l'exercice − achats consommés et charges externes. Elle sert à payer les salaires, les impôts, l'usure des machines, puis l'actionnaire.", v),
        source: 'comptes sociaux, calcul' },
      { libelle: 'Salaires', titre: 'Les salaires', grand: v.perso, couleur: SORT,
        texte: g('Sur les {va} M€ qui restent, salaires et cotisations en absorbent {perso} M€, soit {ppva} %.', v),
        detail: g("Ce poids monte mécaniquement quand l'activité baisse, car les effectifs s'ajustent plus lentement que les ventes : {creux} % des ventes en {anneeCreux}, {pDernier} % en {dernier}.", v),
        source: 'comptes sociaux (salaires + charges sociales)' },
      { libelle: 'EBITDA', titre: "L'argent dégagé", grand: v.ebitda, couleur: ENCRE,
        texte: g("Avec {divers} M€ de refacturations et produits divers (nets des taxes), l'activité dégage {ebitda} M€ d'EBITDA, soit {marge} % des ventes.", v),
        detail: g("EBITDA = résultat d'exploitation + amortissements + dotations nettes des reprises de provisions (aucune norme ne le définit). Des chiffres bien plus bas circulent (environ {bas} M€, soit {margeBas} % en {anneeAff}) : ils laissent de côté les {transfAff} M€ de transferts de charges. Les deux conventions existent, mais comparer {anneeComp} (frais comptés) à {anneeAff} (frais retirés) mélange deux méthodes. Calculée chaque année de la même façon, la marge passe de {margeComp} % ({anneeComp}) à {margeAff} % ({anneeAff}).", v),
        source: 'comptes sociaux, calcul à méthode constante' },
      { libelle: 'Bénéfice', titre: 'Le bénéfice', grand: v.rn, couleur: ENCRE,
        texte: g("Après l'usure des machines et les provisions ({ap} M€), puis le financier et l'impôt ({fi} M€), le bénéfice atteint {rn} M€.", v),
        detail: d.effet_provisions > 0.5
          ? g("Cette année, les provisions ont soutenu le résultat de {prov} M€ : on a repris plus de provisions qu'on n'en a constitué.", v)
          : (d.effet_provisions < -0.5
            ? g("Cette année, les provisions ont pesé sur le résultat ({prov} M€ de dotations nettes) : l'entreprise a mis de côté pour plus tard.", v)
            : 'Cette année, les provisions ont été quasi neutres.'),
        source: 'comptes sociaux, tableau des provisions' },
      { libelle: 'Dividende', titre: 'Le dividende', grand: v.div, couleur: SORT, est: est,
        texte: g("{div} M€ remontent à KUHN Group, puis à Bucher Industries, soit {taux} % du bénéfice. Il reste {garde} M€ dans l'entreprise.", v),
        detail: est
          ? g("Le dividende versé en {verse} n'est pas encore publié : estimation au taux moyen des {sur} années précédentes ({tmin} à {tmax} % selon les années).", v)
          : g('Dividende versé l’année suivante, reconstitué à l’euro près par la variation des réserves : un montant rond par action ({actions} actions).', v),
        source: est ? 'estimation' : 'comptes sociaux, variation des réserves' }
    ];
  }

  function infos(d) {
    var est = d.dividende_estime;
    var m = d.dividende_methode || {};
    return {
      va: "Ce qui reste des ventes après les achats\u00A0: la richesse créée sur place par le travail.",
      perso: 'Salaires et traitements + charges sociales.',
      divers: g("Transferts de charges ({t} M€ de frais refacturés ou reclassés, ce ne sont pas des provisions) et autres produits, moins impôts, taxes et autres charges.", { t: f(d.transferts) }),
      ebitda: "Argent brut dégagé par l'activité, avant amortissements et provisions. Calculé chaque année de la même façon.",
      ap: g('Amortissements ({a} M€) et effet net des provisions ({p} M€ : reprises moins dotations).', { a: f(d.amortissements), p: signe(d.effet_provisions) + f(d.effet_provisions) }),
      fi: "Dividendes reçus des filiales et intérêts, moins l'impôt sur les sociétés et la participation des salariés.",
      rn: "Résultat net de l'exercice, publié dans les comptes.",
      div: est
        ? g('Versé en {verse} : montant pas encore publié, estimé au taux moyen {de}–{a} ({taux} %).', { verse: d.dividende_verse_en, de: m.de + 1, a: m.a + 1, taux: O.nombre(m.taux, 1) })
        : "Versé l'année suivante à KUHN Group, puis Bucher. Reconstitué à l'euro près via la variation des réserves.",
      kept: 'Part du bénéfice mise en réserve.'
    };
  }

  /* ---------- Rendu ---------- */
  function rendre() {
    var y = etat.annee, s = etat.etape, d = D.exercices[y];
    var est = d.dividende_estime;
    var etapesTextes = recit(y, d);
    var cur = etapesTextes[s - 1];
    var change = precedent.annee !== y || precedent.etape !== s;

    /* exercices */
    Array.prototype.forEach.call(nav.children, function (b) {
      b.setAttribute('aria-pressed', String(+b.getAttribute('data-annee') === y));
    });
    liste.value = String(y);

    /* récit */
    $('etape-num').textContent = g('Étape {n} sur {t}', { n: s, t: NB_ETAPES });
    $('titre').textContent = cur.titre;
    $('grand').textContent = cur.grand;
    $('grand').style.color = cur.couleur;
    $('texte').textContent = cur.texte;
    var badge = $('badge');
    badge.textContent = '';
    var b = O.badgeEstimation(!!cur.est);
    if (b) badge.appendChild(b);
    $('plus').setAttribute('aria-expanded', String(etat.detail));
    $('plus-libelle').textContent = etat.detail ? 'Masquer le détail' : 'Comment c’est calculé';
    montrer($('detail'), etat.detail);
    $('detail-texte').textContent = cur.detail;
    $('detail-source').textContent = 'Source\u00A0: ' + cur.source;
    if (change) ['titre', 'grand', 'texte'].forEach(function (id) { fondu($(id)); });

    /* 1. la barre des ventes, à l'échelle des ventes */
    var coupe = s >= 2;
    var aPct = d.achats / d.ventes * 100;
    $('ventes-valeur').textContent = f(d.ventes);
    $('ventes-piste').setAttribute('aria-label', 'Ventes de ' + f(d.ventes) + '\u00A0M€' +
      (coupe ? ', dont ' + f(d.achats) + '\u00A0M€ payés aux fournisseurs et ' + f(d.valeur_ajoutee) + '\u00A0M€ qui restent' : ''));
    var ba = $('barre-achats'), bv = $('barre-va');
    ba.style.cssText = 'left:0;width:' + aPct + '%;background:' + (coupe ? SORT : ENCRE) + ';opacity:' + (coupe ? .85 : 1);
    bv.style.cssText = 'left:' + aPct + '%;width:' + (100 - aPct) + '%;background:' + ENCRE +
      ';border-left:' + (coupe ? '2px solid #FFFFFF' : '0') +
      ';box-shadow:' + (s >= 3 ? 'inset 0 0 0 2px #8C95A1, 0 0 0 2px #8C95A1' : 'none');
    $('partage').classList.toggle('cache-revele--cache', !coupe);
    $('partage').setAttribute('aria-hidden', String(!coupe));
    $('partage-achats').textContent = f(d.achats);
    $('partage-va').textContent = f(d.valeur_ajoutee);
    var topOuvert = etat.info === 'top';
    $('ventes-info').setAttribute('aria-expanded', String(topOuvert));
    montrer($('ventes-detail'), topOuvert);

    /* 2. ce que devient la valeur ajoutée, à sa propre échelle */
    var loupe = s >= 3;
    var max = d.valeur_ajoutee * 1.02;
    var vaFin = d.valeur_ajoutee / max * 100;
    $('entonnoir-fond').setAttribute('d', 'M' + aPct + ' 0 L100 0 L' + vaFin + ' 54 L0 54 Z');
    $('entonnoir-gauche').setAttribute('d', 'M' + aPct + ' 0 L0 54');
    $('entonnoir-droite').setAttribute('d', 'M100 0 L' + vaFin + ' 54');
    $('entonnoir').classList.toggle('entonnoir--cache', !loupe);
    var zoomOuvert = etat.info === 'zoom';
    var zoomTexte = g('Zoom : la part noire de la barre des ventes (les {va} M€ qui restent après les achats) est agrandie ci-dessous, pour que la suite reste lisible.', { va: f(d.valeur_ajoutee) });
    var bouton = $('loupe');
    /* centrée sous la part noire (la valeur ajoutée) de la barre des ventes */
    bouton.style.left = 'min(' + ((aPct + 100) / 2) + '%, 100% - 22px)';
    bouton.setAttribute('aria-expanded', String(zoomOuvert));
    bouton.setAttribute('aria-label', zoomTexte);
    montrer($('loupe-bulle'), zoomOuvert);
    $('loupe-bulle').textContent = zoomTexte;

    /* les lignes : bornes (a → b) de chaque marche de la cascade */
    var bornes = {
      va: [0, d.valeur_ajoutee],
      perso: [d.valeur_ajoutee, d.valeur_ajoutee - d.personnel],
      divers: [d.valeur_ajoutee - d.personnel, d.ebitda],
      ebitda: [0, d.ebitda],
      ap: [d.ebitda, d.resultat_exploitation],
      fi: [d.resultat_exploitation, d.resultat_net],
      rn: [0, d.resultat_net],
      div: [d.resultat_net, d.garde],
      kept: [0, d.garde]
    };
    var textes = infos(d);
    var jusqua = [-1, -1, 1, 3, 6, 8][s - 1];
    var avant = [-1, -1, -1, 1, 3, 6][s - 1];
    var borne = function (v) { return Math.max(0, Math.min(100, v)); };
    RANGS.forEach(function (R, i) {
      var r = R.def, a = bornes[r.id][0], bb = bornes[r.id][1];
      var bas = Math.min(a, bb), haut = Math.max(a, bb);
      var gauche = borne(bas / max * 100), droite = borne(haut / max * 100);
      var visible = i <= jusqua, courant = visible && i > avant;
      var delta = bb - a;
      var couleur = r.total ? ENCRE : (delta < 0 ? SORT : AJOUT);
      var ouvert = etat.info === r.id;
      var cle = (r.id === 'div' || r.id === 'kept') && est ? 'est' : r.badge;
      R.valeur.textContent = visible ? (r.total ? f(bb) : (delta < 0 ? '− ' : '+ ') + f(delta)) : '';
      R.valeur.style.color = r.total ? '' : couleur;
      R.barre.style.cssText = 'left:' + gauche + '%;width:' + (visible ? Math.max(droite - gauche, 0.4) : 0) + '%;background:' + couleur;
      R.ligne.classList.toggle('lignes__ligne--a-venir', !visible);
      R.rang.classList.toggle('lignes__rang--courant', courant);
      R.bouton.setAttribute('aria-expanded', String(ouvert));
      montrer(R.info, ouvert);
      R.badge.textContent = BADGES[cle][0];
      R.badge.className = 'badge ' + BADGES[cle][1];
      R.texte.textContent = textes[r.id];
    });

    /* navigation */
    PASTILLES.forEach(function (p, j) {
      var n = j + 1;
      p.querySelector('.etapes__libelle').textContent = etapesTextes[j].libelle;
      p.setAttribute('aria-current', n === s ? 'step' : 'false');
      p.classList.toggle('etapes__pastille--faite', n < s);
    });
    $('compteur').textContent = g('Étape {n} sur {t}', { n: s, t: NB_ETAPES });
    var suiv = $('suiv');
    var dernierPas = s === NB_ETAPES;
    var etroit = O.media('(max-width: 640px)');
    suiv.textContent = etroit ? (dernierPas ? '↺' : '→') : (dernierPas ? 'Recommencer' : 'Étape suivante →');
    suiv.setAttribute('aria-label', dernierPas ? 'Recommencer' : 'Étape suivante');

    precedent = { annee: y, etape: s };
  }

  O.suivreMedia('(max-width: 640px)', rendre);
  rendre();
})();
