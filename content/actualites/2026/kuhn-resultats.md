---
title: "Résultats 2016–2024"
description: "Des ateliers au dividende : les flux de valeur du groupe KUHN, au-delà du seul EBITDA."
date: "2026-06-23T21:00:00+02:00"
draft: false
type: "docs"
tags: ["résultats", "dividende", "bénéfices", "EBITDA", "bilan"]
bookToc: false
kuhnResultats: true
---

<!--more-->

<!-- Article immersif : kuhnResultats: true → CSS (head) + JS (content-after) via layouts/partials/kuhn-resultats/ -->

<div class="kuhn-resultats full-width-post experience" id="kuhn-resultats">

<!-- ============ HEADER ============ -->
<header class="bar">
  <div class="brand"><span class="mk">KUHN</span><span>Flux de valeur</span><small>· comptes 2016–2024</small></div>
  <div class="bar-spacer"></div>
  <div class="yearwrap">
    <span class="lbl">Année</span>
    <div class="years" id="years" role="group" aria-label="Choisir l'exercice"></div>
    <select class="yearsel" id="yearsel" aria-label="Choisir l'exercice"></select>
  </div>
  <div class="modetog" role="group" aria-label="Mode d'affichage">
    <button id="btnExp" aria-pressed="true">Expérience</button>
    <button id="btnAna" aria-pressed="false">Analyse</button>
  </div>
</header>

<!-- progress rail -->
<div class="rail" id="rail"><div class="track"></div><div class="hit" id="railHit" role="slider" tabindex="0" aria-label="Progression : cliquez ou glissez le long de la barre pour parcourir le récit" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div><div class="grain" id="grain"></div><div class="rail-label" id="railLabel"></div></div>
<div class="mobstep" id="mobStep" aria-hidden="true"><span class="dot"></span><span id="mobStepTxt">Le voyage d'un euro</span><span class="prog" id="mobStepProg"></span></div>

<!-- ============ EXPERIENCE ============ -->
<main id="experience">

  <!-- S0 HERO -->
  <section class="scene" id="s0" data-step="0">
    <div class="inner">
      <div class="kicker rv">Le voyage d'un euro</div>
      <h1 class="rv d1">De l'atelier <span class="red">au dividende</span></h1>
      <p class="lead sub rv d2">Suivez, étape par étape, comment <b>KUHN</b> (constructeur alsacien de machines agricoles, filiale du suisse <b>Bucher Industries</b>) transforme le travail réel de ses usines en valeur, puis en bénéfice, puis en argent qui remonte vers l'actionnaire. Et pourquoi le « creux » de 2024 raconte une fin de cycle, pas une crise.</p>
      <div class="hero-tags rv d3">
        <span>🏭 L'activité réelle</span><span>🧮 L'exercice comptable</span><span>💶 Où part le bénéfice</span><span>📉 Le cycle du marché</span>
      </div>
      <div class="scrollcue rv d4"><span>Faites défiler</span><span class="arr"></span></div>
    </div>
  </section>

  <!-- S1 ACTIVITÉ RÉELLE -->
  <section class="scene" id="s1" data-step="1" style="background:linear-gradient(180deg,#0e141a,#141d26)">
    <div class="inner split">
      <div class="copy">
        <div class="scene-step rv">ÉTAPE 01 · L'usine</div>
        <h2 class="rv d1" style="font-size:clamp(30px,5vw,52px)">L'activité réelle :<br>là où la valeur naît</h2>
        <span class="perim rv d1"><span class="perim-chunk perim-chunk--head">Périmètre&nbsp;: <b>KUHN&nbsp;SAS</b></span><span class="perim-chunk">· la maison-mère de Saverne (comptes sociaux)</span></span>
        <p class="lead rv d2">On observe d'abord <b>KUHN SAS</b>, la maison-mère installée à Saverne. Des <b>fournisseurs</b> livrent l'acier (ils repartent avec de l'argent), des <b>ouvriers</b> assemblent charrues, semoirs et broyeurs, et des <b>clients</b> agriculteurs repartent avec une machine agricole en laissant leur argent. Ce qui reste après avoir payé matières et fournisseurs, c'est la <button class="gloss" data-g="valeur-ajoutee" aria-expanded="false">valeur ajoutée</button> : le carburant de l'entreprise. <span style="color:var(--steel)">Le chiffre d'affaires ci-dessous est celui de la <b>seule société KUHN SAS</b> (pas du groupe entier). Comme elle vend aussi à ses propres filiales, une partie de ce montant correspond à des ventes internes au groupe.</span></p>
        <div class="chips rv d3">
          <div class="chip"><div class="k">Argent des clients (CA)</div><div class="v gold" data-stat="ca">— M€</div><div class="d">chiffre d'affaires net</div></div>
          <div class="chip op"><div class="opsign">−</div><div class="k">Payé aux fournisseurs</div><div class="v" data-stat="fournDisp">— M€</div><div class="d">achats, sous-traitance, services (± stocks)</div></div>
          <div class="chip op"><div class="opsign">=</div><div class="k">Valeur ajoutée créée</div><div class="v green" data-stat="va">— M€</div><div class="d">ce qui reste pour faire vivre l'entreprise</div></div>
          <div class="chip op"><div class="opsign">−</div><div class="k">Versé aux salariés</div><div class="v" data-stat="perso">— M€</div><div class="d">salaires + <button class="gloss" data-g="charges" aria-expanded="false">charges</button> sociales</div></div>
        </div>
      </div>
      <div class="stagebox">
        <div class="tip rv d2">L'acier et le travail entrent d'un côté, une machine agricole ressort de l'autre : c'est ici, et nulle part ailleurs, que la <b>valeur</b> est réellement créée.</div>
        <div class="stage" id="stageFactory" aria-hidden="true">
        <svg viewBox="0 112 760 363" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="factory-clip"><rect x="150" y="195" width="470" height="197"/></clipPath></defs>
          <!-- ground -->
          <rect x="0" y="392" width="760" height="83" fill="#0b1014"/>
          <rect x="0" y="388" width="760" height="6" fill="#2a3744"/>
          <!-- factory building (cutaway) -->
          <g class="player" data-depth="0.04">
            <rect x="150" y="150" width="470" height="242" fill="#1b2632" stroke="#33485a" stroke-width="2"/>
            <!-- sawtooth roof -->
            <path d="M150 150 L195 120 L195 150 L240 120 L240 150 L285 120 L285 150 L330 120 L330 150 L375 120 L375 150 L420 120 L420 150 L465 120 L465 150 L510 120 L510 150 L555 120 L555 150 L600 120 L600 150 L620 150 Z" fill="#23323f" stroke="#33485a" stroke-width="1.5"/>
            <text x="385" y="181" text-anchor="middle" fill="#E8B23A" font-family="Bahnschrift,sans-serif" font-size="20" letter-spacing="2.5">USINE KUHN · SAVERNE</text>
            <line x1="170" y1="195" x2="600" y2="195" stroke="#2c3d4c" stroke-width="1"/>
          </g>
          <!-- conveyor -->
          <rect x="180" y="330" width="410" height="9" rx="4" fill="#33485a"/>
          <g class="conv">
            <circle cx="210" cy="350" r="11" fill="#1b2632" stroke="#4a627a" stroke-width="3"/>
            <circle cx="300" cy="350" r="11" fill="#1b2632" stroke="#4a627a" stroke-width="3"/>
            <circle cx="390" cy="350" r="11" fill="#1b2632" stroke="#4a627a" stroke-width="3"/>
            <circle cx="480" cy="350" r="11" fill="#1b2632" stroke="#4a627a" stroke-width="3"/>
            <circle cx="560" cy="350" r="11" fill="#1b2632" stroke="#4a627a" stroke-width="3"/>
          </g>
          <!-- machine on conveyor (inside factory only — exit = tractor-out) -->
          <g clip-path="url(#factory-clip)">
            <g class="seeder-flow">
              <rect x="0" y="14" width="86" height="26" rx="4" fill="#E10E2B"/>
              <rect x="10" y="2" width="30" height="16" rx="3" fill="#b80a22"/>
              <rect x="52" y="0" width="26" height="20" rx="3" fill="#c20a26"/>
              <animateTransform attributeName="transform" type="translate"
                keyTimes="0;0.14;0.48;1" values="180,290;180,290;504,290;504,290"
                dur="12s" repeatCount="indefinite" calcMode="linear"/>
              <animate attributeName="opacity"
                keyTimes="0;0.14;0.48;1" values="0;1;0;0"
                dur="12s" repeatCount="indefinite" calcMode="discrete"/>
            </g>
          </g>
          <!-- workers -->
          <g class="worker w1" transform="translate(250,300)">
            <circle cx="0" cy="0" r="11" fill="#E8B23A"/><rect x="-9" y="11" width="18" height="30" rx="6" fill="#2f6db5"/>
            <rect class="arm" x="6" y="13" width="6" height="22" rx="3" fill="#2f6db5"/>
          </g>
          <g class="worker w2" transform="translate(515,300)">
            <circle cx="0" cy="0" r="11" fill="#E8B23A"/><rect x="-9" y="11" width="18" height="30" rx="6" fill="#c44"/>
            <rect class="arm" x="-12" y="13" width="6" height="22" rx="3" fill="#c44"/>
          </g>
          <!-- supplier truck (left, in) -->
          <g class="truck-in">
            <rect x="14" y="-26" width="46" height="30" rx="3" fill="#5C6B7A"/>
            <rect x="60" y="-16" width="26" height="20" rx="3" fill="#46566a"/>
            <circle cx="30" cy="8" r="8" fill="#0e141a" stroke="#888" stroke-width="2"/>
            <circle cx="72" cy="8" r="8" fill="#0e141a" stroke="#888" stroke-width="2"/>
            <text x="37" y="-9" text-anchor="middle" fill="#cdd6df" font-family="Bahnschrift" font-size="9">ACIER</text>
          </g>
          <text x="62" y="270" text-anchor="middle" fill="#9aa6b2" font-family="Segoe UI" font-size="17">Fournisseurs →</text>
          <!-- machine aboutie (2 blocs + roues) — apparaît à droite de l'usine quand le chariot a fini le tapis -->
          <g class="tractor-out">
            <rect x="0" y="-22" width="40" height="22" rx="4" fill="#E10E2B"/>
            <rect x="30" y="-34" width="20" height="16" rx="3" fill="#c20a26"/>
            <circle cx="12" cy="6" r="11" fill="#0e141a" stroke="#777" stroke-width="3"/>
            <circle cx="44" cy="8" r="7" fill="#0e141a" stroke="#777" stroke-width="2"/>
          </g>
          <text x="688" y="270" text-anchor="middle" fill="#9aa6b2" font-family="Segoe UI" font-size="17">→ Clients</text>
          <!-- coins floating in from clients -->
          <g class="coinflow">
            <circle cx="690" cy="205" r="9" fill="#E8B23A"/><circle cx="660" cy="182" r="7" fill="#E8B23A" opacity=".8"/>
            <circle cx="710" cy="170" r="6" fill="#E8B23A" opacity=".6"/>
          </g>
        </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- S2 FILIALES -->
  <section class="scene" id="s2" data-step="2" style="background:linear-gradient(180deg,#141d26,#10171f)">
    <div class="inner">
      <div class="copy" style="max-width:60ch;margin-bottom:18px">
        <div class="scene-step rv">ÉTAPE 02 · Le groupe France</div>
        <h2 class="rv d1" style="font-size:clamp(28px,5vw,48px)">Une galaxie d'usines<br>autour de <span style="color:var(--gold)">Saverne</span></h2>
        <span class="perim rv d1"><span class="perim-chunk perim-chunk--head">Périmètre&nbsp;: <b>les filiales</b></span><span class="perim-chunk">· chacune ses propres comptes</span></span>
        <p class="lead rv d2">Saverne n'est pas seule : Huard (charrues), Audureau (matériels d'élevage & entretien du paysage), Artec (pulvérisateurs automoteurs), MGM, Parts, Blanchard… <b>chaque filiale est une société à part</b>, avec sa propre usine, son CA et son résultat. Le total ci-dessous additionne <b>leurs</b> chiffres d'affaires, à distinguer des <span data-stat="caProse">— M€</span> de KUHN SAS vus juste avant.</p>
      </div>
      <div class="fil-grid rv d2" id="filGrid"></div>
      <div class="cumul rv d3">
        <div class="lab">Chiffre d'affaires cumulé des filiales (exercice <span data-stat="year">—</span>)</div>
        <div class="v" data-stat="filca">— M€</div>
        <div class="caveat">⚠️ Somme « brute » des filiales, à ne pas confondre avec deux autres chiffres : ce n'est <b>ni</b> le CA de KUHN SAS (<span data-stat="caProse">— M€</span>, l'entité de Saverne), <b>ni</b> le CA consolidé du groupe mondial. Elle additionne des ventes en partie internes (une filiale facture parfois une autre), donc on ne peut pas simplement l'ajouter à KUHN SAS. Elle couvre les filiales suivies ici (7 françaises + Pologne, Hongrie, Chine ; hors Russie, activité gelée) et seulement celles dont les comptes sont connus pour l'année choisie. Détail dans l'analyse.</div>
      </div>
    </div>
  </section>

  <!-- S3 DIRECTION -->
  <section class="scene" id="s3" data-step="3" style="background:linear-gradient(180deg,#10171f,#161019)">
    <div class="inner split rev">
      <div class="stagebox">
        <div class="tip rv d2">Reprendre une provision passée <b>ajoute au résultat</b> de l'année, mais aucun euro n'entre réellement en trésorerie.</div>
        <div class="stage" id="stageDir" aria-hidden="true">
        <svg viewBox="180 110 420 350" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="392" width="760" height="83" fill="#120b15"/>
          <!-- HQ building -->
          <g class="player" data-depth="0.05">
            <rect x="220" y="120" width="320" height="272" fill="#211a2b" stroke="#473a55" stroke-width="2"/>
            <rect x="220" y="120" width="320" height="34" fill="#2c2238"/>
            <text x="380" y="144" text-anchor="middle" fill="#E8B23A" font-family="Bahnschrift" font-size="16" letter-spacing="1.5">DIRECTION · EXERCICE COMPTABLE</text>
            <!-- windows -->
            <g fill="#3a2f48"><rect x="245" y="175" width="40" height="30"/><rect x="305" y="175" width="40" height="30"/><rect x="365" y="175" width="40" height="30"/><rect x="425" y="175" width="40" height="30"/><rect x="485" y="175" width="30" height="30"/></g>
          </g>
          <!-- balance scale: dotations vs reprises -->
          <g transform="translate(380,230)">
            <rect x="-3" y="0" width="6" height="74" fill="#6b5878"/>
            <g class="scalebeam">
              <rect x="-92" y="-4" width="184" height="6" rx="3" fill="#8a76a0"/>
              <g transform="translate(-96,0)"><line x1="0" y1="0" x2="-18" y2="32" stroke="#8a76a0" stroke-width="2"/><line x1="0" y1="0" x2="18" y2="32" stroke="#8a76a0" stroke-width="2"/><path d="M-40 32 h80 l-9 17 h-62 Z" fill="#7BA23C"/><text x="0" y="46" text-anchor="middle" fill="#0e141a" font-family="Segoe UI,sans-serif" font-weight="700" font-size="11.5" letter-spacing=".3">REPRISES</text></g>
              <g transform="translate(96,0)"><line x1="0" y1="0" x2="-18" y2="32" stroke="#8a76a0" stroke-width="2"/><line x1="0" y1="0" x2="18" y2="32" stroke="#8a76a0" stroke-width="2"/><path d="M-40 32 h80 l-9 17 h-62 Z" fill="#E76A4B"/><text x="0" y="46" text-anchor="middle" fill="#0e141a" font-family="Segoe UI,sans-serif" font-weight="700" font-size="11.5" letter-spacing=".3">DOTATIONS</text></g>
            </g>
          </g>
          <!-- réservoir de provisions (aligné et à l'échelle du « Bilan », de l'autre côté de la balance) -->
          <g transform="translate(250,308)">
            <path d="M2 6 v40 a8 8 0 0 0 8 8 h40 a8 8 0 0 0 8 -8 v-40" fill="rgba(126,107,168,.16)" stroke="#7E6BA8" stroke-width="2.5"/>
            <ellipse cx="30" cy="46" rx="19" ry="5" fill="#E8B23A"/>
            <ellipse cx="30" cy="40" rx="19" ry="5" fill="#edc257"/>
            <ellipse cx="30" cy="34" rx="19" ry="5" fill="#ffd877"/>
            <text x="30" y="36" text-anchor="middle" font-size="6" font-family="Bahnschrift,sans-serif" font-weight="700" fill="#7a5a12">€</text>
            <text x="30" y="78" text-anchor="middle" fill="#b3a4c2" font-family="Segoe UI" font-size="13">Réserve</text>
          </g>
          <!-- ledger -->
          <g transform="translate(450,308)">
            <rect x="0" y="0" width="60" height="56" rx="4" fill="#fff"/>
            <rect x="0" y="0" width="60" height="13" fill="#E10E2B"/>
            <line x1="8" y1="24" x2="52" y2="24" stroke="#cbb" stroke-width="2"/><line x1="8" y1="33" x2="52" y2="33" stroke="#cbb" stroke-width="2"/><line x1="8" y1="42" x2="52" y2="42" stroke="#cbb" stroke-width="2"/>
            <text x="30" y="78" text-anchor="middle" fill="#b3a4c2" font-family="Segoe UI" font-size="13">Bilan</text>
          </g>
          <!-- coins arriving from below (from activity) -->
          <g class="coinrise"><circle cx="380" cy="430" r="9" fill="#E8B23A"/><circle cx="350" cy="450" r="7" fill="#E8B23A" opacity=".7"/><circle cx="410" cy="455" r="6" fill="#E8B23A" opacity=".5"/></g>
        </svg>
        </div>
      </div>
      <div class="copy">
        <div class="scene-step rv">ÉTAPE 03 · La salle des comptes</div>
        <h2 class="rv d1" style="font-size:clamp(28px,5vw,48px)">Les leviers qui <span style="color:var(--gold)">lissent</span> le résultat</h2>
        <p class="lead rv d2">L'argent de l'activité remonte à la direction. C'est ici qu'on « habille » le résultat avec des écritures comptables parfaitement légales : <button class="gloss" data-g="provision" aria-expanded="false">provisions</button> (mises de côté, puis reprises) et <b>amortissements</b>. Résultat : le bénéfice d'une année peut être <b>lissé</b>, alourdi quand on constitue des provisions (2021–2022), allégé quand on les relâche (2024).</p>
        <div class="levers rv d3">
          <div class="lever"><div class="ic"><svg viewBox="0 0 24 24" width="22" height="22" style="vertical-align:middle" aria-hidden="true"><path d="M6 12h12v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill="rgba(126,107,168,.18)" stroke="#7E6BA8" stroke-width="1.5"/><line x1="5" y1="12" x2="19" y2="12" stroke="#7E6BA8" stroke-width="1.5" stroke-linecap="round"/><path d="M12 9V2M9 5l3-3 3 3" fill="none" stroke="#7BA23C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="t"><button class="gloss" data-g="reprise" aria-expanded="false">Reprises</button> de provisions<small>remontent au résultat sans entrée d'argent réelle</small></div><div class="val green" data-stat="reprises">— M€</div></div>
          <div class="lever"><div class="ic"><svg viewBox="0 0 24 24" width="22" height="22" style="vertical-align:middle" aria-hidden="true"><path d="M6 12h12v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill="rgba(126,107,168,.18)" stroke="#7E6BA8" stroke-width="1.5"/><line x1="5" y1="12" x2="19" y2="12" stroke="#7E6BA8" stroke-width="1.5" stroke-linecap="round"/><path d="M12 2v7M9 5.5l3 3 3-3" fill="none" stroke="#E76A4B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="t"><button class="gloss" data-g="dotation" aria-expanded="false">Dotations</button> aux provisions<small>charges « au cas où » qui réduisent le résultat</small></div><div class="val red" data-stat="dot">— M€</div></div>
          <div class="lever"><div class="ic">🔁</div><div class="t">Transferts de charges<small>frais refacturés ou reclassés : ce ne sont <b>pas</b> des provisions</small></div><div class="val steel" data-stat="transf">— M€</div></div>
          <div class="lever"><div class="ic">⚙️</div><div class="t"><button class="gloss" data-g="amortissement" aria-expanded="false">Amortissements</button><small>usure des outils de l'atelier, étalée dans le temps</small></div><div class="val steel" data-stat="amort">— M€</div></div>
          <div class="lever"><div class="ic"><svg viewBox="0 0 24 24" width="22" height="22" style="vertical-align:middle" aria-hidden="true"><ellipse cx="12" cy="17.5" rx="7" ry="2.4" fill="#E8B23A" stroke="#a9781a" stroke-width="1"/><ellipse cx="12" cy="13.7" rx="7" ry="2.4" fill="#edc257" stroke="#a9781a" stroke-width="1"/><ellipse cx="12" cy="9.9" rx="7" ry="2.4" fill="#ffd877" stroke="#a9781a" stroke-width="1"/><text x="12" y="11.5" text-anchor="middle" font-size="5.4" font-family="Bahnschrift,sans-serif" font-weight="700" fill="#7a5a12">€</text></svg></div><div class="t"><button class="gloss" data-g="tresorerie" aria-expanded="false">Trésorerie</button> disponible<small>dispo. + placements en fin d'exercice</small></div><div class="val gold" data-stat="treso">— M€</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- S3b DIVERGENCE -->
  <section class="scene" id="s3b" data-step="3" style="background:#161019;min-height:92vh">
    <div class="inner" style="text-align:center">
      <div class="scene-step rv">ÉTAPE 03 · Deux lectures du résultat</div>
      <h2 class="rv d1" style="font-size:clamp(26px,4.6vw,44px)">Marge d'<span style="color:var(--bad)">EBITDA</span><br>ou résultat net <span style="color:var(--green)">?</span></h2>
      <p class="lead rv d2" style="margin:8px auto 0">Pour l'exercice <b data-stat="year">—</b>, comparez ce que l'<b>activité</b> dégage (<button class="gloss" data-g="ebitda" aria-expanded="false">EBITDA</button>) et le <b>résultat net</b> finalement affiché. Les deux ne disent pas la même chose, et leur écart change selon les années.</p>
      <div class="diverge rv d3" id="diverge">
        <div class="dbar ebitda"><div class="col"><div class="pv" data-stat="ebitdaPctTxt">—</div><div class="bar" data-bar="ebitda"></div></div><div class="nm">EBITDA<br>(% du CA)</div></div>
        <div class="dbar net"><div class="col"><div class="pv" data-stat="netPctTxt">—</div><div class="bar" data-bar="net"></div></div><div class="nm">Résultat net<br>(% du CA)</div></div>
      </div>
      <p class="lead rv d4" data-stat="divergeNote" style="max-width:62ch;margin:18px auto 0;font-size:16px">—</p>
      <p class="caveat rv d4" style="max-width:60ch;margin:14px auto 0;text-align:center;font-size:11px;font-style:normal;opacity:.6;letter-spacing:.01em">EBITDA calculé à méthode constante sur les comptes déposés de KUHN SAS : résultat d'exploitation + amortissements + dotations nettes des reprises de provisions.</p>
    </div>
  </section>

  <!-- S4 BÉNÉFICE -->
  <section class="scene" id="s4" data-step="4" style="background:linear-gradient(180deg,#161019,#0e141a)">
    <div class="inner">
      <div class="copy" style="max-width:62ch;margin:0 auto;text-align:center">
        <div class="scene-step rv">ÉTAPE 04 · La sortie</div>
        <h2 class="rv d1" style="font-size:clamp(28px,5vw,50px)">Où part le bénéfice ?</h2>
        <p class="lead rv d2" style="margin:0 auto">Le résultat net de l'exercice <b data-stat="year">—</b> (<b data-stat="rnet">— M€</b>) se répartit. L'essentiel <b>quitte l'entreprise</b> : il remonte en <button class="gloss" data-g="dividende" aria-expanded="false">dividende</button> vers KUHN Group, puis vers Bucher en Suisse. Le reste renforce les réserves et la trésorerie.</p>
      </div>
      <div class="split-flow rv d3" id="benefitFlow"></div>
      <div class="stage rv d3" id="stageBucher" style="max-width:380px;aspect-ratio:3/4;margin:14px auto 0" aria-hidden="true">
        <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid meet">
          <!-- SUISSE (haut) : montagnes + coffre Bucher + drapeau -->
          <path d="M0 175 L70 70 L120 130 L195 40 L265 130 L325 80 L400 165 L400 0 L0 0 Z" fill="#1c2a36"/>
          <path d="M195 40 L177 66 L213 66 Z" fill="#fff" opacity=".9"/>
          <path d="M70 70 L56 92 L86 92 Z" fill="#fff" opacity=".8"/>
          <g transform="translate(140,56)">
            <rect x="0" y="0" width="120" height="88" rx="10" fill="rgba(16,23,31,.42)" stroke="#E8B23A" stroke-width="2.5"/>
            <text x="60" y="30" text-anchor="middle" fill="#E8B23A" font-family="Bahnschrift,sans-serif" font-size="18" letter-spacing="1">BUCHER</text>
            <text x="60" y="47" text-anchor="middle" fill="#cdd6df" font-family="Segoe UI" font-size="10">Industries</text>
            <rect x="44" y="56" width="24" height="24" rx="3" fill="#E10E2B"/>
            <rect x="54" y="60" width="4" height="16" fill="#fff"/><rect x="48" y="66" width="16" height="4" fill="#fff"/>
          </g>
          <text x="200" y="166" text-anchor="middle" fill="#E8B23A" font-family="Segoe UI" font-weight="700" font-size="12.5" letter-spacing=".5">L'ACTIONNAIRE · SUISSE</text>
          <!-- flux du dividende : bande douce sans contour ; les pièces montent en boucle, sous le texte -->
          <defs><linearGradient id="flux" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#E8B23A" stop-opacity=".20"/><stop offset="1" stop-color="#E8B23A" stop-opacity=".02"/>
          </linearGradient></defs>
          <rect x="176" y="150" width="48" height="224" rx="24" fill="url(#flux)"/>
          <g class="divflow">
            <circle cx="200" cy="366" r="10" fill="#E8B23A" style="animation-delay:0s"/>
            <circle cx="187" cy="366" r="6.5" fill="#f0c558" style="animation-delay:1s"/>
            <circle cx="213" cy="366" r="6.5" fill="#f0c558" style="animation-delay:2s"/>
            <circle cx="200" cy="366" r="8" fill="#E8B23A" style="animation-delay:2.6s"/>
            <circle cx="193" cy="366" r="5" fill="#ffe39c" style="animation-delay:3.7s"/>
          </g>
          <text x="200" y="258" text-anchor="middle" fill="#E8B23A" font-family="Bahnschrift,sans-serif" font-size="16" stroke="#11171E" stroke-width="3.2" paint-order="stroke">DIVIDENDE</text>
          <text x="200" y="276" text-anchor="middle" fill="#e8e0cf" font-family="Segoe UI" font-size="10.5" stroke="#11171E" stroke-width="2.6" paint-order="stroke">≈ 93–99 % du bénéfice</text>
          <!-- FRANCE (bas) : usine KUHN -->
          <g transform="translate(118,372)">
            <rect x="0" y="22" width="164" height="86" fill="#1b2632" stroke="#33485a" stroke-width="2"/>
            <path d="M0 22 L27 4 L27 22 L54 4 L54 22 L81 4 L81 22 L108 4 L108 22 L135 4 L135 22 L162 4 L162 22 Z" fill="#E10E2B" opacity=".85"/>
            <text x="82" y="64" text-anchor="middle" fill="#F2ECDD" font-family="Bahnschrift,sans-serif" font-size="17">KUHN</text>
            <text x="82" y="84" text-anchor="middle" fill="#8b97a3" font-family="Segoe UI" font-size="12">le bénéfice de l'exercice</text>
          </g>
        </svg>
      </div>
      <p class="caveat rv d4" style="text-align:center;max-width:60ch;margin:6px auto 0">Dividende versé l'année suivante, reconstitué à l'euro près via la variation des réserves (<button class="gloss" data-g="fonds-propres" aria-expanded="false">capitaux propres</button>). Pour l'exercice 2024, le dividende versé en 2025 n'est pas encore connu : il est estimé au taux moyen des quatre années précédentes. Taux de distribution ≈ <b data-stat="payout" style="color:var(--gold)">—</b> du résultat.</p>
    </div>
  </section>

  <!-- S5 CYCLE -->
  <section class="scene" id="s5" data-step="5" style="background:linear-gradient(180deg,#0e141a,#0b0f14)">
    <div class="inner" style="text-align:center">
      <div class="scene-step rv">ÉTAPE 05 · La grande image</div>
      <h2 class="rv d1" style="font-size:clamp(28px,5.4vw,56px)">Une fin de cycle,<br>pas une crise</h2>
      <p class="lead rv d2" style="margin:14px auto 0">Le marché agricole a connu un <b>super-cycle</b> (2021–2023), puis un retour à la normale. KUHN suit la vague, comme tout le secteur. Pendant ce temps, le <b>dividende n'a jamais cessé d'être élevé</b> : du point de vue de l'actionnaire, tout va bien.</p>
      <div class="stage rv d3" style="max-width:760px;aspect-ratio:760/288;margin:40px auto 0" aria-hidden="true">
        <svg viewBox="0 0 760 288" id="cycleSvg" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="wave-note rv d4">
        <div><b>L'activité</b> a décroché : les commandes reçues par KUHN Group ont chuté de 42 % entre 2021 et 2024 (chiffres Bucher) et l'EBITDA de KUHN SAS a reculé d'un quart entre 2022 et 2024 (85 → 63 M€).</div>
        <div><b>Le résultat net</b> a mieux résisté (−15 % en 2024), aidé par un premier relâchement des provisions (+4,4 M€) et un impôt plus faible.</div>
        <div><b>Le dividende</b> est resté à ~93–99 % du bénéfice, en hausse comme en baisse.</div>
      </div>
      <div class="ctaband rv d4">
        <button class="bigbtn" id="goAnalysis">Voir l'analyse détaillée <span class="ar">→</span></button>
      </div>
    </div>
  </section>
</main>

<!-- ============ ANALYSIS ============ -->
<div id="analysis">
  <div class="wrap">
    <section>
      <h2>Lire les résultats de KUHN dans leur contexte</h2>
      <p class="intro">L'indicateur le plus souvent mis en avant, la <strong>marge d'EBITDA</strong>, est souvent cité comme passé de 9 % à 2,6 % du chiffre d'affaires entre 2021 et 2024 (chiffres affichés par Pappers). Ce raccourci compare deux méthodes de calcul différentes. À méthode constante, la marge d'EBITDA de KUHN SAS recule de <strong>9,2 % à 7,9 %</strong>, et l'EBITDA d'un quart entre 2022 et 2024 (85 → 63 M€). Le recul est réel, mais il ne s'agit pas d'un effondrement : un <strong>super-cycle agricole</strong> exceptionnel s'est achevé (comme pour l'ensemble du secteur), tandis que le résultat net et les dividendes sont restés élevés. Ce dossier reconstitue les flux de valeur de bout en bout, à partir des comptes déposés.</p>
      <div class="callout pinned"><span class="pin" aria-hidden="true">📌</span> <strong>La phrase à retenir.</strong> KUHN reste financièrement très saine (trésorerie abondante, quasi pas de dette bancaire) et sa marge <em>opérationnelle</em> tient (~7 %). Sa marge <em>d'EBITDA</em> a reculé (9 % → 7,9 %), revenant au niveau d'avant le boom (7 % en 2018–2019). En 2024, le résultat a commencé à puiser dans le coussin de <b>provisions</b> constitué pendant les années fastes (+4,4&nbsp;M€ nets, un effet comptable, pas une entrée d'argent). Et le dividende n'a jamais faibli : 93 à 99 % du bénéfice chaque année.</div>
      <div class="callout"><strong>Pourquoi « 9 % → 2,6 % » est trompeur.</strong> Les comptes regroupent sur une même ligne deux choses très différentes : les <strong>reprises de provisions</strong> (35,2 M€ en 2024) et les <strong>transferts de charges</strong> (42,3 M€ en 2024), une écriture qui neutralise des frais refacturés ou reclassés. Les marges affichées par Pappers ne se retrouvent qu'en changeant de méthode en cours de route : en 2021–2022, les transferts de charges restent dans l'EBITDA ; en 2023–2024, ils en sont retranchés avec les reprises, ce qui retire plus de 40 M€ d'EBITDA d'un coup. Recalculée chaque année de la même façon, la marge d'EBITDA est de 9,2 % (2021), 9,0 % (2022), 8,6 % (2023) et 7,9 % (2024).</div>
    </section>
    <section>
      <div class="sec-eyebrow"><span class="n">01</span> Qui est KUHN, et de quoi parle-t-on</div>
      <p><strong>KUHN SAS</strong> (Saverne, SIREN 675 580 542) est le cœur industriel et la « banque interne » d'un groupe de machinisme agricole. Elle est détenue par <strong>KUHN Group SAS</strong> (Strasbourg), elle-même filiale du groupe suisse coté <strong>Bucher Industries</strong>. Autour de KUHN SAS gravitent des filiales spécialisées (Huard, Audureau, MGM, Parts, Artec, Blanchard, Contifonte) et des filiales étrangères.</p>
      <div class="orgchart">
        <div class="orgnode bucher"><b>BUCHER INDUSTRIES</b><small>Suisse · coté en bourse</small></div>
        <div class="orgconn">▲ dividendes</div>
    <div class="orgnode group"><b>KUHN&nbsp;GROUP&nbsp;SAS</b><small>Strasbourg · tête d'intégration fiscale</small></div>
        <div class="orgconn">│</div>
    <div class="orgnode sas"><b>KUHN&nbsp;SAS</b><small>Saverne · centre industriel + banque interne</small></div>
        <div class="orgconn">prêts ↓ &nbsp; dividendes ↑</div>
        <div class="fil-row">
          <div class="orgnode">Huard</div><div class="orgnode">Audureau</div><div class="orgnode">MGM</div>
          <div class="orgnode">Parts</div><div class="orgnode">Artec</div><div class="orgnode">Blanchard</div>
          <div class="orgnode">Contifonte</div><div class="orgnode">+ étrangères (PL · HU · CN)</div>
        </div>
      </div>
      <h3>Le piège des trois périmètres</h3>
      <p>Le « chiffre d'affaires de KUHN » désigne trois choses différentes. La plupart des malentendus viennent de là : chaque chiffre de ce dossier est donc étiqueté avec son périmètre.</p>
      <div class="three-perim">
    <div class="pc"><h4><span class="perim-chunk perim-chunk--head">KUHN&nbsp;Group</span></h4><div class="big" id="periGroup">—</div><p>Groupe mondial consolidé, toutes filiales (exercice <span data-stat="year">2024</span>). Publié par Bucher Industries en francs suisses, converti en euros.</p></div>
    <div class="pc"><h4><span class="perim-chunk perim-chunk--head">KUHN&nbsp;SAS</span><span class="perim-chunk">· comptes sociaux</span></h4><div class="big" id="periSas">—</div><p>L'entité de Saverne, ventes intra-groupe incluses (comptes déposés, exercice <span data-stat="year">2024</span>). C'est la source principale de ce dossier.</p></div>
        <div class="pc"><h4><span class="perim-chunk perim-chunk--head">Filiales</span><span class="perim-chunk">· somme brute</span></h4><div class="big" id="periFil">—</div><p>Addition des CA des filiales suivies (France, Pologne, Hongrie, Chine), ventes internes au groupe comprises (exercice <span data-stat="year">2024</span>).</p></div>
      </div>
      <p class="src">Méthode dividende : la liasse fiscale ne le publie pas directement ; on le retrouve par un raisonnement simple. Sur le bénéfice d'une année, une partie <b>reste dans l'entreprise</b> et vient grossir les réserves ; le <b>reste en sort</b>, versé à l'actionnaire l'année suivante. Le dividende versé une année, c'est donc le <b>bénéfice de l'année précédente, moins la hausse des réserves</b>. Le calcul tombe juste à l'euro près : chaque montant correspond à un dividende rond par action (de 30 à 52 € pour les 1 218 000 actions de KUHN SAS), et il concorde avec les dividendes déclarés reçus dans les comptes de KUHN Group SAS.</p>
    </section>
    <section>
      <div class="sec-eyebrow"><span class="n">02</span> Tableau de bord · KUHN SAS, 2014–2024</div>
      <p>Les séries ci-dessous couvrent 2014–2024 (comptes sociaux déposés de KUHN SAS).</p>
      <div class="chartgrid">
        <div class="card"><h4>Chiffre d'affaires & résultat net</h4><p class="cap">Le CA suit le cycle (pic 2023) ; le résultat net reste remarquablement stable.</p><svg class="svgchart" id="chCaRn" viewBox="0 0 520 300"></svg><div class="legend"><span title="Total des ventes de l'exercice (avant toute charge)."><i style="background:var(--l-gold)"></i>CA net</span><span title="Bénéfice final de l'année, après toutes charges et impôts."><i style="background:var(--l-kuhn)"></i>Résultat net</span></div><p class="srcnote">En millions d'euros. <b>CA net</b> = ce que l'entreprise a facturé ; <b>résultat net</b> = ce qu'il en reste une fois tout payé. <b>Source :</b> comptes sociaux KUHN SAS déposés (Pappers).</p></div>
        <div class="card"><h4>Trois mesures de rentabilité</h4><p class="cap">La marge opérationnelle tient ~7 % ; la marge d'EBITDA recule depuis 2021, pour revenir à son niveau d'avant le boom.</p><svg class="svgchart" id="chMargins" viewBox="0 0 520 300"></svg><div class="legend"><span title="Résultat d'exploitation ÷ CA : la rentabilité du métier, hors finance et impôts."><i style="background:var(--l-kuhn)"></i>Marge opérat.</span><span title="EBITDA ÷ CA : l'argent brut dégagé par l'activité, avant amortissements et provisions. C'est l'indicateur le plus proche de l'argent réellement gagné."><i style="background:var(--bad)"></i>EBITDA</span><span title="Excédent brut d'exploitation au sens comptable strict : il laisse de côté les transferts de charges et les autres produits et charges de gestion. C'est un plancher."><i style="background:var(--steel)"></i>EBE strict</span></div><p class="srcnote">En % du chiffre d'affaires, même méthode chaque année. <b>EBITDA</b> = résultat d'exploitation + amortissements + dotations nettes des reprises de provisions. <b>EBE strict</b> = valeur ajoutée − impôts et taxes − charges de personnel. <b>Source :</b> calculs sur les comptes sociaux déposés de KUHN SAS.</p></div>
        <div class="card"><h4>Provisions : dotations vs reprises</h4><p class="cap">De 2018 à 2023, on a mis de côté au moins autant qu'on a repris : le coussin se constitue (surtout en 2021–2022). En 2024, il commence à être relâché.</p><svg class="svgchart" id="chProv" viewBox="0 0 520 300"></svg><div class="legend"><span title="Provisions des années passées que l'on relâche : ça remonte au résultat sans aucune entrée d'argent réelle."><i style="background:var(--l-green)"></i>Reprises de provisions</span><span title="Nouvelles provisions de l'année : charges « au cas où » qui réduisent le résultat."><i style="background:var(--bad)"></i>Dotations</span></div><p class="srcnote">En millions d'euros, provisions d'exploitation. Une <b>reprise</b> relâche une provision passée (gain comptable, sans entrée d'argent réelle) ; une <b>dotation</b> en constitue une nouvelle (charge). Les transferts de charges, inscrits sur la même ligne que les reprises dans le compte de résultat, en sont retirés ici. 2014 : détail non disponible. <b>Source :</b> tableau des provisions des comptes sociaux de KUHN SAS.</p></div>
        <div class="card"><h4>Stock de provisions au bilan (le « réservoir »)</h4><p class="cap">Le matelas de provisions pour risques &amp; charges accumulé au passif. C'est lui que les reprises viennent puiser : il monte les bonnes années, et reflue en 2024.</p><svg class="svgchart" id="chProvStock" viewBox="0 0 520 300"></svg><div class="legend"><span title="Provisions pour risques et charges inscrites au passif du bilan, à la clôture de l'exercice."><i style="background:#7E6BA8"></i>Provisions au bilan (risques &amp; charges)</span></div><p class="srcnote">En millions d'euros, à la clôture. La réserve passe de ~19 M€ (2016) à ~40 M€ (2023), puis reflue en 2024 (~36 M€), une première depuis 2019. <b>Source :</b> bilans KUHN SAS déposés.</p></div>
        <div class="card"><h4>Trésorerie & capitaux propres</h4><p class="cap">Trésorerie élevée, capitaux propres stables : entreprise solide et peu endettée.</p><svg class="svgchart" id="chTreso" viewBox="0 0 520 300"></svg><div class="legend"><span title="Disponibilités en banque + valeurs mobilières de placement : l'argent immédiatement mobilisable."><i style="background:var(--l-gold)"></i>Trésorerie</span><span title="Capital + réserves + résultat : ce que les actionnaires possèdent réellement dans l'entreprise."><i style="background:#4a6b8a"></i>Capitaux propres</span></div><p class="srcnote">En millions d'euros. <b>Trésorerie</b> = liquidités + placements ; <b>capitaux propres</b> = la « richesse nette » de la société. <b>Source :</b> bilans KUHN SAS déposés.</p></div>
        <div class="card full"><h4>Dividendes & taux de distribution</h4><p class="cap">KUHN distribue quasiment tout son résultat chaque année (93 à 99 %), en hausse comme en baisse.</p><svg class="svgchart" id="chDiv" viewBox="0 0 1040 300"></svg><div class="legend"><span title="Montant remonté à l'actionnaire (KUHN Group / Bucher) au cours de l'année."><i style="background:var(--l-gold)"></i>Dividende versé</span><span title="Bénéfice de l'année précédente, sur lequel le dividende est prélevé."><i style="background:var(--l-kuhn)"></i>Résultat net N-1</span><span title="Dividende ÷ résultat de l'année précédente : la part du bénéfice qui sort de l'entreprise."><i style="background:var(--l-ink)"></i>Taux de distribution</span></div><p class="srcnote">Barres en millions d'euros, courbe en %. Le dividende d'une année porte sur le <b>résultat de l'année précédente</b>. <b>Source :</b> reconstitué à l'euro près via la variation des réserves (comptes déposés de KUHN SAS), recoupé avec les comptes de KUHN Group SAS.</p></div>
      </div>
    </section>
    <section>
      <div class="sec-eyebrow"><span class="n">03</span> Manipulez les chiffres vous-même</div>
      <div class="tool">
        <h4>Décomposez un euro de recettes</h4>
        <p class="cap">Où va chaque euro de recettes d'exploitation de l'exercice <b id="decompYear">2024</b> ? Recettes = production vendue ou stockée + transferts de charges + autres produits, hors reprises de provisions (calcul sur les comptes sociaux de KUHN SAS).</p>
        <div class="euro-decomp" id="euroDecomp"></div>
        <div class="euro-legend" id="euroLegend"></div>
      </div>
      <h3>D'où vient cet argent ? Le mécanisme des provisions</h3>
  <p>Une <strong>provision</strong>, c'est un montant mis de côté lors d'un exercice <em>passé</em> (et déduit du résultat de l'époque) pour couvrir un risque : un litige, des stocks qui pourraient perdre de la valeur, une garantie client. Quand le risque ne se matérialise pas, on <strong>reprend</strong> la provision : elle remonte dans le résultat de l'année en cours. Mais <strong>aucun euro n'entre en trésorerie</strong> : l'argent avait déjà été « gelé » comptablement les années précédentes. C'est, en quelque sorte, du bénéfice passé recyclé dans le présent.</p>
      <div class="callout gold">Attention à une ligne trompeuse du compte de résultat : « reprises sur provisions <em>et</em> transferts de charges » (77,5 M€ en 2024). Elle mélange deux choses. <strong>(1)</strong> Les <strong>reprises de provisions</strong> (35,2 M€) : elles soutiennent le résultat sans entrée d'argent, mais il faut les comparer aux dotations de l'année (30,8 M€). L'effet net n'est que de +4,4 M€, et de 2018 à 2023 il était nul ou négatif : KUHN mettait de côté davantage qu'elle ne reprenait. <strong>(2)</strong> Les <strong>transferts de charges</strong> (42,3 M€) : une écriture qui neutralise des frais refacturés à d'autres sociétés, remboursés ou reclassés. Ce ne sont pas des provisions : selon les cas, ils correspondent à de vraies recettes (refacturations, remboursements) ou à des frais simplement déplacés ailleurs dans les comptes. Leur détail figure dans l'annexe des comptes. La réforme comptable applicable depuis 2025 (règlement ANC n° 2022-06) supprime d'ailleurs cette catégorie.</div>
      <div class="tool">
        <h4>L'effet « provisions » sur le résultat de l'exercice <b id="provYear">2024</b></h4>
        <p class="cap">Si l'on neutralise l'effet net des provisions d'exploitation (reprises − dotations), voici ce que deviendrait le résultat : l'écart mesure le lissage comptable de l'année.</p>
        <div class="prov-out">
          <div class="po"><div class="lab">Résultat net publié</div><div class="v" style="color:var(--l-ink)" id="provPublished">— M€</div></div>
          <div class="po"><div class="lab">→ hors effet des provisions</div><div class="v" id="provAdjusted" style="color:var(--l-kuhn)">— M€</div></div>
          <div class="po"><div class="lab">= effet des provisions</div><div class="v" id="provEffect" style="color:var(--l-gold)">— M€</div></div>
        </div>
        <p class="src">Effet des provisions = reprises de provisions d'exploitation − (dotations sur actif circulant + dotations pour risques &amp; charges), d'après le tableau des provisions des comptes. Positif : les provisions ont gonflé le résultat ; négatif : elles l'ont réduit. Calcul illustratif, avant impôt.</p>
      </div>
    </section>
<section id="sec-filiales">
      <div class="sec-eyebrow"><span class="n">04</span> Le groupe France, filiale par filiale</div>
      <p>Chaque filiale est détenue à ~100 % et financée par KUHN SAS, qui met en commun la trésorerie de tout le groupe (un dispositif de gestion centralisée appelé « cash pooling »). Deux filiales portent le groupe, <strong>Huard</strong> et <strong>Audureau</strong>, et remontent l'essentiel des dividendes.</p>
      <div class="filterbar">
        <div class="grp"><span class="glab">Filiale</span><div id="anaEnt"></div></div>
        <div class="grp"><span class="glab">Exercice</span><div id="anaTableYears"></div></div>
      </div>
      <div class="callout">Pourquoi certaines filiales ne remontent <strong>aucun</strong> dividende ? Ce n'est pas un choix, c'est une règle : on ne peut distribuer que s'il existe un <strong>bénéfice distribuable</strong> (un résultat positif <em>et</em> des réserves suffisantes). <strong>Blanchard</strong> n'en a jamais versé depuis son rachat en 2008, et <strong>Artec</strong> n'en verse plus depuis 2022 (dernier versement : 0,15 M€ en 2021) : résultats trop faibles ou négatifs, report à nouveau négatif à reconstituer d'abord. <strong>MGM</strong> n'en verse qu'un filet (résultat proche de zéro). <strong>Parts</strong>, redevenu nettement bénéficiaire, a recommencé à en remonter (0,5 → 1,0 M€). Et ces petites filiales <strong>consomment de la trésorerie</strong> (couverte par les prêts de KUHN SAS) au lieu d'en dégager : difficile, alors, de faire remonter de l'argent qu'elles n'ont pas.</div>
  <div class="tablewrap" id="filTableWrap"><table class="data" id="filTable"></table></div>
      <p class="src"><b>Lire la colonne dividende.</b> Le dividende d'une année est <b>versé sur le résultat de l'année précédente</b>. En 2021, sur des résultats 2020 frappés par le Covid, MGM et Blanchard (en perte) n'ont rien distribué, Huard a réduit son dividende (2,0 M€ contre 5,1 M€ l'année précédente), tandis que Parts (1,0 M€) et Artec (0,15 M€) ont versé. Les dividendes 2021 d'Audureau et de Contifonte ne sont pas établis (case vide = donnée non établie, ≠ zéro).</p>
      <p class="src">Sources : annexe « Filiales &amp; participations » de KUHN SAS (2016–2020, 2022–2024), comptes sociaux et procès-verbaux d'affectation déposés par les filiales, pages publiques Pappers (montants arrondis pour certains exercices). Les capitaux propres des filiales ne sont renseignés qu'à partir de 2021 : avant, ces cases restent vides. « Prêt reçu » = montant prêté par KUHN SAS et non remboursé au 31 décembre (encours, pas un flux de l'année) ; « Dividende → SAS » = dividende remonté à la mère dans l'année. Les filiales étrangères n'apparaissent qu'à travers l'annexe de KUHN SAS, d'où l'absence de l'exercice 2021.</p>
    </section>
    <section id="sec-flux">
      <div class="sec-eyebrow"><span class="n">05</span> Le circuit de la trésorerie : groupe ↔ SAS ↔ filiales</div>
      <p>Le sens dominant de l'argent est <strong>ascendant</strong> : de 2016 à 2024, KUHN SAS encaisse 8 à 15 M€/an de dividendes de ses filiales, mais en reverse 37 à 63 M€/an vers KUHN Group (et in fine Bucher). Les filiales empruntent à KUHN SAS plutôt qu'à une banque.</p>
      <div class="card full" style="background:#fff"><h4>Dividendes de l'année et prêts en cours (exercice <span id="sankeyYear">2024</span>)</h4><p class="cap">Chaque flèche est orientée dans le sens où circule l'argent ; sa largeur est proportionnelle au montant. Les dividendes sont les montants versés dans l'année ; les prêts sont l'encours au 31 décembre (ce qui reste dû), pas un flux annuel.</p><div class="chart-scroll"><svg class="svgchart" id="sankey" viewBox="0 0 1040 300"></svg></div></div>
    </section>
    <section id="sec-concurrents">
      <div class="sec-eyebrow"><span class="n">06</span> Tout le secteur a vécu le même cycle</div>
      <p>KUHN ne sous-performe pas : John Deere, AGCO et CNH ont connu le <strong>même sommet</strong> (2022–2023) puis le <strong>même atterrissage</strong>. En indexant le chiffre d'affaires de chacun à 100 sur son année record, les quatre trajectoires se retrouvent entre ~70 et ~75 en 2025.</p>
      <div class="chartgrid">
        <div class="card full"><h4>Chiffre d'affaires indexé (base 100 = année record de chaque groupe)</h4><p class="cap">Le retournement est synchronisé : un super-cycle partagé, pas une faiblesse propre à KUHN.</p><div class="chart-scroll"><svg class="svgchart" id="chCompo" viewBox="0 0 1040 340"></svg></div><div class="legend" id="compoLegend"></div></div>
      </div>
      <div class="tablewrap" style="margin-top:18px"><table class="data" id="compTable"></table></div>
      <p class="src">CA : communiqués annuels (exercices fiscaux). John Deere : ventes &amp; revenus monde (exercice clos fin octobre). CNH : agriculture + construction depuis la séparation d'Iveco (2022). Marges publiées par chaque groupe, avec des définitions proches mais pas identiques : John Deere = marge opérationnelle des activités équipement ; AGCO = marge opérationnelle ajustée ; CNH = marge d'EBIT ajusté des activités industrielles ; KUHN Group = marge opérationnelle (EBIT). KUHN Group : rapports annuels de Bucher Industries (1 319, 1 510, 1 422, 1 159 et 1 053 millions de francs suisses de 2021 à 2025), convertis en euros au cours moyen annuel de la BCE.</p>
      <div class="callout"><strong>Et depuis ?</strong> Bucher publie les chiffres de KUHN Group chaque semestre, et les commandes chaque trimestre. En 2025, le CA recule encore (1 053 M CHF, −9 %) et la marge tombe à 7,1 %, mais les <strong>commandes rebondissent de 16 %</strong> grâce à une bonne campagne de précommandes. Au 1<sup>er</sup> semestre 2026, le CA est stable (612 M CHF), la marge est de 8,8 % (contre 9,9 % un an plus tôt) et les commandes reculent de 21 % (329 M CHF). Les chiffres des neuf premiers mois 2026 sont attendus à l'automne.</div>
    </section>
    <section>
      <div class="sec-eyebrow"><span class="n">07</span> Conclusion &amp; points de vigilance</div>
      <p>L'entreprise est solide et le « creux » est cyclique. Reste à nommer, en toute transparence, les trois vrais points de vigilance, au-delà du seul EBITDA :</p>
      <div class="callout gold">1. <strong>La marge d'EBITDA a reculé, sans s'effondrer :</strong> l'EBITDA de KUHN SAS est passé de 85 M€ (2022) à 63 M€ (2024), soit une marge de 9,0 % à 7,9 %, revenue au niveau de 2018–2019. Le métier dégage moins de trésorerie qu'au sommet du cycle, et le résultat 2024 a commencé à puiser dans les provisions mises de côté.</div>
      <div class="callout gold">2. <strong>La masse salariale pèse davantage quand l'activité baisse :</strong> les charges de personnel de KUHN SAS passent de 9,6 % du CA en 2022 à 12,0 % en 2024, un niveau proche de 2016 (11,7 %). La part des salaires monte mécaniquement quand le CA recule, car les effectifs s'ajustent plus lentement que l'activité.</div>
      <div class="callout gold">3. <strong>La distribution quasi intégrale du résultat</strong> en dividendes (93 à 99 %) laisse peu de coussin pour absorber un retournement durable.</div>
      <h3>Fiabilité des chiffres</h3>
      <div class="tablewrap"><table class="data fiab">
        <thead><tr><th>Chiffre</th><th>Statut</th><th>Source ou méthode</th></tr></thead>
        <tbody>
          <tr><td>CA, résultats, bilan, provisions de KUHN SAS (2014–2024)</td><td><span class="st off">Officiel</span></td><td>Comptes sociaux déposés au greffe (liasse fiscale, tableau des provisions).</td></tr>
          <tr><td>EBITDA, EBE, valeur ajoutée, effet net des provisions</td><td><span class="st calc">Calculé</span></td><td>Recalculés à méthode constante sur ces comptes (définitions sous chaque graphique). Ils remplacent les marges affichées par Pappers, calculées différemment selon les années.</td></tr>
          <tr><td>Dividendes versés par KUHN SAS (2015–2024)</td><td><span class="st calc">Calculé</span></td><td>Variation des réserves, exacte à l'euro (dividende rond par action), recoupée avec les comptes de KUHN Group SAS.</td></tr>
          <tr><td>Dividende versé en 2025 sur le résultat 2024</td><td><span class="st est">Estimé</span></td><td>Taux de distribution moyen des quatre années précédentes. Le montant réel figurera dans les comptes 2025 de KUHN SAS.</td></tr>
          <tr><td>Filiales : CA, résultat, dividende, prêts</td><td><span class="st off">Officiel</span></td><td>Annexe « Filiales &amp; participations » de KUHN SAS, comptes et procès-verbaux des filiales. Certains montants Pappers sont arrondis ; quelques cases restent non établies (dividendes 2021 d'Audureau et de Contifonte).</td></tr>
          <tr><td>KUHN Group : CA, marge, commandes</td><td><span class="st off">Officiel</span></td><td>Rapports de Bucher Industries (en francs suisses) ; montants en euros convertis au cours moyen annuel BCE.</td></tr>
          <tr><td>John Deere, AGCO, CNH</td><td><span class="st off">Officiel</span></td><td>Communiqués annuels des groupes ; définitions de marge propres à chacun (voir section 06).</td></tr>
        </tbody>
      </table></div>
      <p class="src"><b>Pour compléter :</b> les comptes 2025 de KUHN SAS donneront le dividende réel versé en 2025, mais ils ne seront pas directement comparables aux années précédentes, car la réforme comptable de 2025 change la définition du chiffre d'affaires. L'annexe des comptes détaille la nature des transferts de charges. Bucher publie les commandes et ventes de KUHN Group chaque trimestre.</p>
      <p class="src"><b>Mise à jour du 20 octobre 2026.</b> Après vérification ligne à ligne sur les comptes déposés, plusieurs chiffres de la première version ont été corrigés : la marge d'EBITDA (la baisse « de 9 % à 2,6 % » mélangeait deux méthodes), le poids des reprises de provisions (une partie de la ligne concernée était en réalité des transferts de charges), le montant exact des dividendes et le taux de distribution (93 à 99 % au lieu de 90 à 96 %), quelques données de filiales (CA 2020 d'Artec, dividendes 2021, capitaux propres de Blanchard), et les marges et le CA 2025 des concurrents.</p>
      <button class="backtop" id="backToExp">↑ Revenir à l'expérience animée</button>
    </section>
  </div>
</div>

<!-- popover du glossaire interactif (mode Expérience) -->
<div id="glossPop" role="dialog" aria-label="Définition"></div>

<footer class="foot">
  Article pédagogique sur les flux de valeur du groupe KUHN, établi uniquement à partir de sources publiques : comptes sociaux déposés au greffe (consultables notamment sur Pappers.fr), rapports de Bucher Industries, communiqués des groupes cotés du secteur.
</footer>

</div><!-- /.kuhn-resultats -->
