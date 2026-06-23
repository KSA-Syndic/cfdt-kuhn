/* Application interactive — article kuhn-resultats (nécessite data.js) */
(function (D) {
  'use strict';
  if (!D) {
    console.error('[kuhn-resultats] KuhnResultatsData absent — charger data.js avant app.js');
    return;
  }
  const {
    YEARS, SAS, DIV, EBITDA_PCT, MARGE_OP_PCT, KSA_MGM,
    FIL_RAW, FILIALES, ENT_LIST, GROUPE, COMPET
  } = D;

/* ============================ HELPERS ============================ */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
const EXP_YEARS=[2016,2017,2018,2019,2020,2021,2022,2023,2024];
let curYear=2024;
const M=v=>v/1e6;
function fmtM(v,dec=1){if(v==null||isNaN(v))return "—";return (M(v)).toLocaleString('fr-FR',{minimumFractionDigits:dec,maximumFractionDigits:dec})+" M€";}
function fmtMd(v){if(v==null)return "—";return v.toLocaleString('fr-FR',{minimumFractionDigits:1,maximumFractionDigits:1});}
function fmtPct(v,dec=1){if(v==null||isNaN(v))return "—";return v.toLocaleString('fr-FR',{minimumFractionDigits:dec,maximumFractionDigits:dec})+" %";}
// value added & purchases (estimés)
function va(y){return SAS.ebeEst[y]+SAS.sal[y]+SAS.cs[y];}
function conso(y){return SAS.prod[y]-va(y);}
function treso(y){return SAS.dispo[y]+SAS.vmp[y];}
function ebitdaPct(y){return EBITDA_PCT[y]!=null?EBITDA_PCT[y]:SAS.ebePct[y];}
function netPct(y){return SAS.rnet[y]/SAS.ca[y]*100;}
function filSum(y){const rows=FILIALES[y]||[];return rows.reduce((s,r)=>s+(r.ca||0),0);}
/* ============================ COUNTERS ============================ */
function animNum(el,to,fmt){
  if(reducedMotion){el.textContent=fmt(to);return;}
  const from=parseFloat(el.dataset._cur||"0")||0;el.dataset._cur=to;
  const t0=performance.now(),dur=900;
  function tick(t){const k=Math.min(1,(t-t0)/dur);const e=1-Math.pow(1-k,3);
    el.textContent=fmt(from+(to-from)*e);if(k<1)requestAnimationFrame(tick);}
  requestAnimationFrame(tick);
}

/* ============================ EXPERIENCE RENDER ============================ */
function renderExperience(y){
  const set=(sel,to,fmt)=>{$$('[data-stat="'+sel+'"]').forEach(el=>animNum(el,to,fmt));};
  $$('[data-stat="year"]').forEach(el=>el.textContent=y);
  set('ca',SAS.ca[y],v=>fmtM(v));
  set('caProse',SAS.ca[y],v=>fmtM(v,0));
  set('fournDisp',SAS.ca[y]-va(y),v=>fmtM(v));
  set('va',va(y),v=>fmtM(v));
  set('perso',SAS.sal[y]+SAS.cs[y],v=>fmtM(v));
  set('reprises',SAS.reprises[y],v=>fmtM(v));
  set('dot',SAS.dotAct[y]+SAS.dotRC[y],v=>fmtM(v));
  set('amort',SAS.amort[y],v=>fmtM(v));
  set('treso',treso(y),v=>fmtM(v));
  set('rnet',SAS.rnet[y],v=>fmtM(v));
  set('filca',filSum(y),v=>fmtM(v,0));
  // divergence
  const eb=ebitdaPct(y),np=netPct(y);
  $$('[data-stat="ebitdaPctTxt"]').forEach(e=>animNum(e,eb,v=>fmtPct(v)));
  $$('[data-stat="netPctTxt"]').forEach(e=>animNum(e,np,v=>fmtPct(v)));
  const mx=Math.max(eb,np,10);const BARMAX=150;
  const be=$('[data-bar="ebitda"]'),bn=$('[data-bar="net"]');
  if(be)be.style.height=(eb/mx*BARMAX)+'px';
  if(bn)bn.style.height=(np/mx*BARMAX)+'px';
  // commentaire dynamique selon l'année : qui dépasse qui, et pourquoi
  const note=$('[data-stat="divergeNote"]');
  if(note){const ebt=fmtPct(eb),npt=fmtPct(np);
    if(np-eb>0.4)note.innerHTML=`Cette année, le <b style="color:var(--green)">résultat net (${npt})</b> dépasse même la <b style="color:var(--bad)">marge brute (${ebt})</b> : l'EBITDA ne mesure que la trésorerie de l'exploitation, alors que le résultat net est <b>rehaussé</b> par les reprises de provisions et le résultat financier. Le bénéfice « tient » donc mieux que l'activité réelle.`;
    else if(eb-np>0.4)note.innerHTML=`Cette année, la <b style="color:var(--bad)">marge brute (${ebt})</b> dépasse le <b style="color:var(--green)">résultat net (${npt})</b> : l'exploitation dégageait alors plus de trésorerie que le bénéfice final, une fois retranchés amortissements, dotations et impôts. C'est la lecture « normale » d'un exercice classique.`;
    else note.innerHTML=`Cette année, marge brute (${ebt}) et résultat net (${npt}) sont très proches : les écritures comptables jouent peu, le bénéfice reflète assez fidèlement la trésorerie de l'activité.`;}
  renderFilGrid(y);
  renderBenefit(y);
}
function renderFilGrid(y){
  const g=$('#filGrid');if(!g)return;const rows=(FILIALES[y]||[]).slice().sort((a,b)=>b.ca-a.ca);
  g.innerHTML=rows.map(r=>{const neg=r.rn<0;return `<div class="fil-card"><div class="roof"></div>
    <div class="nm">${r.ent}</div><div class="ca">${fmtM(r.ca,0)}</div>
    <div class="meta"><span>Résultat&nbsp;: <span class="${neg?'rn-neg':'rn-pos'}">${fmtM(r.rn,1)}</span></span>
    ${r.div?'<span>Dividende remonté&nbsp;: '+fmtM(r.div,1)+'</span>':''}</div></div>`;}).join('');
  if(!rows.length)g.innerHTML='<p class="caveat">Données filiales indisponibles pour cet exercice.</p>';
}
function renderBenefit(y){
  const wrap=$('#benefitFlow');if(!wrap)return;const rn=SAS.rnet[y];
  // dividende versé l'année SUIVANTE, sur le résultat de l'exercice y
  let d=DIV[y+1],est=false;const payYear=y+1;
  if(d==null){d=Math.round(rn*0.94);est=true;} // dernier exercice : estimation (comptes N+1 pas encore disponibles)
  const retained=rn-d;const po=d/rn*100;
  $$('[data-stat="payout"]').forEach(e=>e.textContent=fmtPct(po,0));
  wrap.innerHTML=`
    <div class="dest div"><div class="ic">🇨🇭</div><div class="v num">${fmtM(d,1)}</div><div class="nm">Dividende → KUHN Group / Bucher<br>(versé en ${payYear}${est?' · estimé':''})</div></div>
    <div class="dest"><div class="ic">🏦</div><div class="v num" style="color:var(--text)">${fmtM(Math.max(retained,0),1)}</div><div class="nm">Conservé dans l'entreprise<br>(réserves / trésorerie)</div></div>
    <div class="dest"><div class="ic"><svg viewBox="0 0 24 24" width="26" height="26" style="vertical-align:middle" aria-hidden="true"><path d="M6 11h12v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill="rgba(126,107,168,.22)" stroke="#7E6BA8" stroke-width="1.6"/><line x1="5" y1="11" x2="19" y2="11" stroke="#7E6BA8" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="15.6" r="2.3" fill="#E8B23A"/></svg></div><div class="v num" style="color:var(--kuhn-soft)">${fmtM(SAS.provRC[y],0)}</div><div class="nm">Provisions au bilan<br>(coussin de sécurité)</div></div>`;
}

/* cycle wave chart (S5) */
function drawCycle(){
  const svg=$('#cycleSvg');if(!svg)return;const W=760,H=288,padL=66,padR=26,padT=66,padB=42;
  const ys=COMPET.years;const kuhn=COMPET.series[0].ca;
  const vals=ys.map(y=>kuhn[y]);const peakV=Math.max(...vals);
  const mn=1000,mx=1560;
  const px=i=>padL+i*(W-padL-padR)/(ys.length-1);
  const py=v=>H-padB-(v-mn)/(mx-mn)*(H-padT-padB);
  let grid='';[1100,1300,1500].forEach(t=>{const y=py(t);
    grid+=`<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="rgba(255,255,255,.09)"/>`+
    `<text x="${padL-9}" y="${y+4}" text-anchor="end" fill="#7d8b98" font-size="11" font-family="Segoe UI">${t.toLocaleString('fr-FR')}</text>`;});
  let path='';ys.forEach((y,i)=>{const x=px(i),yy=py(kuhn[y]);path+=(i?'L':'M')+x+' '+yy+' ';});
  const area=path+`L${px(ys.length-1)} ${H-padB} L${px(0)} ${H-padB} Z`;
  let dots='';ys.forEach((y,i)=>{const x=px(i),yy=py(kuhn[y]);const peak=kuhn[y]===peakV;const last=i===ys.length-1;
    dots+=`<circle cx="${x}" cy="${yy}" r="${peak?7:5}" fill="${peak?'#E8B23A':'#E10E2B'}"/>`+
    `<text x="${x}" y="${H-16}" text-anchor="middle" fill="#7d8b98" font-size="12" font-family="Segoe UI">${y}</text>`+
    `<text x="${x}" y="${yy-13}" text-anchor="middle" fill="${peak?'#E8B23A':'#cdd6df'}" font-family="Bahnschrift,sans-serif" font-size="13">${kuhn[y].toLocaleString('fr-FR')}</text>`+
    (peak?`<text x="${x}" y="${yy+26}" text-anchor="middle" fill="#E8B23A" font-size="12" font-family="Segoe UI" font-weight="700">SOMMET</text>`:'')+
    (last?`<text x="${x}" y="${yy+24}" text-anchor="middle" fill="#E76A4B" font-size="12" font-family="Segoe UI" font-weight="700">CREUX</text>`:'');});
  svg.innerHTML=`<defs><linearGradient id="wg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#E10E2B" stop-opacity=".34"/><stop offset="1" stop-color="#E10E2B" stop-opacity="0"/></linearGradient></defs>
   <text x="${padL}" y="20" fill="#F2ECDD" font-family="Bahnschrift,sans-serif" font-size="15">Chiffre d'affaires du KUHN Group · en millions d'euros</text>
   <text x="${padL}" y="36" fill="#8b97a3" font-family="Segoe UI" font-size="11.5">Groupe mondial consolidé (toutes filiales). Chaque point = le CA d'une année.</text>
   ${grid}<path d="${area}" fill="url(#wg)"/><path d="${path}" fill="none" stroke="#E10E2B" stroke-width="3"/>${dots}`;
}

/* ============================ ANALYSIS CHARTS ============================ */
const SVGNS="http://www.w3.org/2000/svg";
function el(tag,attrs,txt){const e=document.createElementNS(SVGNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(txt!=null)e.textContent=txt;return e;}
function axes(svg,W,H,pad){
  svg.appendChild(el('line',{x1:pad.l,y1:H-pad.b,x2:W-pad.r,y2:H-pad.b,stroke:'#d9d3c4','stroke-width':1.5}));
}
function gridY(svg,W,pad,ticks,scale,fmt){
  ticks.forEach(t=>{const y=scale(t);
    svg.appendChild(el('line',{x1:pad.l,y1:y,x2:W-pad.r,y2:y,stroke:'#eee7d6','stroke-width':1}));
    svg.appendChild(el('text',{x:pad.l-8,y:y+4,'text-anchor':'end','font-size':11,fill:'#8a8472'},fmt(t)));});
}
function clearSvg(s){while(s.firstChild)s.removeChild(s.firstChild);}

function barLineChart(id,opts){
  const svg=$(id);if(!svg)return;clearSvg(svg);
  const W=opts.W||520,H=opts.H||300,pad={l:48,r:opts.r||16,t:18,b:34};
  const ys=opts.years;const n=ys.length;
  const innerW=W-pad.l-pad.r;const bw=innerW/n;
  const maxBar=opts.maxBar;const sy=v=>H-pad.b-(v/maxBar)*(H-pad.t-pad.b);
  axes(svg,W,H,pad);
  const ticks=[];for(let i=0;i<=4;i++)ticks.push(maxBar*i/4);
  gridY(svg,W,pad,ticks,sy,v=>Math.round(v));
  // bars (can be 1 or 2 series)
  ys.forEach((y,i)=>{
    const cx=pad.l+bw*i+bw/2;
    opts.bars.forEach((b,bi)=>{
      const v=b.data[y];if(v==null)return;
      const groupW=bw*0.62, each=groupW/opts.bars.length;
      const x=cx-groupW/2+bi*each;
      const hh=H-pad.b-sy(v);
      const rect=el('rect',{x:x,y:sy(v),width:each-3,height:Math.max(0,hh),rx:3,fill:b.color});
      rect.appendChild(el('title',{},b.label+' '+y+' : '+(b.fmt?b.fmt(v):v)));
      svg.appendChild(rect);
    });
    svg.appendChild(el('text',{x:cx,y:H-pad.b+16,'text-anchor':'middle','font-size':11,fill:'#8a8472'},(""+y).slice(2)));
  });
  // lines (right axis %)
  if(opts.lines){
    const maxL=opts.maxLine;const sl=v=>H-pad.b-(v/maxL)*(H-pad.t-pad.b);
    opts.lines.forEach(ln=>{
      let d='';let first=true;
      ys.forEach((y,i)=>{const v=ln.data[y];if(v==null){return;}const cx=pad.l+bw*i+bw/2;const yy=sl(v);
        d+=(first?'M':'L')+cx+' '+yy+' ';first=false;
        const c=el('circle',{cx:cx,cy:yy,r:4,fill:ln.color});c.appendChild(el('title',{},ln.label+' '+y+' : '+(ln.fmt?ln.fmt(v):v)));svg.appendChild(c);});
      svg.insertBefore(el('path',{d:d,fill:'none',stroke:ln.color,'stroke-width':2.5,'stroke-dasharray':ln.dash||''}),svg.firstChild);
    });
  }
}

function drawCaRn(){
  const ys=YEARS;
  barLineChart('#chCaRn',{years:ys,maxBar:1000,
    bars:[{label:'CA',color:'#E8B23A',data:mapM(SAS.ca),fmt:v=>v.toFixed(0)+' M€'},
          {label:'Rés. net',color:'#C20A2A',data:mapM(SAS.rnet),fmt:v=>v.toFixed(0)+' M€'}]});
}
function mapM(o){const r={};YEARS.forEach(y=>r[y]=M(o[y]));return r;}
function drawMargins(){
  const ys=[2018,2019,2020,2021,2022,2023,2024];
  const op={},eb={},ee={};
  ys.forEach(y=>{op[y]=MARGE_OP_PCT[y]!=null?MARGE_OP_PCT[y]:(SAS.rexpl[y]/SAS.ca[y]*100);
    eb[y]=EBITDA_PCT[y]!=null?EBITDA_PCT[y]:null;ee[y]=SAS.ebePct[y];});
  const svg=$('#chMargins');clearSvg(svg);const W=520,H=300,pad={l:40,r:16,t:18,b:34};
  const maxL=14;const n=ys.length;const innerW=W-pad.l-pad.r;
  const px=i=>pad.l+innerW*i/(n-1);const py=v=>H-pad.b-(v/maxL)*(H-pad.t-pad.b);
  axes(svg,W,H,pad);const ticks=[0,3.5,7,10.5,14];gridY(svg,W,pad,ticks,py,v=>v+'%');
  const lines=[{d:op,c:'#C20A2A',l:'Marge opérationnelle'},{d:eb,c:'#E76A4B',l:'EBITDA Pappers'},{d:ee,c:'#5C6B7A',l:'EBE estimé'}];
  ys.forEach((y,i)=>svg.appendChild(el('text',{x:px(i),y:H-pad.b+16,'text-anchor':'middle','font-size':11,fill:'#8a8472'},(""+y).slice(2))));
  lines.forEach(L=>{let d='';let first=true;ys.forEach((y,i)=>{const v=L.d[y];if(v==null)return;const x=px(i),yy=py(v);d+=(first?'M':'L')+x+' '+yy+' ';first=false;const c=el('circle',{cx:x,cy:yy,r:4,fill:L.c});c.appendChild(el('title',{},L.l+' '+y+' : '+v.toFixed(1)+'%'));svg.appendChild(c);});
    svg.insertBefore(el('path',{d:d,fill:'none',stroke:L.c,'stroke-width':2.5}),svg.firstChild);});
}
function drawProv(){
  const ys=YEARS;
  barLineChart('#chProv',{years:ys,maxBar:90,
    bars:[{label:'Reprises+transferts',color:'#5E8A28',data:mapM(SAS.reprises),fmt:v=>v.toFixed(0)+' M€'},
          {label:'Dotations',color:'#E76A4B',data:mapM(addO(SAS.dotAct,SAS.dotRC)),fmt:v=>v.toFixed(0)+' M€'}]});
}
function addO(a,b){const r={};YEARS.forEach(y=>r[y]=a[y]+b[y]);return r;}
function drawTreso(){
  const ys=YEARS;
  barLineChart('#chTreso',{years:ys,maxBar:240,
    bars:[{label:'Trésorerie',color:'#E8B23A',data:mapM(addO(SAS.dispo,SAS.vmp)),fmt:v=>v.toFixed(0)+' M€'},
          {label:'Capitaux propres',color:'#4a6b8a',data:mapM(SAS.cp),fmt:v=>v.toFixed(0)+' M€'}]});
}
function drawProvStock(){
  barLineChart('#chProvStock',{years:YEARS,maxBar:44,
    bars:[{label:'Provisions au bilan',color:'#7E6BA8',data:mapM(SAS.provRC),fmt:v=>v.toFixed(0)+' M€'}]});
}
function drawDiv(){
  const ys=[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
  const dv={},base={},rate={};
  ys.forEach(y=>{dv[y]=M(DIV[y]);base[y]=M(SAS.rnet[y-1]);rate[y]=DIV[y]/SAS.rnet[y-1]*100;});
  barLineChart('#chDiv',{years:ys,W:1040,maxBar:70,maxLine:120,r:40,
    bars:[{label:'Dividende versé',color:'#E8B23A',data:dv,fmt:v=>v.toFixed(0)+' M€'},
          {label:'Résultat net N-1',color:'#C20A2A',data:base,fmt:v=>v.toFixed(0)+' M€'}],
    lines:[{label:'Taux distribution',color:'#1A1E24',data:rate,fmt:v=>v.toFixed(0)+'%'}]});
  // right axis labels
  const svg=$('#chDiv');const H=300,pad={t:18,b:34};const sl=v=>H-pad.b-(v/120)*(H-pad.t-pad.b);
  [0,30,60,90,120].forEach(t=>svg.appendChild(el('text',{x:1040-32,y:sl(t)+4,'text-anchor':'start','font-size':11,fill:'#8a8472'},t+'%')));
}

/* competitor indexed chart */
function drawCompo(){
  const svg=$('#chCompo');clearSvg(svg);const W=1040,H=340,pad={l:46,r:120,t:20,b:36};
  const ys=COMPET.years;const n=ys.length;const innerW=W-pad.l-pad.r;
  const px=i=>pad.l+innerW*i/(n-1);
  const maxV=110,minV=60;const py=v=>H-pad.b-((v-minV)/(maxV-minV))*(H-pad.t-pad.b);
  axes(svg,W,H,pad);[60,70,80,90,100,110].forEach(t=>{svg.appendChild(el('line',{x1:pad.l,y1:py(t),x2:W-pad.r,y2:py(t),stroke:'#eee7d6'}));svg.appendChild(el('text',{x:pad.l-8,y:py(t)+4,'text-anchor':'end','font-size':11,fill:'#8a8472'},t));});
  ys.forEach((y,i)=>svg.appendChild(el('text',{x:px(i),y:H-pad.b+18,'text-anchor':'middle','font-size':12,fill:'#8a8472'},y)));
  svg.appendChild(el('text',{x:pad.l,y:14,'font-size':11,fill:'#8a8472'},'Indice 100 = pic de CA de chaque groupe'));
  const leg=$('#compoLegend');leg.innerHTML='';
  COMPET.series.forEach(s=>{
    const peak=Math.max(...ys.map(y=>s.ca[y]||0));
    let d='';let first=true;
    ys.forEach((y,i)=>{const v=s.ca[y];if(v==null){return;}const idx=v/peak*100;const x=px(i),yy=py(idx);
      d+=(first?'M':'L')+x+' '+yy+' ';first=false;
      const c=el('circle',{cx:x,cy:yy,r:4,fill:s.color});c.appendChild(el('title',{},s.name+' '+y+' : indice '+idx.toFixed(0)+' ('+ (s.unit==='M€'?v+' M€':v+' Md$') +')'));svg.appendChild(c);});
    svg.insertBefore(el('path',{d:d,fill:'none',stroke:s.color,'stroke-width':s.name==='KUHN Group'?3.5:2.2}),svg.firstChild);
    leg.insertAdjacentHTML('beforeend',`<span><i style="background:${s.color}"></i>${s.name}</span>`);
  });
}
function fillCompTable(){
  const t=$('#compTable');const ys=COMPET.years;
  let head='<thead><tr><th>Groupe</th>'+ys.map(y=>'<th>'+y+'</th>').join('')+'</tr></thead>';
  let body='<tbody>';
  COMPET.series.forEach(s=>{
    body+='<tr><td>'+s.name+' · CA ('+s.unit+')</td>'+ys.map(y=>'<td>'+(s.ca[y]!=null?(s.unit==='M€'?s.ca[y]:fmtMd(s.ca[y])):'—')+'</td>').join('')+'</tr>';
    body+='<tr><td style="color:#8a8472">↳ marge op./EBIT</td>'+ys.map(y=>'<td style="color:#8a8472">'+(s.marg[y]!=null?s.marg[y].toFixed(1)+' %':'—')+'</td>').join('')+'</tr>';
  });
  t.innerHTML=head+body+'</tbody>';
}

/* sankey-ish flux */
function drawSankey(y){
  const svg=$('#sankey');clearSvg(svg);const W=1040,H=300;
  const g=GROUPE[y];$('#sankeyYear').textContent=y;
  if(!g){svg.appendChild(el('text',{x:W/2,y:H/2,'text-anchor':'middle',fill:'#8a8472'},'Données de flux indisponibles pour cet exercice.'));return;}
  const filDiv=(FILIALES[y]||[]).reduce((s,r)=>s+(r.div||0),0);
  const filPret=(FILIALES[y]||[]).reduce((s,r)=>s+(r.pret||0),0);
  const cx={bucher:175,sas:520,fil:865};
  // node boxes
  function box(x,label,col){svg.appendChild(el('rect',{x:x-95,y:120,width:190,height:60,rx:10,fill:col,stroke:'#d9d3c4'}));svg.appendChild(el('text',{x:x,y:155,'text-anchor':'middle','font-family':'Bahnschrift','font-size':15,fill:'#1A1E24'},label));}
  // flows: SAS->Bucher dividendes (up-left), Fil->SAS dividendes (left), SAS->Fil prets (right)
  function flow(x1,x2,val,maxVal,color,label,grow){
    const w=Math.max(3,val/maxVal*32);const mid=(x1+x2)/2;const dir=x2>x1?1:-1;const ahx=13;const Yc=150;
    // une seule flèche dans le couloir = centrée ; deux = l'une monte, l'autre descend (plus de chevauchement)
    const y=grow==='up'?Yc-2-w/2:grow==='down'?Yc+2+w/2:Yc;
    const p=el('path',{d:`M${x1} ${y} L${x2-dir*ahx} ${y}`,stroke:color,'stroke-width':w,fill:'none',opacity:.5});
    p.appendChild(el('title',{},label+' : '+fmtM(val,1)));svg.appendChild(p);
    const tri=el('polygon',{points:`${x2} ${y} ${x2-dir*ahx} ${y-(w/2+3)} ${x2-dir*ahx} ${y+(w/2+3)}`,fill:color,opacity:.82});
    tri.appendChild(el('title',{},label+' : '+fmtM(val,1)));svg.appendChild(tri);
    svg.appendChild(el('text',{x:mid,y:grow==='down'?y+w/2+13:y-w/2-7,'text-anchor':'middle','font-size':12,fill:'#5c6470'},fmtM(val,0)));
  }
  const maxV=Math.max(g.divVerses,filDiv,filPret||0,1);
  flow(cx.sas-95,cx.bucher+95,g.divVerses,maxV,'#E8B23A','Dividendes SAS → Groupe/Bucher','center');
  if(filDiv&&filPret){
    flow(cx.fil-95,cx.sas+95,filDiv,maxV,'#5E8A28','Dividendes filiales → SAS','up');
    flow(cx.sas+95,cx.fil-95,filPret,maxV,'#C20A2A','Prêts SAS → filiales (trésorerie mutualisée)','down');
  }else if(filDiv){
    flow(cx.fil-95,cx.sas+95,filDiv,maxV,'#5E8A28','Dividendes filiales → SAS','center');
  }else if(filPret){
    flow(cx.sas+95,cx.fil-95,filPret,maxV,'#C20A2A','Prêts SAS → filiales (trésorerie mutualisée)','center');
  }
  box(cx.bucher,'BUCHER / Group','#fdf6e6');box(cx.sas,'KUHN SAS','#fff');box(cx.fil,'Filiales','#fff');
  svg.appendChild(el('text',{x:cx.bucher,y:204,'text-anchor':'middle','font-size':12,fill:'#8a8472'},'reçoit '+fmtM(g.divVerses,0)));
}


function drawAnalysisCharts() {
  drawCaRn();
  drawMargins();
  drawProv();
  drawProvStock();
  drawTreso();
  drawDiv();
  drawCompo();
  fillCompTable();
}

/* euro decomposition + provisions tool */
function renderTools(y){
  const de=$('#decompYear'),pr=$('#provYear'),ed=$('#euroDecomp'),el=$('#euroLegend');
  if(!de||!pr||!ed||!el)return;
  de.textContent=y;pr.textContent=y;
  const prod=SAS.prod[y];const cn=conso(y),perso=SAS.sal[y]+SAS.cs[y],amo=SAS.amort[y];
const rest=Math.max(0,prod-cn-perso-amo);
  const segs=[
   {l:'Achats & charges externes',v:cn,c:'#5C6B7A'},
   {l:'Salaires & charges',v:perso,c:'#C20A2A'},
   {l:'Amortissements',v:amo,c:'#8a76a0'},
   {l:'Reste (résultat, impôts, financier)',v:rest,c:'#E8B23A'}
  ];
  const tot=segs.reduce((s,x)=>s+x.v,0);
  ed.innerHTML=segs.map(s=>{const p=s.v/tot*100;const lbl=p>=7?p.toFixed(0)+' %':'';
    return `<div class="seg" style="width:${p}%;background:${s.c}" title="${s.l} : ${fmtM(s.v,0)} (${p.toFixed(0)} %)">${lbl}</div>`;}).join('');
  el.innerHTML=segs.map(s=>{const p=(s.v/tot*100).toFixed(0);
    return `<div><i style="background:${s.c}"></i><span class="nm">${s.l}</span><span class="val">${fmtM(s.v,0)}<span class="pct">(${p}&nbsp;%)</span></span></div>`;}).join('');
  updateProv(y);
  renderPerimeters(y);
}
// Les trois périmètres du CA, calés sur l'exercice sélectionné (n.d. quand la donnée publique n'existe pas)
function renderPerimeters(y){
  const setBig=(el,txt,nd)=>{if(!el)return;el.textContent=txt;el.classList.toggle('nd',!!nd);};
  const grp=COMPET.series[0].ca[y];        // KUHN Group consolidé (communication groupe, 2021→)
  const ksa=KSA_MGM[y];                     // KSA-MGM opérationnel net de l'interne (2024 seul publié)
  setBig($('#periGroup'),grp!=null?grp.toLocaleString('fr-FR')+' M€':'n.d. pour cet exercice',grp==null);
  setBig($('#periSas'),SAS.ca[y]!=null?fmtM(SAS.ca[y],0):'n.d. pour cet exercice',SAS.ca[y]==null);
  setBig($('#periKsa'),ksa!=null?ksa.toLocaleString('fr-FR')+' M€':'n.d. pour cet exercice',ksa==null);
}
function updateProv(y){
  const rn=SAS.rnet[y];const net=SAS.reprises[y]-(SAS.dotAct[y]+SAS.dotRC[y]);
  $('#provPublished').textContent=fmtM(rn,1);
  $('#provAdjusted').textContent=fmtM(rn-net,1);
  $('#provEffect').textContent=(net>=0?'+':'')+fmtM(net,1);
}

/* filiale table */
let tblEnt='Toutes',tblYear='Toutes';
function renderFilTable(){
  const t=$('#filTable');
  const rows=FIL_RAW.filter(r=>(tblEnt==='Toutes'||r[0]===tblEnt)&&(tblYear==='Toutes'||r[1]===tblYear));
  let head='<thead><tr><th>Filiale</th><th>Exercice</th><th>CA</th><th>Rés. net</th><th>Fonds propres</th><th>Prêt reçu SAS</th><th>Div. → SAS</th></tr></thead>';
  let body='<tbody>';
  rows.sort((a,b)=>a[0]===b[0]?a[1]-b[1]:a[0].localeCompare(b[0]));
  rows.forEach(r=>{const neg=r[3]<0;body+=`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${fmtM(r[2],1)}</td>
    <td class="${neg?'neg':'pos'}">${fmtM(r[3],1)}</td><td>${r[4]!=null?fmtM(r[4],1):'—'}</td>
    <td>${r[6]!=null?fmtM(r[6],1):'—'}</td><td>${r[7]!=null?fmtM(r[7],1):'—'}</td></tr>`;});
  // totals
  const sum=k=>rows.reduce((s,r)=>s+(r[k]||0),0);
  let foot=`<tfoot><tr><td>Total filtré</td><td></td><td>${fmtM(sum(2),0)}</td><td>${fmtM(sum(3),0)}</td><td></td><td>${fmtM(sum(6),0)}</td><td>${fmtM(sum(7),0)}</td></tr></tfoot>`;
  t.innerHTML=head+body+'</tbody>'+foot;
}
// Après filtrage : recaler la vue sur le tableau (sous l'en-tête + filterbar sticky).
function docTop(el){let y=0;while(el){y+=el.offsetTop;el=el.offsetParent;}return y;}
function syncFilScrollMargin(){
  const hdr=document.querySelector('header.bar');
  const bar=document.querySelector('#sec-filiales .filterbar');
  if(!hdr)return;
  const top=hdr.offsetHeight+4+(bar?bar.offsetHeight:0)+8;
  document.documentElement.style.setProperty('--fil-table-scroll-margin',top+'px');
}
function scrollToFilTable(){
  const wrap=$('#filTableWrap');
  if(!wrap)return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    syncBarH();
    const stick=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fil-table-scroll-margin'))||72;
    const target=docTop(wrap)-stick;
    const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    window.scrollTo({top:Math.min(Math.max(0,target),max),behavior:reducedMotion?'auto':'smooth'});
  }));
}
function applyFilFilter(ent,year){
  tblEnt=ent;tblYear=year;
  renderFilTable();
  scrollToFilTable();
}

/* ============================ UI WIRING ============================ */
function refreshChrome() {
  syncBarH();
  layoutChrome();
  fitHeader();
}

function mountChipButtons(container, items, initial, onSelect) {
  if (!container) return;
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'chipbtn';
    btn.textContent = item.label;
    btn.setAttribute('aria-pressed', item.value === initial);
    btn.onclick = () => {
      container.querySelectorAll('.chipbtn').forEach(b => b.setAttribute('aria-pressed', b === btn));
      onSelect(item.value);
    };
    container.appendChild(btn);
  });
}


// Calibre le chrome fixe sur la colonne .book-page (hugo-book) ; sans effet hors intégration.
function layoutChrome(){
  const page=document.querySelector('.book-page');
  const root=document.documentElement;
  if(!page||!page.querySelector('.kuhn-resultats')){root.style.removeProperty('--full-width-post-chrome-left');root.style.removeProperty('--full-width-post-chrome-width');return;}
  const r=page.getBoundingClientRect();
  root.style.setProperty('--full-width-post-chrome-left',r.left+'px');
  root.style.setProperty('--full-width-post-chrome-width',r.width+'px');
}
function chromeBox(){
  const s=getComputedStyle(document.documentElement);
  const l=parseFloat(s.getPropertyValue('--full-width-post-chrome-left'))||0;
  const w=parseFloat(s.getPropertyValue('--full-width-post-chrome-width'))||innerWidth;
  return{l,w,r:l+w};
}
// bascule l'en-tête en menu déroulant si les boutons d'année débordent (dynamique : robuste à l'ajout d'années)
function fitHeader(){
  const bar=document.querySelector('header.bar');if(!bar)return;
  const tog=bar.querySelector('.modetog');if(!tog)return;
  bar.classList.remove('compact');                       // on repart en mode "boutons d'année"
  // mesure directe : si le bouton de mode (le plus à droite) déborde, on bascule en menu déroulant
  const page=document.querySelector('.book-page');
  const right=page?page.getBoundingClientRect().right:innerWidth;
  if(tog.getBoundingClientRect().right>right-6)bar.classList.add('compact');
  // centre le toggle uniquement s'il s'est retrouvé seul sur la ligne du dessous (sous le sélecteur d'année)
  const yw=bar.querySelector('.yearwrap');
  tog.classList.toggle('alone',!!yw && tog.offsetTop>yw.offsetTop+4);
}
function syncBarH(){
  const b=document.querySelector('header.bar');
  if(b)document.documentElement.style.setProperty('--bar-h',b.offsetHeight+'px');
  syncFilScrollMargin();
}
function buildYearControls(){
  const box=$('#years'),sel=$('#yearsel');
  if(!box||!sel)return;
  EXP_YEARS.forEach(y=>{
    const b=document.createElement('button');b.textContent=y;b.setAttribute('aria-pressed',y===curYear);
    b.onclick=()=>setYear(y);box.appendChild(b);
    const o=document.createElement('option');o.value=y;o.textContent='Exercice '+y;if(y===curYear)o.selected=true;sel.appendChild(o);
  });
  sel.onchange=e=>setYear(+e.target.value);
  mountChipButtons($('#anaEnt'), ['Toutes', ...ENT_LIST].map(e => ({ value: e, label: e })), tblEnt, ent => applyFilFilter(ent, tblYear));
  const filYears = [...new Set(FIL_RAW.map(r => r[1]))].sort((a, b) => a - b);
  mountChipButtons($('#anaTableYears'), [{ value: 'Toutes', label: 'Toutes' }, ...filYears.map(y => ({ value: y, label: y }))], tblYear, year => applyFilFilter(tblEnt, year));
}
function setYear(y){
  curYear=y;
  $$('#years button').forEach(b=>b.setAttribute('aria-pressed',+b.textContent===y));
  $('#yearsel').value=y;
  renderExperience(y);
  renderTools(y);
  drawSankey(y);
}
function showAnalysis(on){
  document.body.classList.toggle('show-analysis',on);
  document.body.classList.toggle('experience-hidden',on);
  // chrome hugo-book : sombre en Expérience, clair (natif) en Analyse
  document.documentElement.classList.toggle('kuhn-resultats-dark-chrome',!on&&document.documentElement.classList.contains('full-width-post-expanded'));
  $('#btnExp').setAttribute('aria-pressed',!on);
  $('#btnAna').setAttribute('aria-pressed',on);
  if(on){window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'});}
}

/* scroll engine: reveals + parallax + rail */
let scrollRailRefresh = null;

function initScroll(){
  const scenes=$$('.scene');
  // hero visible immediately (it's above the fold)
  const s0=$('#s0');if(s0)s0.classList.add('in-view');
  // fallback: no IntersectionObserver -> reveal everything
  if(!('IntersectionObserver' in window)){scenes.forEach(s=>s.classList.add('in-view'));drawCycle();return;}
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');
    if(e.target.id==='s5')drawCycle();
    // re-trigger counters for stats inside this scene
    renderExperience(curYear);
  }});},{threshold:.28});
  scenes.forEach(s=>io.observe(s));
  // parallax + rail + active step + jalons
  const rail=$('#rail'),grain=$('#grain'),railLabel=$('#railLabel');
  const mobTxt=$('#mobStepTxt'),mobProg=$('#mobStepProg');
  const exp=$('#experience');const layers=$$('.player');
  const hit=$('#railHit');
  if(!rail||!grain||!railLabel||!exp||!hit)return;
  rail.classList.add('live');
  const DEFAULT_STEP='Le voyage d\'un euro';
  // géométrie du rail : démarre sous l'en-tête (+ bandeau d'étape) pour ne jamais passer derrière, sur mobile comme desktop
  function railGeom(){const vh=innerHeight;const hdr=document.querySelector('header.bar'),ms=$('#mobStep');
    const hb=(hdr?hdr.offsetHeight:0)+((ms&&getComputedStyle(ms).display!=='none')?ms.offsetHeight:0)+12;
    const top=Math.max(vh*0.14,hb),bot=vh*0.14;return{top,h:vh-top-bot};}
  function layoutRail(){const g=railGeom(),tr=rail.querySelector('.track'),hit=$('#railHit');
    [tr,hit].forEach(e=>{if(e){e.style.top=g.top+'px';e.style.bottom='auto';e.style.height=g.h+'px';}});}
  let marks=[];
  function buildMarks(){
    marks.forEach(m=>m.el.remove());marks=[];
    const eh=exp.offsetHeight,vh=innerHeight;
    scenes.forEach(s=>{const f=Math.min(1,Math.max(0,(s.offsetTop+s.offsetHeight/2-vh/2)/(eh-vh)));
      const el=document.createElement('div');el.className='mark';rail.appendChild(el);marks.push({el,f});});
  }
  function activeStepLabel(vh){
    let best=Infinity,act=null;
    scenes.forEach(s=>{const r=s.getBoundingClientRect();const d=Math.abs((r.top+r.height/2)-vh/2);if(d<best){best=d;act=s;}});
    const st=act&&act.querySelector('.scene-step');
    return st&&st.textContent.trim()?st.textContent.trim():DEFAULT_STEP;
  }
  function chooseMode(){
    // label dans la marge uniquement s'il y a la place À GAUCHE du rail ; sinon barre d'étape en haut
    const page=document.querySelector('.book-page');
    const cw=page?page.clientWidth:innerWidth;
    const railLeft=rail.getBoundingClientRect().left;
    const useRail=cw>860 && railLeft>=210;
    document.body.classList.toggle('railmode',useRail);
    document.body.classList.toggle('topbarmode',!useRail);
  }
  function onScroll(){
    const vh=innerHeight;
    if(!reducedMotion){layers.forEach(l=>{const r=l.getBoundingClientRect();const c=(r.top+r.height/2-vh/2)/vh;
      l.style.transform='translateY('+(c*(parseFloat(l.dataset.depth)||0)*-120)+'px)';});}
    const er=exp.getBoundingClientRect();
    const prog=Math.min(1,Math.max(0,(-er.top)/(er.height-vh)));
    const {top:trackTop,h:trackH}=railGeom();
    let gCenter=trackTop+prog*trackH;
    gCenter=Math.max(trackTop+11,Math.min(trackTop+trackH-11,gCenter)); // la pièce reste dans la piste
    grain.style.top=(gCenter-11)+'px';
    const hh=document.getElementById('railHit');if(hh)hh.setAttribute('aria-valuenow',Math.round(prog*100));
    railLabel.style.top=gCenter+'px';
    marks.forEach(m=>{m.el.style.top=(trackTop+m.f*trackH)+'px';m.el.classList.toggle('passed',prog>=m.f-0.004);});
    const lab=activeStepLabel(vh);railLabel.textContent=lab;mobTxt.textContent=lab;
    mobProg.textContent=Math.round(prog*100)+' %';
  }
  // clic n'importe où sur la barre + glissement immédiat (la pièce suit la souris)
  let dragging=false;
  const bounds=()=>{const g=railGeom();return{vh:innerHeight,top:g.top,h:g.h};};
  function jumpTo(cy){const {vh,top,h}=bounds();const f=Math.min(1,Math.max(0,(cy-top)/h));
    window.scrollTo({top:f*(exp.offsetHeight-vh),behavior:'instant'});}
  function followGrain(cy){const {top,h}=bounds();const c=Math.max(top+11,Math.min(top+h-11,cy));
    grain.style.top=(c-11)+'px';railLabel.style.top=c+'px';}
  hit.addEventListener('pointerdown',e=>{dragging=true;rail.classList.add('dragging');
    try{hit.setPointerCapture(e.pointerId);}catch(_){}
    followGrain(e.clientY);jumpTo(e.clientY);e.preventDefault();});
  hit.addEventListener('pointermove',e=>{if(dragging){followGrain(e.clientY);jumpTo(e.clientY);}});
  const endDrag=()=>{dragging=false;rail.classList.remove('dragging');};
  hit.addEventListener('pointerup',endDrag);hit.addEventListener('pointercancel',endDrag);
  hit.addEventListener('lostpointercapture',endDrag);
  hit.addEventListener('keydown',e=>{const d=innerHeight*0.85;
    if(e.key==='ArrowDown'||e.key==='PageDown'||e.key===' '){window.scrollTo({top:scrollY+d,behavior:'instant'});e.preventDefault();}
    if(e.key==='ArrowUp'||e.key==='PageUp'){window.scrollTo({top:scrollY-d,behavior:'instant'});e.preventDefault();}});
  // place le bandeau mobile sous la hauteur réelle de l'en-tête (qui peut passer sur 2 lignes)
  scrollRailRefresh = function refreshRail() { refreshChrome(); layoutRail(); buildMarks(); chooseMode(); onScroll(); };
  scrollRailRefresh();
  const raw=getComputedStyle(document.documentElement).getPropertyValue('--full-width-post-dur').trim();
  const ms=reducedMotion?0:(raw.endsWith('ms')?parseFloat(raw):(parseFloat(raw)||0.65)*1000);
  if (ms) setTimeout(scrollRailRefresh, ms + 60);
  addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});
  addEventListener('resize', () => { scrollRailRefresh(); }, { passive: true });
}

/* ============================ GLOSSAIRE INTERACTIF ============================ */
/* définition vulgarisée + micro-animation, ouvertes à la demande sur un terme-clé */
const GLOSS={
 'valeur-ajoutee':{t:'Valeur ajoutée',
  d:"Ce qui reste des ventes une fois payés les <b>achats</b> (acier, pièces, énergie, sous-traitance) : la richesse réellement créée par l'entreprise, avant même de payer les salariés.",
  scene:`<div class="gx"><div class="gx-ico" style="left:55px;transform:translateX(-50%);top:6px;font-size:16px">💰</div><div class="gx-bar" style="left:42px;width:26px;height:40px;bottom:18px;background:#E8B23A"></div><div class="gx-lab" style="left:55px;transform:translateX(-50%)">Ventes</div><div class="gx-op" style="left:87px;transform:translateX(-50%);bottom:34px">−</div><div class="gx-ico" style="left:119px;transform:translateX(-50%);top:22px;font-size:16px">🚚</div><div class="gx-bar" style="left:106px;width:26px;height:24px;bottom:18px;background:#E76A4B"></div><div class="gx-lab" style="left:119px;transform:translateX(-50%)">Achats</div><div class="gx-op" style="left:151px;transform:translateX(-50%);bottom:34px">=</div><div class="gx-ico" style="left:183px;transform:translateX(-50%);top:16px;font-size:16px">✨</div><div class="gx-bar gx-grow" style="left:170px;width:26px;--h:30px;bottom:18px;background:#5E8A28"></div><div class="gx-lab" style="left:183px;transform:translateX(-50%);color:#5E8A28">Valeur ajoutée</div></div>`},
 'ebitda':{t:'EBITDA',
  d:"L'argent <b>brut</b> que dégage l'activité, avant amortissements, provisions et impôts. C'est l'indicateur le plus proche de l'argent réellement gagné dans l'année.",
  scene:`<div class="gx"><div class="base"></div><div class="gx-ico" style="left:50%;transform:translateX(-50%);bottom:12px">🏭</div><span class="gx-c" style="left:50%;margin-left:-10px;bottom:36px;animation:gxRise 2s ease-in infinite"></span><span class="gx-c" style="left:40%;bottom:36px;animation:gxRise 2s ease-in .6s infinite"></span><span class="gx-c" style="left:60%;bottom:36px;animation:gxRise 2s ease-in 1.2s infinite"></span></div>`},
 'charges':{t:'Charges',
  d:"Tout ce que l'entreprise dépense pour fonctionner : matières, salaires, énergie, amortissements… Les charges se soustraient des ventes pour donner le résultat.",
  scene:`<div class="gx gx--charges"><div class="base"></div><div class="gx-ico" style="left:16px;bottom:12px">🏭</div><span class="gx-c gx-c--out"></span><span class="gx-c gx-c--out" style="animation-delay:.7s"></span><span class="gx-c gx-c--out" style="animation-delay:1.4s"></span><div class="gx-ico" style="right:16px;bottom:12px">🧾</div></div>`},
 'provision':{t:'Provision',
  d:"Une somme mise de côté pour un risque <b>futur</b> (un litige, des stocks invendables, une garantie client). Le bénéfice de l'année baisse, mais l'argent, lui, reste en caisse.",
  scene:`<div class="gx"><div class="gx-jar" style="left:50%;margin-left:-27px"></div><span class="gx-c gx-c--in-jar drop"></span></div>`},
 'dotation':{t:'Dotation',
  d:"L'écriture qui <b>crée ou augmente</b> une provision. C'est une charge : elle réduit le résultat de l'année où on la passe.",
  scene:`<div class="gx"><div class="gx-jar" style="left:50%;margin-left:-27px"></div><span class="gx-c gx-c--in-jar drop"></span><div class="gx-tag neg" style="right:13px;top:13px">résultat ↓</div></div>`},
 'reprise':{t:'Reprise',
  d:"L'inverse de la dotation : on <b>annule</b> une provision devenue inutile. Ça remonte dans le résultat de l'année, sans qu'aucun euro n'entre réellement en caisse.",
  scene:`<div class="gx"><div class="gx-jar" style="left:50%;margin-left:-27px"></div><span class="gx-c gx-c--in-jar rise"></span><div class="gx-tag pos" style="right:13px;top:13px">résultat ↑</div></div>`},
 'amortissement':{t:'Amortissement',
  d:"La répartition du coût d'un <b>équipement de production</b> (machine-outil, presse, robot de soudure…) sur ses années d'usure. Une charge étalée dans le temps, qui ne correspond à aucune sortie d'argent de l'année.",
  scene:`<div class="gx"><div class="base"></div><div class="gx-ico" style="left:16px;bottom:12px">⚙️</div><div class="gx-bar gx-grow" style="left:96px;--h:18px;background:#5C6B7A;animation-delay:.05s"></div><div class="gx-bar gx-grow" style="left:128px;--h:18px;background:#5C6B7A;animation-delay:.35s"></div><div class="gx-bar gx-grow" style="left:160px;--h:18px;background:#5C6B7A;animation-delay:.65s"></div><div class="gx-bar gx-grow" style="left:192px;--h:18px;background:#5C6B7A;animation-delay:.95s"></div><div class="gx-tag" style="right:16px;top:13px;background:#eef0f2;color:#5C6B7A">étalé sur N ans</div></div>`},
 'tresorerie':{t:'Trésorerie',
  d:"L'argent <b>réellement disponible</b> : liquidités en banque et placements. C'est ce qui permet de payer, d'investir et de verser les dividendes.",
  scene:`<div class="gx gx--treso"><div class="base"></div><div class="gx-ico" style="left:50%;transform:translateX(-50%);bottom:34px">🏦</div><span class="gx-c gx-c--pulse"></span><span class="gx-c gx-c--pulse"></span><span class="gx-c gx-c--pulse"></span></div>`},
 'fonds-propres':{t:'Fonds propres',
  d:"Ce que les actionnaires possèdent vraiment dans l'entreprise : le capital de départ plus les bénéfices accumulés et non distribués. C'est une <b>mesure de propriété</b>, pas un tas d'argent disponible (à ne pas confondre avec la trésorerie).",
  scene:`<div class="gx"><div class="gx-blk gx-grow" style="left:46px;margin-left:0;width:56px;--h:18px;bottom:18px;background:linear-gradient(180deg,#ffe1a0,#e0a92f);animation-delay:.05s"></div><div class="gx-blk gx-grow" style="left:46px;margin-left:0;width:56px;--h:14px;bottom:36px;background:linear-gradient(180deg,#fff0c8,#ecc15a);animation-delay:.5s"></div><div class="gx-lab" style="left:74px;transform:translateX(-50%);bottom:2px">capital + bénéfices gardés</div><div class="gx-tag" style="left:155px;transform:translateX(-50%);bottom:24px;background:#efe7d3;color:#7c745f">détenu par ▸</div><div class="gx-ico" style="left:236px;transform:translateX(-50%);bottom:20px;font-size:24px">👤</div><div class="gx-lab" style="left:236px;transform:translateX(-50%);bottom:2px">actionnaires</div></div>`},
 'dividende':{t:'Dividende',
  d:"La part du bénéfice qui <b>sort</b> de l'entreprise pour rémunérer l'actionnaire (ici KUHN Group, puis Bucher en Suisse).",
  scene:`<div class="gx"><div style="position:absolute;left:50%;transform:translateX(-50%);top:24px;bottom:24px;width:0;border-left:2px dotted #e8c98a"></div><div class="gx-ico" style="left:50%;margin-left:-11px;top:3px;font-size:21px">🇨🇭</div><div class="gx-lab" style="left:50%;margin-left:14px;top:8px;bottom:auto;color:#7c745f">Bucher</div><div class="gx-ico" style="left:50%;margin-left:-11px;bottom:6px;font-size:21px">🏭</div><div class="gx-lab" style="left:50%;margin-left:14px;bottom:9px;color:#7c745f">KUHN</div><span class="gx-c" style="left:50%;margin-left:-10px;bottom:30px;animation:gxUp 2.4s ease-in infinite"></span><span class="gx-c" style="left:50%;margin-left:-10px;bottom:30px;animation:gxUp 2.4s ease-in 1.2s infinite"></span></div>`}
};
let curGloss=null;
function openGloss(btn){
  const g=GLOSS[btn.dataset.g];if(!g)return;const pop=$('#glossPop');
  pop.innerHTML='<button class="gp-close" aria-label="Fermer la définition">×</button>'
    +'<div class="gp-t">'+g.t+'</div><div class="gp-d">'+g.d+'</div>'+(g.scene||'');
  pop.classList.remove('below');pop.style.visibility='hidden';pop.classList.add('show');
  const r=btn.getBoundingClientRect(),pw=pop.offsetWidth,ph=pop.offsetHeight;
  const {l,w,r:cr}=chromeBox();
  let left=Math.max(l+8,Math.min(r.left+r.width/2-pw/2,cr-pw-8));
  let top=r.top-ph-12;if(top<8){top=r.bottom+12;pop.classList.add('below');}
  pop.style.left=left+'px';pop.style.top=top+'px';
  pop.style.setProperty('--arrow',(r.left+r.width/2-left)+'px');
  pop.style.visibility='';curGloss=btn;btn.setAttribute('aria-expanded','true');
}
function closeGloss(){const pop=$('#glossPop');if(!pop||!pop.classList.contains('show'))return;
  pop.classList.remove('show');if(curGloss){curGloss.setAttribute('aria-expanded','false');curGloss=null;}}
document.addEventListener('click',e=>{
  const t=e.target.closest('.gloss');
  if(t){e.preventDefault();curGloss===t?closeGloss():openGloss(t);return;}
  if(e.target.closest('.gp-close')){closeGloss();return;}
  if(!e.target.closest('#glossPop'))closeGloss();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeGloss();});
addEventListener('scroll',()=>{if(curGloss)closeGloss();},{passive:true});

/* init */
function kuhnResultatsInit(){
try{
const gp=$('#glossPop');
if(gp&&gp.parentNode!==document.body)document.body.appendChild(gp);
buildYearControls();
renderExperience(curYear);
renderTools(curYear);
renderFilTable();
drawAnalysisCharts();
drawSankey(curYear);
syncBarH();
initScroll();
const bE=$('#btnExp'),bA=$('#btnAna'),gA=$('#goAnalysis'),bB=$('#backToExp');
if(bE)bE.onclick=()=>showAnalysis(false);
if(bA)bA.onclick=()=>showAnalysis(true);
if(gA)gA.onclick=()=>showAnalysis(true);
if(bB)bB.onclick=()=>showAnalysis(false);
refreshChrome();
handleHash();
}catch(err){console.error('[kuhn-resultats]',err);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',kuhnResultatsInit,{once:true});
else kuhnResultatsInit();
addEventListener('load', () => { if (scrollRailRefresh) scrollRailRefresh(); else refreshChrome(); });
addEventListener('resize', refreshChrome, { passive: true });
addEventListener('full-width-post-menu-context', refreshChrome);
// deep-link: #analyse (ou #sec-*) ouvre le dossier détaillé et défile vers la section
function handleHash(){
  const h=location.hash;
  if(h==='#analyse'){showAnalysis(true);return;}
  if(h.startsWith('#sec-')){const t=document.getElementById(h.slice(1));showAnalysis(true);
    if(t)requestAnimationFrame(()=>t.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'}));}
}
// kuhn-resultats-dark-chrome : géré par full-width-post.js (entrée) et showAnalysis() (bascule Expérience/Analyse)
addEventListener('hashchange',handleHash);

})(window.KuhnResultatsData);
