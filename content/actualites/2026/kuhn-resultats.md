---
title: "Résultats 2014–2025"
weight: 1
bookToc: false
---

{{< hint info >}}
Les chiffres de KUHN racontent une belle histoire — à condition de savoir *quel* chiffre on regarde. Cette page rend l'analyse financière 2014–2025 **jouable** : faites glisser, basculez les vues, versez la tirelire. Tout est interactif, rien à installer.
{{< /hint >}}

<style>
/* ============================================================
   KUHN en clair — feuille de style autonome, scopée sous .kuhnv
   Palette agronomique : terre / lin / blé / champ / acier / rouille(=alerte)
   ============================================================ */
.kuhnv{
  --terre:#2a2014; --terre2:#3b2e1d; --terre3:#52412b;
  --lin:#f4efe4; --lin2:#ece4d4; --lin3:#e2d7c1;
  --ble:#dca227; --ble-d:#b9851a; --ble-soft:#f0d489;
  --champ:#3f7d4e; --champ-d:#2c5c39; --champ-soft:#bcd8c2;
  --acier:#7c8794; --acier-d:#5b656f; --acier-soft:#c8cfd6;
  --rouille:#c0432b; --rouille-d:#9a3520; --rouille-soft:#edb3a6;
  --ink:#241b10; --ink-soft:#6a5e4c; --line:rgba(42,32,20,.14);
  --sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Code","SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  color:var(--ink); font-family:var(--sans);
  line-height:1.6; -webkit-font-smoothing:antialiased;
  max-width:920px; margin:0 auto; padding:4px 2px 64px;
}
.kuhnv *{box-sizing:border-box}
.kuhnv h1,.kuhnv h2,.kuhnv h3,.kuhnv p,.kuhnv ul{margin:0}
/* ---------- Eyebrows / section headings ---------- */
.kuhnv .k-eyebrow{
  font-family:var(--mono); font-size:.72rem; letter-spacing:.22em;
  text-transform:uppercase; color:var(--champ-d); font-weight:600;
  display:flex; align-items:center; gap:.5em; margin-bottom:.5rem;
}
.kuhnv .k-eyebrow::before{content:""; width:18px; height:2px; background:var(--ble); display:inline-block}
.kuhnv .k-h2{
  font-size:clamp(1.45rem,1rem + 2.2vw,2rem); line-height:1.12;
  font-weight:800; letter-spacing:-.02em; color:var(--terre); margin-bottom:.4rem;
}
.kuhnv .k-lead{font-size:1.02rem; color:var(--ink-soft); max-width:60ch}
.kuhnv .k-sect{margin:54px 0 0}
.kuhnv .k-sect:first-of-type{margin-top:0}
/* ---------- Cards ---------- */
.kuhnv .k-card{
  background:var(--lin); border:1px solid var(--line); border-radius:16px;
  padding:22px; margin-top:18px; position:relative; overflow:hidden;
}
.kuhnv .k-card.k-soil{ background:var(--terre); color:var(--lin); border-color:transparent }
.kuhnv .k-card.k-soil .k-eyebrow{color:var(--ble-soft)}
.kuhnv .k-card.k-soil .k-eyebrow::before{background:var(--ble)}
/* ---------- Buttons / toggles ---------- */
.kuhnv .k-toggle{display:flex; flex-wrap:wrap; gap:8px}
.kuhnv .k-btn{
  font-family:var(--sans); font-size:.92rem; font-weight:600; cursor:pointer;
  border:1px solid var(--line); background:#fff; color:var(--ink);
  padding:10px 14px; border-radius:11px; transition:transform .12s, background .18s, color .18s, border-color .18s;
  display:inline-flex; align-items:center; gap:.5em; line-height:1.2;
}
.kuhnv .k-btn:hover{transform:translateY(-1px)}
.kuhnv .k-btn:focus-visible{outline:3px solid var(--ble); outline-offset:2px}
.kuhnv .k-btn[aria-pressed="true"]{background:var(--champ); border-color:var(--champ); color:#fff}
.kuhnv .k-soil .k-btn{background:rgba(255,255,255,.06); color:var(--lin); border-color:rgba(255,255,255,.18)}
.kuhnv .k-soil .k-btn[aria-pressed="true"]{background:var(--ble); border-color:var(--ble); color:var(--terre)}
.kuhnv .k-btn .k-ico{font-size:1.1em; line-height:1}
/* ---------- Big readouts ---------- */
.kuhnv .k-readout{font-family:var(--mono); font-variant-numeric:tabular-nums; font-weight:700; letter-spacing:-.02em}
.kuhnv .k-big{font-size:clamp(2.6rem,1rem + 7vw,4.4rem); line-height:.95}
.kuhnv .k-unit{font-size:.42em; font-weight:600; color:var(--ink-soft); margin-left:.25em}
.kuhnv .k-soil .k-unit{color:var(--ble-soft)}
/* ---------- Chips ---------- */
.kuhnv .k-chip{
  display:inline-flex; align-items:center; gap:.45em; font-family:var(--mono);
  font-size:.74rem; font-weight:600; letter-spacing:.04em; text-transform:uppercase;
  padding:5px 10px; border-radius:999px; border:1px solid var(--line);
}
.kuhnv .k-chip.green{background:var(--champ-soft); color:var(--champ-d); border-color:transparent}
.kuhnv .k-chip.gold{background:var(--ble-soft); color:var(--ble-d); border-color:transparent}
.kuhnv .k-chip.steel{background:var(--acier-soft); color:var(--acier-d); border-color:transparent}
.kuhnv .k-chip.rust{background:var(--rouille-soft); color:var(--rouille-d); border-color:transparent}
/* ---------- Grids ---------- */
.kuhnv .k-grid3{display:grid; grid-template-columns:repeat(3,1fr); gap:10px}
.kuhnv .k-grid2{display:grid; grid-template-columns:1fr 1fr; gap:16px}
.kuhnv .k-mini{background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px}
.kuhnv .k-mini .k-mlabel{font-family:var(--mono); font-size:.7rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft)}
.kuhnv .k-mini .k-mval{font-family:var(--mono); font-weight:700; font-size:1.5rem; font-variant-numeric:tabular-nums; margin-top:2px}
/* ---------- Sliders / range ---------- */
.kuhnv .k-slider{width:100%; -webkit-appearance:none; appearance:none; height:6px; border-radius:999px;
  background:var(--lin3); outline:none; margin:8px 0}
.kuhnv .k-soil .k-slider{background:var(--terre3)}
.kuhnv .k-slider::-webkit-slider-thumb{-webkit-appearance:none; appearance:none; width:22px; height:22px;
  border-radius:50%; background:var(--ble); border:3px solid #fff; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,.3)}
.kuhnv .k-slider::-moz-range-thumb{width:22px; height:22px; border-radius:50%; background:var(--ble);
  border:3px solid #fff; cursor:pointer}
.kuhnv .k-slider:focus-visible::-webkit-slider-thumb{outline:3px solid var(--champ); outline-offset:2px}
/* ---------- SVG chart bits ---------- */
.kuhnv svg{display:block; width:100%; height:auto; overflow:visible}
.kuhnv .k-bar{transition:height .7s cubic-bezier(.2,.7,.2,1), y .7s cubic-bezier(.2,.7,.2,1), fill .3s}
.kuhnv .k-axis{font-family:var(--mono); font-size:11px; fill:var(--ink-soft)}
.kuhnv .k-gridline{stroke:var(--line); stroke-width:1}
/* ---------- Narration / phase ---------- */
.kuhnv .k-narr{margin-top:14px; padding:14px 16px; border-left:3px solid var(--ble); background:rgba(220,162,39,.10); border-radius:0 10px 10px 0}
.kuhnv .k-narr strong{color:var(--terre)}
.kuhnv .k-soil .k-narr{background:rgba(220,162,39,.16)}
.kuhnv .k-soil .k-narr strong{color:var(--ble-soft)}
/* ---------- Plain-language callouts ---------- */
.kuhnv .k-plain{display:flex; gap:12px; align-items:flex-start; margin-top:14px;
  font-size:.96rem; color:var(--ink-soft)}
.kuhnv .k-plain .k-q{flex:0 0 auto; width:26px; height:26px; border-radius:8px; background:var(--champ);
  color:#fff; font-weight:800; display:grid; place-items:center; font-size:.9rem}
/* ---------- Legend ---------- */
.kuhnv .k-legend{display:flex; flex-wrap:wrap; gap:14px; margin-top:12px; font-size:.85rem; color:var(--ink-soft)}
.kuhnv .k-legend span{display:inline-flex; align-items:center; gap:6px}
.kuhnv .k-legend i{width:12px; height:12px; border-radius:3px; display:inline-block}
/* ---------- Hero ---------- */
.kuhnv .k-hero{padding:30px 24px 26px; border-radius:20px; background:
  radial-gradient(120% 130% at 100% 0%, #3b2e1d 0%, var(--terre) 55%); color:var(--lin); margin-top:6px;
  position:relative; overflow:hidden}
.kuhnv .k-hero::after{content:""; position:absolute; inset:auto -10% -40% -10%; height:60%;
  background:repeating-linear-gradient(90deg, rgba(220,162,39,.10) 0 2px, transparent 2px 26px);
  transform:skewY(-3deg); pointer-events:none}
.kuhnv .k-hero h1{font-size:clamp(1.8rem,1rem + 4.4vw,3rem); line-height:1.04; font-weight:800;
  letter-spacing:-.025em; margin-bottom:10px; position:relative; z-index:1}
.kuhnv .k-hero .k-sub{color:var(--ble-soft); max-width:62ch; position:relative; z-index:1}
.kuhnv .k-hero .k-kicker{font-family:var(--mono); font-size:.74rem; letter-spacing:.24em;
  text-transform:uppercase; color:var(--ble); margin-bottom:14px; position:relative; z-index:1}
/* ---------- Tooltip ---------- */
.kuhnv .k-tip{position:absolute; pointer-events:none; background:var(--terre); color:var(--lin);
  font-family:var(--mono); font-size:.74rem; padding:6px 9px; border-radius:8px; opacity:0;
  transform:translate(-50%,-120%); transition:opacity .12s; white-space:nowrap; z-index:5}
/* ---------- Footer ---------- */
.kuhnv .k-foot{margin-top:48px; padding-top:20px; border-top:1px solid var(--line);
  font-size:.82rem; color:var(--ink-soft)}
.kuhnv .k-foot code{font-family:var(--mono); font-size:.92em}
/* ---------- Responsive ---------- */
@media (max-width:680px){
  .kuhnv .k-grid2{grid-template-columns:1fr}
  .kuhnv .k-grid3{grid-template-columns:1fr}
  .kuhnv .k-card{padding:18px}
}
@media (prefers-reduced-motion:reduce){
  .kuhnv *{transition:none !important; animation:none !important}
}
</style>
<div class="kuhnv">
  <!-- ================= HERO ================= -->
  <header class="k-hero">
    <div class="k-kicker">KUHN · Résultats 2014 → 2025 · en clair</div>
    <h1>« C’est quoi, le chiffre d’affaires&nbsp;de KUHN&nbsp;? »</h1>
    <p class="k-sub">Question piège. Il existe <strong>trois réponses justes</strong> — et elles ne donnent
    pas le même montant. Avant tout le reste, jouez avec les trois « KUHN » ci-dessous : c’est de là que vient
    presque toute la confusion.</p>
  </header>
  <!-- ================= 1. LES 3 PÉRIMÈTRES ================= -->
  <section class="k-sect" id="perimetres">
    <div class="k-eyebrow">Le piège</div>
    <h2 class="k-h2">Trois « KUHN », trois chiffres</h2>
    <p class="k-lead">Touchez une carte : le même nom, mais on ne mesure pas la même chose.</p>
    <div class="k-card k-soil">
      <div class="k-toggle" id="periTabs" role="tablist" aria-label="Choisir un périmètre">
        <button class="k-btn" data-peri="group" aria-pressed="true"><span class="k-ico">🌍</span>Le groupe mondial</button>
        <button class="k-btn" data-peri="sas" aria-pressed="false"><span class="k-ico">🏢</span>L’entité de Saverne</button>
        <button class="k-btn" data-peri="op" aria-pressed="false"><span class="k-ico">🏭</span>Le travail réel du site</button>
      </div>
      <div style="margin-top:22px; display:flex; flex-wrap:wrap; align-items:baseline; gap:0 18px">
        <div class="k-readout k-big" id="periValue">1&nbsp;217<span class="k-unit">M€ · 2024</span></div>
        <div id="periValue25" class="k-chip gold" style="align-self:center"></div>
      </div>
      <div class="k-narr" style="margin-top:18px">
        <div id="periTitle" style="font-weight:800; margin-bottom:4px; color:var(--ble-soft)">KUHN Group — le groupe mondial consolidé</div>
        <div id="periDesc">Toutes les filiales du monde additionnées. C’est le « grand KUHN », celui dont parlent
        les communiqués du groupe.</div>
      </div>
      <div class="k-plain" style="color:var(--ble-soft)">
        <span class="k-q">?</span>
        <span id="periWhy">Plus le périmètre est large, plus le chiffre est gros — sans qu’une seule machine
        de plus n’ait été vendue.</span>
      </div>
    </div>
    <div class="k-plain">
      <span class="k-q">i</span>
      <span>Les trois sont exacts. Dans la suite de l’article, chaque chiffre est <strong>étiqueté avec son
      périmètre</strong> pour éviter de comparer des choux et des carottes.</span>
    </div>
  </section>
  <!-- ================= 2. LA GRANDE VAGUE (timeline) ================= -->
  <section class="k-sect" id="vague">
    <div class="k-eyebrow">La vague</div>
    <h2 class="k-h2">Onze ans en une glissière</h2>
    <p class="k-lead">Faites glisser le curseur (ou appuyez sur Lire) et regardez l’histoire se dérouler :
    un socle tranquille, une vague énorme, puis l’atterrissage. Données : KUHN SAS, comptes sociaux.</p>
    <div class="k-card">
      <div style="display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:16px">
        <div>
          <div class="k-readout k-big" id="vYear" style="font-size:clamp(2rem,1rem+5vw,3rem); color:var(--terre)">2014</div>
          <div id="vPhase" class="k-chip steel" style="margin-top:6px">Le socle</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--mono); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft)">Chiffre d’affaires</div>
          <div class="k-readout" id="vCA" style="font-size:2rem; color:var(--champ-d)">681,9<span class="k-unit">M€</span></div>
          <div style="font-family:var(--mono); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft); margin-top:6px">Résultat net</div>
          <div class="k-readout" id="vNet" style="font-size:1.3rem; color:var(--ble-d)">41,7<span class="k-unit">M€</span></div>
        </div>
      </div>
      <div id="vChart" style="margin-top:18px; position:relative"></div>
      <div style="display:flex; align-items:center; gap:14px; margin-top:14px">
        <button class="k-btn" id="vPlay"><span class="k-ico">▶︎</span>Lire l’histoire</button>
        <input class="k-slider" id="vSlider" type="range" min="0" max="10" value="0" step="1" aria-label="Année">
      </div>
      <div class="k-narr">
        <div id="vNarr"><strong>2014–2020.</strong> Une entreprise mature et prudente. Le chiffre d’affaires
        oscille tranquillement entre 600 et 740 M€, le bénéfice tourne autour de 40 M€. Rien de spectaculaire :
        un socle solide.</div>
      </div>
    </div>
  </section>
  <!-- ================= 3. DEUX MARGES, DEUX HISTOIRES ================= -->
  <section class="k-sect" id="marges">
    <div class="k-eyebrow">Deux marges</div>
    <h2 class="k-h2">Ce qu’on voit&nbsp;≠ ce qui se passe</h2>
    <p class="k-lead">Deux façons de mesurer la rentabilité. L’une rassure, l’autre alerte. Les deux sont vraies.
    Basculez de l’une à l’autre.</p>
    <div class="k-card">
      <div class="k-toggle" id="margeTabs">
        <button class="k-btn" data-marge="op" aria-pressed="true">Marge opérationnelle</button>
        <button class="k-btn" data-marge="ebitda" aria-pressed="false">Marge brute (EBITDA)</button>
      </div>
      <div style="display:flex; flex-wrap:wrap; align-items:baseline; gap:10px 18px; margin-top:18px">
        <div class="k-readout" id="mTitleVal" style="font-size:2.2rem">7,2&nbsp;%</div>
        <div id="mVerdict" class="k-chip green">solide et stable</div>
      </div>
      <div id="mChart" style="margin-top:14px; position:relative"></div>
      <p id="mExplain" style="margin-top:14px; color:var(--ink-soft); font-size:.96rem">
        La marge <strong>opérationnelle</strong>, c’est ce que rapporte le métier avant la finance et les impôts.
        Vue d’ici, tout va bien : elle reste autour de 7&nbsp;%, presque inchangée depuis 2021.</p>
      <button class="k-btn" id="mWhy" style="margin-top:16px; border-color:var(--rouille); color:var(--rouille-d)">
        <span class="k-ico">🔍</span>Pourquoi un tel écart entre les deux&nbsp;?</button>
      <div id="mReveal" style="display:none; margin-top:16px">
        <div class="k-narr" style="border-left-color:var(--rouille); background:rgba(192,67,43,.08)">
          <strong>L’astuce comptable.</strong> Le résultat opérationnel est de plus en plus soutenu par des
          <strong>reprises de provisions</strong> et des <strong>transferts de charges</strong> :
          60 → 66 → 73 → <strong>77,5 M€</strong> entre 2021 et 2024. Ces éléments gonflent le résultat
          d’exploitation… mais sont exclus de l’EBITDA. D’où le grand écart.
        </div>
        <div id="mStack" style="margin-top:14px"></div>
        <div class="k-legend">
          <span><i style="background:var(--rouille)"></i>Marge brute (EBITDA, M€) — le cash réel</span>
          <span><i style="background:var(--ble)"></i>Reprises de provisions &amp; transferts (M€)</span>
        </div>
      </div>
    </div>
  </section>
  <!-- ================= 4. LA TIRELIRE À PROVISIONS ================= -->
  <section class="k-sect" id="provisions">
    <div class="k-eyebrow">La tirelire</div>
    <h2 class="k-h2">Pourquoi le bénéfice « tient »</h2>
    <p class="k-lead">Un bénéfice élevé peut coexister avec une activité en repli. Appuyez sur les boutons et
    regardez ce qui entre — ou n’entre pas — en caisse.</p>
    <div class="k-card k-grid2" style="align-items:center">
      <div>
        <div id="jarWrap" style="position:relative"></div>
      </div>
      <div>
        <div class="k-mini" style="margin-bottom:10px">
          <div class="k-mlabel">Résultat comptable</div>
          <div class="k-mval" id="jarBook" style="color:var(--champ-d)">0,0 M€</div>
        </div>
        <div class="k-mini">
          <div class="k-mlabel">Argent réellement entré en caisse</div>
          <div class="k-mval" id="jarCash" style="color:var(--acier-d)">0,0 M€</div>
        </div>
        <div class="k-toggle" style="margin-top:14px">
          <button class="k-btn" id="jarReprise"><span class="k-ico">↩︎</span>Reprendre une provision (+77,5)</button>
          <button class="k-btn" id="jarDotation"><span class="k-ico">↪︎</span>Doter une provision (−30,8)</button>
          <button class="k-btn" id="jarReset">Remettre à zéro</button>
        </div>
        <p id="jarMsg" style="margin-top:14px; color:var(--ink-soft); font-size:.95rem">
          Une provision, c’est de l’argent mis de côté « au cas où » (un risque, un litige, un stock).
          Quand le risque disparaît, on la <em>reprend</em> : ça crée un gain comptable… mais
          <strong>aucun euro n’entre vraiment en caisse</strong>.</p>
      </div>
    </div>
  </section>
  <!-- ================= 5. TOUT LE SECTEUR PLONGE ================= -->
  <section class="k-sect" id="secteur">
    <div class="k-eyebrow">Pas un cas isolé</div>
    <h2 class="k-h2">Tout le secteur redescend</h2>
    <p class="k-lead">KUHN ne fait pas pire que les autres : la fin du super-cycle agricole frappe tous les
    grands constructeurs. Basculez de 2023 à 2025.</p>
    <div class="k-card">
      <div class="k-toggle" id="secTabs">
        <button class="k-btn" data-year="2023" aria-pressed="true">2023 · le sommet</button>
        <button class="k-btn" data-year="2025" aria-pressed="false">2025 · le creux</button>
      </div>
      <div id="secChart" style="margin-top:18px; position:relative"></div>
      <div class="k-narr">
        <div>Les trois géants du tracteur ont perdu <strong>23,4 milliards $</strong> de chiffre d’affaires et
        <strong>8,5 milliards $</strong> de résultat en deux ans, sur leurs activités agricoles. Le marché
        brésilien de KUHN ne pèse plus que <strong>30 %</strong> de son niveau de 2022.</div>
      </div>
    </div>
  </section>
  <!-- ================= 6. LES ATELIERS (volumes) ================= -->
  <section class="k-sect" id="ateliers">
    <div class="k-eyebrow">Dans les ateliers</div>
    <h2 class="k-h2">Combien de machines sortent chaque saison&nbsp;?</h2>
    <p class="k-lead">La mesure la plus concrète de l’activité réelle des sites de Saverne. Survolez ou touchez
    une barre.</p>
    <div class="k-card">
      <div id="volChart" style="position:relative"></div>
      <div class="k-narr">
        <div>La production a chuté de <strong>~40 %</strong> entre le pic 2021/22 (33&nbsp;700 machines) et le
        point bas 2024/25 (20&nbsp;100). Un <strong>rebond de +14 %</strong> est attendu pour 2025/26.</div>
      </div>
    </div>
  </section>
  <!-- ================= 7. R&D vs CA ================= -->
  <section class="k-sect" id="rd">
    <div class="k-eyebrow">Préparer demain</div>
    <h2 class="k-h2">Le chiffre baisse, la R&amp;D monte</h2>
    <p class="k-lead">Le signal le plus rassurant du dossier : pendant que le marché se contracte, KUHN
    investit davantage dans ses produits futurs.</p>
    <div class="k-card">
      <div id="rdChart" style="position:relative"></div>
      <div class="k-legend">
        <span><i style="background:var(--acier)"></i>Activité du site (indice 100 = 2019)</span>
        <span><i style="background:var(--champ)"></i>Dépenses de R&amp;D (M€)</span>
      </div>
      <div class="k-plain"><span class="k-q">+</span>
        <span>R&amp;D : <strong>16,8 → 25,8 M€</strong>, soit <strong>+54 % depuis 2019</strong>, malgré le creux
        de marché.</span></div>
    </div>
  </section>
  <!-- ================= 8. COMPTEUR RH (gauge) ================= -->
  <section class="k-sect" id="rh">
    <div class="k-eyebrow">Le point de tension</div>
    <h2 class="k-h2">Le compteur du coût du travail</h2>
    <p class="k-lead">Quand les salaires augmentent et que le chiffre d’affaires baisse, ce ratio grimpe.
    Au-delà de 24 %, la direction le juge « critique ». Faites défiler les années.</p>
    <div class="k-card" style="text-align:center">
      <div id="gaugeWrap" style="max-width:420px; margin:0 auto; position:relative"></div>
      <div class="k-toggle" id="rhTabs" style="justify-content:center; margin-top:6px">
        <button class="k-btn" data-rh="2022" aria-pressed="true">2022</button>
        <button class="k-btn" data-rh="2023" aria-pressed="false">2023</button>
        <button class="k-btn" data-rh="2024" aria-pressed="false">2024</button>
        <button class="k-btn" data-rh="2025" aria-pressed="false">2025</button>
      </div>
      <p id="rhMsg" style="margin-top:14px; color:var(--ink-soft); font-size:.95rem; max-width:52ch; margin-left:auto; margin-right:auto">
        En 2022, les frais de personnel pesaient 18,9 % du chiffre d’affaires opérationnel. Confortable.</p>
    </div>
  </section>
  <!-- ================= 9. OÙ VA L'ARGENT (dividendes) ================= -->
  <section class="k-sect" id="dividendes">
    <div class="k-eyebrow">Où va l’argent</div>
    <h2 class="k-h2">Presque tout le bénéfice ressort</h2>
    <p class="k-lead">Chaque année, qu’elle soit bonne ou mauvaise, KUHN reverse l’essentiel de son résultat à
    son actionnaire (le groupe Bucher Industries). Choisissez une année.</p>
    <div class="k-card">
      <div class="k-toggle" id="divTabs">
        <button class="k-btn" data-div="2021" aria-pressed="true">2021</button>
        <button class="k-btn" data-div="2022" aria-pressed="false">2022</button>
        <button class="k-btn" data-div="2023" aria-pressed="false">2023</button>
        <button class="k-btn" data-div="2024" aria-pressed="false">2024</button>
      </div>
      <div id="divChart" style="margin-top:18px; position:relative"></div>
      <div class="k-plain"><span class="k-q">i</span>
        <span id="divMsg">Sur ~44,3 M€ de bénéfice, environ <strong>41 M€</strong> sont sortis en dividendes,
        soit <strong>~93 %</strong>. Il reste peu de marge pour amortir un retournement durable.</span></div>
    </div>
  </section>
  <!-- ================= 10. LE PARI 2026 ================= -->
  <section class="k-sect" id="pari2026">
    <div class="k-eyebrow">Le pari</div>
    <h2 class="k-h2">L’objectif 2026 : rebondir</h2>
    <p class="k-lead">La direction vise un retour du chiffre d’affaires et de la marge — « sous réserve d’une
    conjoncture favorable ». Voici la trajectoire espérée.</p>
    <div class="k-card">
      <div id="pariChart" style="position:relative"></div>
      <div class="k-grid3" style="margin-top:16px">
        <div class="k-mini"><div class="k-mlabel">CA opérationnel 2026</div><div class="k-mval" style="color:var(--champ-d)">480 M€</div><div style="font-size:.78rem;color:var(--ink-soft)">+10 % vs 2025</div></div>
        <div class="k-mini"><div class="k-mlabel">EBIT visé</div><div class="k-mval" style="color:var(--ble-d)">59 M€</div><div style="font-size:.78rem;color:var(--ink-soft)">vs 46,8 en 2025</div></div>
        <div class="k-mini"><div class="k-mlabel">Marge visée</div><div class="k-mval" style="color:var(--terre)">12 %</div><div style="font-size:.78rem;color:var(--ink-soft)">retour au niveau 2023</div></div>
      </div>
    </div>
  </section>
  <!-- ================= CONCLUSION ================= -->
  <section class="k-sect" id="aretenir">
    <div class="k-card k-soil">
      <div class="k-eyebrow">À retenir</div>
      <h2 class="k-h2" style="color:var(--lin)">La phrase qui résume tout</h2>
      <p style="font-size:1.08rem; max-width:64ch; margin-top:8px">
        KUHN traverse <strong style="color:var(--ble-soft)">la fin d’un super-cycle agricole</strong>, comme tout
        le secteur. L’entreprise reste <strong style="color:var(--champ-soft)">financièrement très saine</strong>
        (trésorerie, faible dette, R&amp;D maintenue) et sa marge <em>opérationnelle</em> tient (~7 %).
        Mais sa marge <em>brute (EBITDA)</em> est tombée à <strong style="color:var(--rouille-soft)">2,6 % en 2024</strong> :
        l’activité génère beaucoup moins de cash. Le bénéfice élevé est en partie soutenu par des reprises de
        provisions — un effet comptable, pas un flux d’argent.
      </p>
      <div class="k-grid3" style="margin-top:20px">
        <div class="k-mini" style="background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.14)">
          <div class="k-mlabel" style="color:var(--ble-soft)">Vigilance 1</div>
          <div style="margin-top:4px; font-size:.9rem; color:var(--lin)">La rentabilité brute (EBITDA) s’est effondrée : moins de cash généré.</div></div>
        <div class="k-mini" style="background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.14)">
          <div class="k-mlabel" style="color:var(--ble-soft)">Vigilance 2</div>
          <div style="margin-top:4px; font-size:.9rem; color:var(--lin)">Le coût du travail grimpe à 26 % du CA (« critique » au-delà de 24 %).</div></div>
        <div class="k-mini" style="background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.14)">
          <div class="k-mlabel" style="color:var(--ble-soft)">Vigilance 3</div>
          <div style="margin-top:4px; font-size:.9rem; color:var(--lin)">Près de 95 % du bénéfice sort en dividendes : peu de coussin.</div></div>
      </div>
    </div>
  </section>
  <footer class="k-foot">
    <p><strong>Périmètres.</strong> KUHN SAS = comptes sociaux déposés (SIREN 675580542, exercices 2014–2024).
    KUHN Group / KSA-MGM = « Résultats 2025 – Perspectives 2026 ». Les dividendes sont des
    estimations reconstituées à partir de la variation des capitaux propres. Marge opérationnelle = résultat
    d’exploitation / CA. Marge d’EBITDA : source <code>Pappers</code>, confirmée en tendance par un calcul
    indépendant de l’excédent brut d’exploitation.</p>
    <p style="margin-top:10px">Article de vulgarisation. Les chiffres sont « justes » mais mesurent des choses
    différentes — d’où l’importance de toujours regarder le périmètre.</p>
  </footer>
</div>
<script>
/* ===========================================================================
   KUHN en clair — moteur interactif (vanilla JS, sans dépendance)
   Tout est scopé sous .kuhnv pour cohabiter avec n'importe quel thème.
   =========================================================================== */
(function(){
  "use strict";
  var root = document.querySelector('.kuhnv');
  if(!root) return;
  var $  = function(s){ return root.querySelector(s); };
  var $$ = function(s){ return Array.prototype.slice.call(root.querySelectorAll(s)); };
  var SVGNS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* ---------- formatage français ---------- */
  var nf0 = new Intl.NumberFormat('fr-FR', {maximumFractionDigits:0});
  var nf1 = new Intl.NumberFormat('fr-FR', {minimumFractionDigits:1, maximumFractionDigits:1});
  function f0(v){ return nf0.format(v); }
  function f1(v){ return nf1.format(v); }
  function pct(v){ return nf1.format(v).replace(/\u00A0/g,' ') + '\u00A0%'; }
  /* ---------- helpers SVG ---------- */
  function S(tag, attrs){
    var e = document.createElementNS(SVGNS, tag);
    if(attrs) for(var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function mkSvg(mount, vbW, vbH){
    mount.innerHTML='';
    var s = S('svg', {viewBox:'0 0 '+vbW+' '+vbH, role:'img'});
    mount.appendChild(s);
    return s;
  }
  /* ---------- animation d'un nombre ---------- */
  function countUp(el, to, fmt, unitHTML){
    var from = parseFloat(el.getAttribute('data-v') || '0');
    var dur = reduce ? 0 : 650, t0 = null;
    unitHTML = unitHTML || '';
    function step(ts){
      if(t0===null) t0=ts;
      var p = dur ? Math.min(1,(ts-t0)/dur) : 1;
      var e = 1 - Math.pow(1-p, 3);
      var cur = from + (to-from)*e;
      el.innerHTML = fmt(cur) + unitHTML;
      if(p<1) requestAnimationFrame(step);
      else el.setAttribute('data-v', to);
    }
    requestAnimationFrame(step);
  }
  /* ---------- tooltip partagé ---------- */
  function tipFor(container){
    var tip = document.createElement('div');
    tip.className='k-tip';
    container.style.position='relative';
    container.appendChild(tip);
    return {
      show:function(x,y,html){ tip.innerHTML=html; tip.style.left=x+'px'; tip.style.top=y+'px'; tip.style.opacity=1; },
      hide:function(){ tip.style.opacity=0; }
    };
  }
  /* ---------- IntersectionObserver pour les révélations ---------- */
  var revealCbs = [];
  function onReveal(el, cb){
    if(reduce || !('IntersectionObserver' in window)){ cb(); return; }
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ cb(); io.disconnect(); } });
    }, {threshold:0.25});
    io.observe(el);
  }
  /* =========================================================================
     1) LES 3 PÉRIMÈTRES
     ========================================================================= */
  (function(){
    var data = {
      group:{ v24:1217, v25:1123, ico:'🌍', title:'KUHN Group — le groupe mondial consolidé',
        desc:'Toutes les filiales du monde additionnées. C’est le « grand KUHN », celui dont parlent les communiqués du groupe.',
        why:'Plus le périmètre est large, plus le chiffre est gros — sans qu’une seule machine de plus n’ait été vendue.' },
      sas:{ v24:799.2, v25:null, ico:'🏢', title:'KUHN SAS — l’entité juridique de Saverne',
        desc:'Les comptes officiels déposés au greffe. Ils incluent les ventes faites aux autres sociétés du groupe (facturation interne).',
        why:'Ce montant contient des ventes « entre cousins » du groupe : il est plus gros que l’activité réelle du site.' },
      op:{ v24:441.2, v25:436, ico:'🏭', title:'KSA-MGM — l’activité réelle du site',
        desc:'Le travail concret de Saverne et MGM, une fois retirée la facturation interne. C’est la mesure la plus proche du terrain.',
        why:'On enlève les ventes internes : il reste ce que le site produit et vend vraiment vers l’extérieur.' }
    };
    var val = $('#periValue'), v25 = $('#periValue25'), title=$('#periTitle'), desc=$('#periDesc'), why=$('#periWhy');
    function set(key){
      var d = data[key];
      var fmtBig = (key==='group') ? f0 : f1;
      countUp(val, d.v24, fmtBig, '<span class="k-unit">M€ · 2024</span>');
      if(d.v25!==null){ v25.style.display=''; v25.textContent = '2025 : '+f0(d.v25)+' M€'; }
      else { v25.style.display=''; v25.textContent='2025 : pas encore déposé'; }
      title.textContent = d.title;
      desc.textContent = d.desc;
      why.textContent = d.why;
    }
    $$('#periTabs .k-btn').forEach(function(b){
      b.addEventListener('click', function(){
        $$('#periTabs .k-btn').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true');
        set(b.getAttribute('data-peri'));
      });
    });
    set('group');
  })();
  /* =========================================================================
     2) LA GRANDE VAGUE — timeline scrubber
     ========================================================================= */
  (function(){
    var years = [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
    var CA  = [681.9,626.9,596.7,670.7,738.6,739.3,688.7,824.0,941.8,979.1,799.2];
    var NET = [41.7,46.2,41.7,43.2,39.2,39.4,42.8,44.3,59.2,65.4,55.3];
    var note = [
      'Point de départ : 682 M€, bénéfice 42 M€.',
      'Léger reflux, mais le bénéfice grimpe à 46 M€.',
      'Creux du cycle : 597 M€, le plus bas de la décennie.',
      'Reprise nette : +12 % en un an.',
      'Le cap des 738 M€ est franchi.',
      'Plateau haut, juste avant le Covid.',
      'Covid : le CA fléchit un peu, le bénéfice tient (43 M€).',
      'La vague démarre : +20 %, 824 M€.',
      'Emballement : 942 M€, bénéfice 59 M€.',
      'Sommet historique : 979 M€ et 65 M€ de bénéfice. 🔥',
      'Atterrissage : −18 %, retour vers la normale. Le bénéfice reste élevé (55 M€).'
    ];
    function phase(i){
      if(i<=6) return {name:'Le socle', cls:'steel', col:'var(--acier)'};
      if(i<=9) return {name:'La vague', cls:'gold', col:'var(--ble)'};
      return {name:'L’atterrissage', cls:'rust', col:'var(--rouille)'};
    }
    var phaseTxt = {
      socle:'<strong>2014–2020 · le socle.</strong> Une entreprise mature et prudente. Le chiffre d’affaires oscille entre 600 et 740 M€, le bénéfice tourne autour de 40 M€. Rien de spectaculaire — mais solide.',
      vague:'<strong>2021–2023 · la vague.</strong> Le marché agricole s’emballe : prix élevés, agriculteurs qui investissent. Le CA bondit de 824 à 979 M€ et le bénéfice atteint un record (65 M€).',
      atter:'<strong>2024 · l’atterrissage.</strong> Le CA recule de 18 %. Ce n’est pas une crise : c’est un retour à la normale après deux années exceptionnelles. Le bénéfice reste élevé (55 M€).'
    };
    var W=640,H=210,padL=10,padR=10,padT=18,padB=26;
    var mount=$('#vChart'), svg=mkSvg(mount,W,H);
    var minV=560,maxV=1000;
    function x(i){ return padL + i*(W-padL-padR)/(years.length-1); }
    function y(v){ return H-padB - (v-minV)/(maxV-minV)*(H-padT-padB); }
    // gradient
    var defs=S('defs'); var lg=S('linearGradient',{id:'vgrad',x1:0,y1:0,x2:0,y2:1});
    lg.appendChild(S('stop',{offset:'0%','stop-color':'var(--ble)','stop-opacity':0.45}));
    lg.appendChild(S('stop',{offset:'100%','stop-color':'var(--champ)','stop-opacity':0.05}));
    defs.appendChild(lg); svg.appendChild(defs);
    // area + line
    var dLine='', dArea='';
    for(var i=0;i<years.length;i++){ dLine += (i?' L':'M')+x(i)+' '+y(CA[i]); }
    dArea = dLine + ' L'+x(years.length-1)+' '+(H-padB)+' L'+x(0)+' '+(H-padB)+' Z';
    svg.appendChild(S('path',{d:dArea, fill:'url(#vgrad)'}));
    var line=S('path',{d:dLine, fill:'none', stroke:'var(--champ-d)','stroke-width':2.5,'stroke-linejoin':'round'});
    svg.appendChild(line);
    // x labels (sparse)
    [0,3,6,7,9,10].forEach(function(i){
      var t=S('text',{x:x(i),y:H-8,'text-anchor':'middle','class':'k-axis'}); t.textContent=years[i]; svg.appendChild(t);
    });
    var guide=S('line',{x1:x(0),y1:padT-6,x2:x(0),y2:H-padB,stroke:'var(--rouille)','stroke-width':1.5,'stroke-dasharray':'3 3'});
    svg.appendChild(guide);
    var dot=S('circle',{cx:x(0),cy:y(CA[0]),r:6,fill:'var(--acier)',stroke:'#fff','stroke-width':2.5});
    svg.appendChild(dot);
    var vYear=$('#vYear'), vCA=$('#vCA'), vNet=$('#vNet'), vPhase=$('#vPhase'), vNarr=$('#vNarr'), slider=$('#vSlider');
    var lastPhase='';
    function update(i, animateNum){
      var ph=phase(i);
      guide.setAttribute('x1',x(i)); guide.setAttribute('x2',x(i));
      dot.setAttribute('cx',x(i)); dot.setAttribute('cy',y(CA[i])); dot.setAttribute('fill',ph.col);
      vYear.textContent=years[i];
      vPhase.textContent=ph.name; vPhase.className='k-chip '+ph.cls;
      if(animateNum){
        countUp(vCA, CA[i], function(x){return f1(x);}, '<span class="k-unit">M€</span>');
        countUp(vNet, NET[i], function(x){return f1(x);}, '<span class="k-unit">M€</span>');
      } else {
        vCA.innerHTML=f1(CA[i])+'<span class="k-unit">M€</span>'; vCA.setAttribute('data-v',CA[i]);
        vNet.innerHTML=f1(NET[i])+'<span class="k-unit">M€</span>'; vNet.setAttribute('data-v',NET[i]);
      }
      var key = i<=6?'socle':(i<=9?'vague':'atter');
      if(key!==lastPhase){ vNarr.innerHTML=phaseTxt[key]; lastPhase=key; }
    }
    slider.addEventListener('input', function(){ update(parseInt(slider.value,10), true); });
    var playBtn=$('#vPlay'), playing=false, timer=null;
    function stop(){ playing=false; clearInterval(timer); playBtn.innerHTML='<span class="k-ico">▶︎</span>Lire l’histoire'; }
    playBtn.addEventListener('click', function(){
      if(playing){ stop(); return; }
      playing=true; playBtn.innerHTML='<span class="k-ico">❚❚</span>Pause';
      var i = parseInt(slider.value,10);
      if(i>=years.length-1) i=0;
      timer=setInterval(function(){
        slider.value=i; update(i,true);
        i++;
        if(i>=years.length){ stop(); }
      }, reduce?180:780);
    });
    update(0,false);
  })();
  /* =========================================================================
     3) DEUX MARGES, DEUX HISTOIRES
     ========================================================================= */
  (function(){
    var yrs=[2021,2022,2023,2024];
    var series={
      op:{ v:[6.3,7.1,7.3,7.2], col:'var(--champ)', verdict:'solide et stable', vclass:'k-chip green',
        text:'La marge <strong>opérationnelle</strong>, c’est ce que rapporte le métier avant la finance et les impôts. Vue d’ici, tout va bien : elle reste autour de 7 %, presque inchangée depuis 2021.' },
      ebitda:{ v:[9.3,9.0,4.2,2.6], col:'var(--rouille)', verdict:'en chute libre', vclass:'k-chip rust',
        text:'L’<strong>EBITDA</strong> mesure le cash brut généré par l’activité, avant amortissements et avant l’effet des provisions. C’est le plus proche de la réalité du terrain — et il s’effondre : de 9 % à 2,6 %.' }
    };
    var W=640,H=200,padL=34,padR=10,padT=14,padB=24;
    var mount=$('#mChart'), svg=mkSvg(mount,W,H);
    function x(i){ return padL + i*(W-padL-padR)/(yrs.length-1); }
    function y(v){ return H-padB - v/10*(H-padT-padB); }
    [0,2,4,6,8,10].forEach(function(g){
      svg.appendChild(S('line',{x1:padL,y1:y(g),x2:W-padR,y2:y(g),'class':'k-gridline'}));
      var t=S('text',{x:padL-6,y:y(g)+4,'text-anchor':'end','class':'k-axis'}); t.textContent=g+'%'; svg.appendChild(t);
    });
    yrs.forEach(function(yr,i){ var t=S('text',{x:x(i),y:H-7,'text-anchor':'middle','class':'k-axis'}); t.textContent=yr; svg.appendChild(t); });
    function path(arr){ var d=''; for(var i=0;i<arr.length;i++) d+=(i?' L':'M')+x(i)+' '+y(arr[i]); return d; }
    var pOp=S('path',{d:path(series.op.v),fill:'none',stroke:series.op.col,'stroke-width':2.5,'stroke-linejoin':'round'});
    var pEb=S('path',{d:path(series.ebitda.v),fill:'none',stroke:series.ebitda.col,'stroke-width':2.5,'stroke-linejoin':'round'});
    svg.appendChild(pOp); svg.appendChild(pEb);
    var dots={op:[],ebitda:[]};
    ['op','ebitda'].forEach(function(k){
      series[k].v.forEach(function(v,i){ var c=S('circle',{cx:x(i),cy:y(v),r:4,fill:series[k].col,stroke:'#fff','stroke-width':1.5}); dots[k].push(c); svg.appendChild(c); });
    });
    var titleVal=$('#mTitleVal'), verdict=$('#mVerdict'), explain=$('#mExplain');
    function setActive(key){
      var on = key==='op'?pOp:pEb, off = key==='op'?pEb:pOp;
      on.setAttribute('opacity',1); on.setAttribute('stroke-width',3);
      off.setAttribute('opacity',0.18); off.setAttribute('stroke-width',2);
      dots.op.forEach(function(c){ c.setAttribute('opacity', key==='op'?1:0.18); });
      dots.ebitda.forEach(function(c){ c.setAttribute('opacity', key==='ebitda'?1:0.18); });
      var s=series[key];
      countUp(titleVal, s.v[s.v.length-1], function(x){return f1(x);}, '\u00A0%');
      verdict.textContent=s.verdict; verdict.className=s.vclass;
      explain.innerHTML=s.text;
    }
    $$('#margeTabs .k-btn').forEach(function(b){
      b.addEventListener('click', function(){
        $$('#margeTabs .k-btn').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true');
        setActive(b.getAttribute('data-marge'));
      });
    });
    setActive('op');
    // reveal : EBITDA (cash) qui chute vs reprises de provisions qui montent
    var revealed=false;
    $('#mWhy').addEventListener('click', function(){
      var box=$('#mReveal');
      if(box.style.display==='none'){ box.style.display=''; this.style.display='none';
        if(!revealed){ revealed=true; drawStack(); }
      }
    });
    function drawStack(){
      var ebit=[76.6,84.8,41.1,20.8];   // EBITDA en M€
      var repr=[60,66,73,77.5];          // reprises + transferts en M€
      var W2=640,H2=200,pL=34,pR=10,pT=14,pB=24, maxV=90;
      var m=$('#mStack'), s2=mkSvg(m,W2,H2);
      function x2(i){ return pL + i*(W2-pL-pR)/(yrs.length-1); }
      function y2(v){ return H2-pB - v/maxV*(H2-pT-pB); }
      [0,30,60,90].forEach(function(g){ s2.appendChild(S('line',{x1:pL,y1:y2(g),x2:W2-pR,y2:y2(g),'class':'k-gridline'}));
        var t=S('text',{x:pL-6,y:y2(g)+4,'text-anchor':'end','class':'k-axis'}); t.textContent=g; s2.appendChild(t); });
      yrs.forEach(function(yr,i){ var t=S('text',{x:x2(i),y:H2-7,'text-anchor':'middle','class':'k-axis'}); t.textContent=yr; s2.appendChild(t); });
      function pp(arr){ var d=''; for(var i=0;i<arr.length;i++) d+=(i?' L':'M')+x2(i)+' '+y2(arr[i]); return d; }
      var lE=S('path',{d:pp(ebit),fill:'none',stroke:'var(--rouille)','stroke-width':3,'stroke-linejoin':'round'});
      var lR=S('path',{d:pp(repr),fill:'none',stroke:'var(--ble)','stroke-width':3,'stroke-linejoin':'round','stroke-dasharray':'1 0'});
      s2.appendChild(lE); s2.appendChild(lR);
      ebit.forEach(function(v,i){ s2.appendChild(S('circle',{cx:x2(i),cy:y2(v),r:4,fill:'var(--rouille)',stroke:'#fff','stroke-width':1.5})); });
      repr.forEach(function(v,i){ s2.appendChild(S('circle',{cx:x2(i),cy:y2(v),r:4,fill:'var(--ble)',stroke:'#fff','stroke-width':1.5})); });
      if(!reduce){
        var len=lE.getTotalLength(); [lE,lR].forEach(function(l){ var L=l.getTotalLength();
          l.style.strokeDasharray=L; l.style.strokeDashoffset=L;
          l.getBoundingClientRect(); l.style.transition='stroke-dashoffset 1.1s ease'; l.style.strokeDashoffset=0; });
      }
    }
  })();
  /* =========================================================================
     4) LA TIRELIRE À PROVISIONS
     ========================================================================= */
  (function(){
    var W=200,H=200, mount=$('#jarWrap'), svg=mkSvg(mount,W,H);
    var reserveMax=160, reserve=120; // niveau illustratif de la réserve de provisions
    // bocal
    var jarX=46, jarY=34, jarW=108, jarH=132, r=14;
    var defs=S('defs');
    var clip=S('clipPath',{id:'jarclip'});
    clip.appendChild(S('rect',{x:jarX,y:jarY,width:jarW,height:jarH,rx:r}));
    defs.appendChild(clip); svg.appendChild(defs);
    // liquide (réserve)
    var liq=S('rect',{x:jarX,width:jarW,'clip-path':'url(#jarclip)',fill:'var(--ble)','fill-opacity':0.85});
    svg.appendChild(liq);
    // contour bocal
    svg.appendChild(S('rect',{x:jarX,y:jarY,width:jarW,height:jarH,rx:r,fill:'none',stroke:'var(--terre3)','stroke-width':3}));
    svg.appendChild(S('rect',{x:jarX+18,y:jarY-12,width:jarW-36,height:16,rx:5,fill:'var(--terre3)'})); // couvercle
    var lbl=S('text',{x:W/2,y:jarY+jarH+22,'text-anchor':'middle','class':'k-axis'}); lbl.textContent='Réserve « au cas où »'; svg.appendChild(lbl);
    function drawLiquid(){
      var h = reserve/reserveMax*jarH;
      liq.setAttribute('y', jarY+jarH-h);
      liq.setAttribute('height', h);
    }
    drawLiquid();
    var book=$('#jarBook'), cash=$('#jarCash'), msg=$('#jarMsg');
    var bookV=0, cashV=0;
    function render(animate){
      if(animate){ countUp(book, bookV, function(x){return f1(x);}, ' M€'); }
      else { book.innerHTML=f1(bookV)+' M€'; book.setAttribute('data-v',bookV); }
      cash.innerHTML=f1(cashV)+' M€'; cash.setAttribute('data-v',cashV);
      drawLiquid();
    }
    $('#jarReprise').addEventListener('click', function(){
      bookV += 77.5; reserve = Math.max(20, reserve-60);
      msg.innerHTML='On a <strong>repris</strong> une provision : +77,5 M€ de résultat comptable. La réserve baisse… mais regardez la caisse : <strong>elle n’a pas bougé</strong>. Aucun euro n’est entré.';
      render(true);
    });
    $('#jarDotation').addEventListener('click', function(){
      bookV -= 30.8; reserve = Math.min(reserveMax, reserve+30);
      msg.innerHTML='On a <strong>doté</strong> une provision : −30,8 M€ de résultat comptable, par prudence. Là encore, <strong>la caisse ne bouge pas</strong> : c’est une écriture, pas une sortie d’argent.';
      render(true);
    });
    $('#jarReset').addEventListener('click', function(){
      bookV=0; cashV=0; reserve=120;
      msg.innerHTML='Une provision, c’est de l’argent mis de côté « au cas où ». Quand le risque disparaît, on la <em>reprend</em> : ça crée un gain comptable… mais <strong>aucun euro n’entre vraiment en caisse</strong>.';
      render(true);
    });
    render(false);
  })();
  /* =========================================================================
     5) TOUT LE SECTEUR PLONGE
     ========================================================================= */
  (function(){
    var names=['John Deere','CNH','AGCO','KUHN Group'];
    var vals={ '2023':[22.8,14.5,11.9,11.4], '2025':[13.8,6.2,6.8,7.1] };
    var W=640,H=220,padL=34,padR=10,padT=16,padB=40, maxV=25;
    var mount=$('#secChart'), svg=mkSvg(mount,W,H);
    function y(v){ return H-padB - v/maxV*(H-padT-padB); }
    [0,5,10,15,20,25].forEach(function(g){ svg.appendChild(S('line',{x1:padL,y1:y(g),x2:W-padR,y2:y(g),'class':'k-gridline'}));
      var t=S('text',{x:padL-6,y:y(g)+4,'text-anchor':'end','class':'k-axis'}); t.textContent=g+'%'; svg.appendChild(t); });
    var n=names.length, slot=(W-padL-padR)/n, bw=slot*0.5;
    var bars=[], labels=[], vlabels=[];
    names.forEach(function(nm,i){
      var bx=padL+slot*i+(slot-bw)/2;
      var col = (nm==='KUHN Group')?'var(--ble)':'var(--acier)';
      var rect=S('rect',{x:bx,y:y(0),width:bw,height:0,rx:5,fill:col,'class':'k-bar'}); svg.appendChild(rect); bars.push(rect);
      var t=S('text',{x:bx+bw/2,y:H-22,'text-anchor':'middle','class':'k-axis'}); t.textContent=nm; svg.appendChild(t); labels.push(t);
      var vt=S('text',{x:bx+bw/2,y:y(0)-6,'text-anchor':'middle','class':'k-axis',fill:'var(--ink)'}); vt.setAttribute('font-weight','700'); svg.appendChild(vt); vlabels.push(vt);
    });
    function set(yr){
      var arr=vals[yr];
      arr.forEach(function(v,i){
        bars[i].setAttribute('y',y(v)); bars[i].setAttribute('height',(H-padB)-y(v));
        vlabels[i].setAttribute('y',y(v)-6); vlabels[i].textContent=pct(v);
        bars[i].setAttribute('fill', yr==='2025' ? (names[i]==='KUHN Group'?'var(--ble)':'var(--rouille)') : (names[i]==='KUHN Group'?'var(--ble)':'var(--acier)'));
      });
    }
    $$('#secTabs .k-btn').forEach(function(b){
      b.addEventListener('click', function(){
        $$('#secTabs .k-btn').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true'); set(b.getAttribute('data-year'));
      });
    });
    onReveal(mount, function(){ set('2023'); });
  })();
  /* =========================================================================
     6) LES ATELIERS — volumes de production
     ========================================================================= */
  (function(){
    var labels=['16/17','17/18','18/19','19/20','20/21','21/22','22/23','23/24','24/25','25/26'];
    var vals=[26600,30000,29800,25900,31600,33700,31600,22500,20100,22900];
    var col=function(i){ if(i===5) return 'var(--ble)'; if(i===8) return 'var(--rouille)'; if(i===9) return 'var(--champ)'; return 'var(--acier)'; };
    var W=640,H=240,padL=10,padR=10,padT=24,padB=34, maxV=36000;
    var mount=$('#volChart'), svg=mkSvg(mount,W,H);
    var tip=tipFor(mount);
    function y(v){ return H-padB - v/maxV*(H-padT-padB); }
    var n=vals.length, slot=(W-padL-padR)/n, bw=slot*0.62;
    var rectW = mount.getBoundingClientRect().width || W;
    vals.forEach(function(v,i){
      var bx=padL+slot*i+(slot-bw)/2;
      var rect=S('rect',{x:bx,y:y(0),width:bw,height:0,rx:4,fill:col(i),'class':'k-bar'});
      svg.appendChild(rect);
      var t=S('text',{x:bx+bw/2,y:H-20,'text-anchor':'middle','class':'k-axis'}); t.textContent=labels[i]; svg.appendChild(t);
      // interactions
      function showTip(){
        var sc = (mount.getBoundingClientRect().width||W)/W;
        tip.show((bx+bw/2)*sc, y(v)*sc, f0(v)+' machines · '+labels[i]);
      }
      rect.addEventListener('mouseenter', showTip);
      rect.addEventListener('mousemove', showTip);
      rect.addEventListener('mouseleave', tip.hide);
      rect.addEventListener('click', showTip);
      rect.__draw=function(){ rect.setAttribute('y',y(v)); rect.setAttribute('height',(H-padB)-y(v)); };
    });
    // annotations pic / creux / rebond
    function annot(i,txt,col){
      var bx=padL+slot*i+slot/2;
      var t=S('text',{x:bx,y:y(vals[i])-8,'text-anchor':'middle','class':'k-axis'}); t.setAttribute('fill',col); t.setAttribute('font-weight','700'); t.textContent=txt; svg.appendChild(t);
    }
    onReveal(mount, function(){
      $$('#volChart rect').forEach(function(r){ if(r.__draw) r.__draw(); });
      setTimeout(function(){ annot(5,'pic','var(--ble-d)'); annot(8,'point bas','var(--rouille-d)'); annot(9,'rebond +14%','var(--champ-d)'); }, reduce?0:720);
    });
  })();
  /* =========================================================================
     7) R&D vs CA
     ========================================================================= */
  (function(){
    var yrs=[2019,2020,2021,2022,2023,2024,2025];
    var rd =[16.8,14.8,15.9,18.2,20.5,22.3,25.8];
    var caOp=[393,375,457,542,545,441,436];           // KSA-MGM, activité du site
    var idx = caOp.map(function(v){ return v/caOp[0]*100; });
    var W=640,H=230,padL=34,padR=40,padT=16,padB=30;
    var mount=$('#rdChart'), svg=mkSvg(mount,W,H);
    var rdMax=28, idxMin=80, idxMax=145;
    function x(i){ return padL + i*(W-padL-padR)/(yrs.length-1); }
    function yR(v){ return H-padB - v/rdMax*(H-padT-padB); }
    function yI(v){ return H-padB - (v-idxMin)/(idxMax-idxMin)*(H-padT-padB); }
    [0,7,14,21,28].forEach(function(g){ svg.appendChild(S('line',{x1:padL,y1:yR(g),x2:W-padR,y2:yR(g),'class':'k-gridline'}));
      var t=S('text',{x:padL-6,y:yR(g)+4,'text-anchor':'end','class':'k-axis'}); t.textContent=g; svg.appendChild(t); });
    yrs.forEach(function(yr,i){ var t=S('text',{x:x(i),y:H-9,'text-anchor':'middle','class':'k-axis'}); t.textContent=yr; svg.appendChild(t); });
    // bars R&D
    var bw=22;
    var rdBars=[];
    rd.forEach(function(v,i){ var rect=S('rect',{x:x(i)-bw/2,y:yR(0),width:bw,height:0,rx:4,fill:'var(--champ)','class':'k-bar'}); svg.appendChild(rect); rdBars.push({r:rect,v:v}); });
    // line CA index
    function pathI(){ var d=''; for(var i=0;i<idx.length;i++) d+=(i?' L':'M')+x(i)+' '+yI(idx[i]); return d; }
    var caLine=S('path',{d:pathI(),fill:'none',stroke:'var(--acier)','stroke-width':2.5,'stroke-linejoin':'round'});
    svg.appendChild(caLine);
    idx.forEach(function(v,i){ svg.appendChild(S('circle',{cx:x(i),cy:yI(v),r:3.5,fill:'var(--acier)',stroke:'#fff','stroke-width':1.5})); });
    onReveal(mount, function(){
      rdBars.forEach(function(o){ o.r.setAttribute('y',yR(o.v)); o.r.setAttribute('height',(H-padB)-yR(o.v)); });
      if(!reduce){ var L=caLine.getTotalLength(); caLine.style.strokeDasharray=L; caLine.style.strokeDashoffset=L; caLine.getBoundingClientRect(); caLine.style.transition='stroke-dashoffset 1.2s ease'; caLine.style.strokeDashoffset=0; }
    });
  })();
  /* =========================================================================
     8) COMPTEUR RH — jauge
     ========================================================================= */
  (function(){
    var data={ '2022':18.9, '2023':20.1, '2024':24.7, '2025':26.0 };
    var msgs={
      '2022':'En 2022, les frais de personnel pesaient 18,9 % du chiffre d’affaires opérationnel. Confortable.',
      '2023':'2023 : 20,1 %. La pression monte doucement.',
      '2024':'2024 : 24,7 %. Le seuil « critique » de 24 % est franchi : salaires en hausse, CA en baisse.',
      '2025':'2025 : 26 % (28,9 % en comptant l’intérim). C’est le vrai point de tension à surveiller.'
    };
    var W=420,H=240, cx=210, cy=200, r=150, max=30, critical=24;
    var mount=$('#gaugeWrap'), svg=mkSvg(mount,W,H);
    function ang(v){ return Math.PI - (v/max)*Math.PI; } // 180°→0°
    function pt(v,rad){ return [cx+rad*Math.cos(ang(v)), cy-rad*Math.sin(ang(v))]; }
    function arc(v0,v1,rad,col,wdt){
      var a=pt(v0,rad), b=pt(v1,rad);
      var large = 0; // aucun sous-arc ne dépasse 180°
      var p=S('path',{d:'M'+a[0]+' '+a[1]+' A'+rad+' '+rad+' 0 '+large+' 1 '+b[0]+' '+b[1], fill:'none', stroke:col,'stroke-width':wdt,'stroke-linecap':'round'});
      svg.appendChild(p);
    }
    arc(0,critical,r,'var(--champ-soft)',16);
    arc(critical,max,r,'var(--rouille-soft)',16);
    // graduations
    [0,6,12,18,24,30].forEach(function(g){ var a=pt(g,r-16), b=pt(g,r-26);
      svg.appendChild(S('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'var(--ink-soft)','stroke-width':1.5}));
      var tp=pt(g,r-40); var t=S('text',{x:tp[0],y:tp[1]+4,'text-anchor':'middle','class':'k-axis'}); t.textContent=g+'%'; svg.appendChild(t);
    });
    // libellé seuil
    var ct=pt(critical,r+16); var cl=S('text',{x:ct[0],y:ct[1],'text-anchor':'middle','class':'k-axis'}); cl.setAttribute('fill','var(--rouille-d)'); cl.setAttribute('font-weight','700'); cl.textContent='24 % = critique'; svg.appendChild(cl);
    // aiguille
    var needle=S('line',{x1:cx,y1:cy,x2:pt(0,r-30)[0],y2:pt(0,r-30)[1],stroke:'var(--terre)','stroke-width':4,'stroke-linecap':'round'});
    svg.appendChild(needle);
    svg.appendChild(S('circle',{cx:cx,cy:cy,r:8,fill:'var(--terre)'}));
    var valTxt=S('text',{x:cx,y:cy-44,'text-anchor':'middle'}); valTxt.setAttribute('font-family','var(--mono)'); valTxt.setAttribute('font-weight','700'); valTxt.setAttribute('font-size','30'); valTxt.setAttribute('fill','var(--terre)'); svg.appendChild(valTxt);
    var capt=S('text',{x:cx,y:cy-24,'text-anchor':'middle','class':'k-axis'}); capt.textContent='frais perso / CA opérationnel'; svg.appendChild(capt);
    var curV=0;
    function set(v, animate){
      var col = v>=critical ? 'var(--rouille)' : 'var(--champ)';
      valTxt.setAttribute('fill', v>=critical?'var(--rouille-d)':'var(--terre)');
      if(animate && !reduce){
        var from=curV, t0=null, dur=700;
        (function go(ts){ if(t0===null)t0=ts; var p=Math.min(1,(ts-t0)/dur); var e=1-Math.pow(1-p,3); var cv=from+(v-from)*e;
          var end=pt(cv,r-30); needle.setAttribute('x2',end[0]); needle.setAttribute('y2',end[1]); valTxt.textContent=pct(cv);
          if(p<1) requestAnimationFrame(go); })(performance.now());
      } else {
        var end=pt(v,r-30); needle.setAttribute('x2',end[0]); needle.setAttribute('y2',end[1]); valTxt.textContent=pct(v);
      }
      curV=v;
    }
    $$('#rhTabs .k-btn').forEach(function(b){
      b.addEventListener('click', function(){
        $$('#rhTabs .k-btn').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true');
        var yr=b.getAttribute('data-rh'); set(data[yr], true); $('#rhMsg').innerHTML=msgs[yr];
      });
    });
    onReveal(mount, function(){ set(data['2022'], true); });
  })();
  /* =========================================================================
     9) OÙ VA L'ARGENT — dividendes
     ========================================================================= */
  (function(){
    var data={
      '2021':{ben:44.3, div:41, pct:93}, '2022':{ben:59.2, div:57, pct:96},
      '2023':{ben:65.4, div:63, pct:96}, '2024':{ben:55.3, div:52, pct:94}
    };
    var W=640,H=140,padL=10,padR=10,padT=24,padB=40;
    var mount=$('#divChart'), svg=mkSvg(mount,W,H);
    var barY=padT, barH=46, fullW=W-padL-padR;
    var track=S('rect',{x:padL,y:barY,width:fullW,height:barH,rx:8,fill:'var(--champ-soft)'}); svg.appendChild(track);
    var out=S('rect',{x:padL,y:barY,width:0,height:barH,rx:8,fill:'var(--ble)','class':'k-bar'}); svg.appendChild(out);
    var outTxt=S('text',{x:padL+10,y:barY+barH/2+5}); outTxt.setAttribute('fill','var(--terre)'); outTxt.setAttribute('font-family','var(--mono)'); outTxt.setAttribute('font-weight','700'); outTxt.setAttribute('font-size','15'); svg.appendChild(outTxt);
    var keepTxt=S('text',{x:W-padR-10,y:barY+barH/2+5,'text-anchor':'end'}); keepTxt.setAttribute('fill','var(--champ-d)'); keepTxt.setAttribute('font-family','var(--mono)'); keepTxt.setAttribute('font-weight','700'); keepTxt.setAttribute('font-size','13'); svg.appendChild(keepTxt);
    var capOut=S('text',{x:padL,y:barY-8,'class':'k-axis'}); capOut.setAttribute('fill','var(--ble-d)'); capOut.textContent='→ Dividendes (vers Bucher Industries)'; svg.appendChild(capOut);
    var capKeep=S('text',{x:W-padR,y:barY+barH+22,'text-anchor':'end','class':'k-axis'}); capKeep.setAttribute('fill','var(--champ-d)'); capKeep.textContent='conservé dans l’entreprise'; svg.appendChild(capKeep);
    function set(yr){
      var d=data[yr];
      var w = fullW*d.pct/100;
      out.setAttribute('width', w);
      outTxt.textContent = d.pct+' %  ·  ~'+f0(d.div)+' M€';
      keepTxt.textContent = (100-d.pct)+' %';
      $('#divMsg').innerHTML='Sur ~'+f1(d.ben)+' M€ de bénéfice, environ <strong>'+f0(d.div)+' M€</strong> sont ressortis en dividendes, soit <strong>~'+d.pct+' %</strong>. Il reste peu de marge pour amortir un retournement durable.';
    }
    $$('#divTabs .k-btn').forEach(function(b){
      b.addEventListener('click', function(){
        $$('#divTabs .k-btn').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true'); set(b.getAttribute('data-div'));
      });
    });
    onReveal(mount, function(){ set('2021'); });
  })();
  /* =========================================================================
     10) LE PARI 2026
     ========================================================================= */
  (function(){
    var yrs=['2023','2024','2025','2026'];
    var caOp=[544.7,441.2,436,480];
    var marg=[12.5,11.3,10.7,12.0];
    var W=640,H=240,padL=34,padR=40,padT=20,padB=34, caMax=600, mMin=8, mMax=14;
    var mount=$('#pariChart'), svg=mkSvg(mount,W,H);
    function x(i){ return padL + i*(W-padL-padR)/(yrs.length-1); }
    function yC(v){ return H-padB - v/caMax*(H-padT-padB); }
    function yM(v){ return H-padB - (v-mMin)/(mMax-mMin)*(H-padT-padB); }
    [0,150,300,450,600].forEach(function(g){ svg.appendChild(S('line',{x1:padL,y1:yC(g),x2:W-padR,y2:yC(g),'class':'k-gridline'}));
      var t=S('text',{x:padL-6,y:yC(g)+4,'text-anchor':'end','class':'k-axis'}); t.textContent=g; svg.appendChild(t); });
    var bw=46, bars=[];
    caOp.forEach(function(v,i){
      var col = (yrs[i]==='2026')?'var(--champ)':'var(--acier)';
      var rect=S('rect',{x:x(i)-bw/2,y:yC(0),width:bw,height:0,rx:5,fill:col,'class':'k-bar'}); svg.appendChild(rect); bars.push({r:rect,v:v});
      var t=S('text',{x:x(i),y:H-9,'text-anchor':'middle','class':'k-axis'}); t.textContent=yrs[i]+(yrs[i]==='2026'?' (obj.)':''); svg.appendChild(t);
      var vt=S('text',{x:x(i),y:yC(v)-6,'text-anchor':'middle','class':'k-axis',fill:'var(--ink)'}); vt.setAttribute('font-weight','700'); vt.textContent=f0(v); svg.appendChild(vt);
    });
    function pathM(){ var d=''; for(var i=0;i<marg.length;i++) d+=(i?' L':'M')+x(i)+' '+yM(marg[i]); return d; }
    var mLine=S('path',{d:pathM(),fill:'none',stroke:'var(--ble)','stroke-width':2.5,'stroke-dasharray':'5 4','stroke-linejoin':'round'});
    svg.appendChild(mLine);
    marg.forEach(function(v,i){ svg.appendChild(S('circle',{cx:x(i),cy:yM(v),r:4,fill:'var(--ble)',stroke:'#fff','stroke-width':1.5}));
      var t=S('text',{x:x(i),y:yM(v)-9,'text-anchor':'middle','class':'k-axis'}); t.setAttribute('fill','var(--ble-d)'); t.setAttribute('font-weight','700'); t.textContent=pct(v); svg.appendChild(t); });
    // légende
    var lg=S('text',{x:W-padR,y:padT-6,'text-anchor':'end','class':'k-axis'}); lg.setAttribute('fill','var(--ble-d)'); lg.textContent='— — marge EBIT (%)'; svg.appendChild(lg);
    var lg2=S('text',{x:padL,y:padT-6,'class':'k-axis'}); lg2.setAttribute('fill','var(--acier-d)'); lg2.textContent='■ CA opérationnel (M€)'; svg.appendChild(lg2);
    onReveal(mount, function(){
      bars.forEach(function(o){ o.r.setAttribute('y',yC(o.v)); o.r.setAttribute('height',(H-padB)-yC(o.v)); });
      if(!reduce){ var L=mLine.getTotalLength(); mLine.style.strokeDasharray=L; mLine.style.strokeDashoffset=L; mLine.getBoundingClientRect(); mLine.style.transition='stroke-dashoffset 1.2s ease'; mLine.style.strokeDashoffset=0; setTimeout(function(){ mLine.style.strokeDasharray='5 4'; mLine.style.strokeDashoffset=0; mLine.style.transition='none'; }, 1300); }
    });
  })();
})();
</script>
