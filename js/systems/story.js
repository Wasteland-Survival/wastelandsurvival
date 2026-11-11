let chap=1,crash=null,stOpen=false;
const PN={bandage:2,cooked:1};
function placeCrash(){crash=null;if(!tw)return;const a0=hash(tw.x,tw.y)*6.283;
 for(let k=0;k<16&&!crash;k++){const a=a0+k*.4;for(let r=56;r>=30&&!crash;r-=4){const x=Math.round(tw.x+Math.cos(a)*r),y=Math.round(tw.y+Math.sin(a)*r);if(x<6||y<6||x>W-6||y>H-6)continue;let ok=1;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(world[(y+dy)*W+x+dx]==2)ok=0;if(ok)crash={x,y}}}
 if(crash){for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)objs.delete((crash.y+dy)*W+crash.x+dx);objs.set(crash.y*W+crash.x,{t:7,hp:999})}}
function story(t,p,o){const b2=$('#stB2');b2.style.display=o?'inline-block':'none';$('#stB').textContent=o?'Noch bleiben':'Weiter';if(o){b2.textContent=o.label;b2.onclick=()=>{stClose();o.fn()}}$('#stT').textContent=t;$('#stP').textContent=p;$('#pSt').classList.add('open');paused=true;stOpen=true}
function stClose(){$('#pSt').classList.remove('open');paused=false;stOpen=false}
$('#stB').onclick=stClose;
addEventListener('keydown',e=>{if(stOpen&&(e.key=='Escape'||e.key=='Enter')){e.stopImmediatePropagation();stClose()}},true);
function crashUse(){if(!crash||(unl.tw|0)<3||Math.hypot(crash.x*T+16-P.x,crash.y*T+16-P.y)>85)return false;const cs=unl.cs|0;
 if(cs==0){unl.cs=1;story('Die Absturzstelle','Der Helikopter liegt rauchend zwischen den Bäumen. Im Cockpit stöhnt der Pilot: „Verbände … und etwas Warmes zu essen … bitte.“ Er braucht 2 Verbände und 1 Gegrilltes Fleisch.');return true}
 if(cs==1){const pp=unl.pp=unl.pp||{};let got=0;for(const k in PN){const n=Math.min(count(k),PN[k]-(pp[k]|0));if(n>0){take(k,n);pp[k]=(pp[k]|0)+n;got+=n}}
  if(Object.keys(PN).every(k=>(pp[k]|0)>=PN[k])){unl.cs=2;add('coat');ui();story('Der Pilot','„Danke. Ohne dich wäre ich erledigt.“ Er drückt dir seinen Fliegermantel in die Hand und ein zerkratztes Funkprotokoll: Kurz vor dem Absturz kam ein Signal aus einem Bunker im Norden, dort lagern Treibstoff und Ersatzteile. „Aber irgendetwas dort unten hat unseren Funk gestört. Sei vorsichtig.“')}
  else flash(got?'Du versorgst den Piloten':'Dir fehlen Verbände oder gegrilltes Fleisch');return true}
 if(unl.fin){story('Abflug','Der Hubschrauber ist startklar. Der Flug ist endgültig: Du kehrst nicht mehr auf diese Insel zurück. Truhen, Lager und Gebäude bleiben hier, dein Inventar und dein Fortschritt kommen mit.',{label:'Jetzt abfliegen',fn:startChapter2});return true}
 if((unl.bs|0)>=1){if(count('fuel')&&count('parts')){take('fuel',1);take('parts',1);unl.fin=1;ui();story('Hubschrauber bereit','Ihr schraubt die Ersatzteile fest und füllt den Tank. Der Rotor springt stotternd an. Plötzlich knistert der Funk: „Hier Basis Süd … wir hören euch. Kommt zu uns.“ Der Pilot nickt: „Wenn wir starten, gibt es kein Zurück auf diese Insel. Pack alles ein, was du brauchst, und sprich mich dann an.“');return true}story('Der Pilot','„Mit Treibstoff und Ersatzteilen bringe ich uns hier raus. Ohne beides sitzen wir fest.“');return true}
 story('Der Pilot','„Ruh dich aus, ich halte hier die Stellung. Such den Bunker im Norden, aber geh nicht unvorbereitet.“');return true}
function crashTick(){if(!crash||(unl.tw|0)<3||unl.ca||Math.hypot(crash.x*T+16-P.x,crash.y*T+16-P.y)>260)return;unl.ca=1;for(let k=0;k<Math.round(3*DF.en);k++)tSpawn();tSpawn(1);flash('Aasfresser umkreisen die Absturzstelle!')}
function crashGoal(){if(!crash)return '';const cs=unl.cs|0,dx=crash.x*T+16-P.x,dy=crash.y*T+16-P.y,ar='→↘↓↙←↖↑↗'[(Math.round(Math.atan2(dy,dx)/.7854)+8)%8];
 if(cs==0)return `<b>Rauch am Horizont</b><br>Finde die Absturzstelle: ${loc(dx,dy)}`;
 if(cs==1){const pp=unl.pp||{};return `<b>Dem Piloten helfen</b><br>${Object.keys(PN).map(k=>`${IT[k][0]} ${pp[k]|0}/${PN[k]}`).join(' · ')}<br><small>Am Wrack E drücken</small>`}
 return bunkerGoal()}
function startChapter2(){const f=$('#fade');f.style.opacity=1;paused=true;setTimeout(()=>{
 const keep={};for(const k of['axe','pick','spear','spear2','coat','mask','bench','campfire','torch','wall','bandage','chest','shelter','q'])if(unl[k])keep[k]=unl[k];
 chap=2;unl=keep;gone=new Set();bld=new Map();en=[];drops=[];parts=[];cOpen=null;seed=((seed*7919+13)%999983)+1;gen(seed);fog=new Uint8Array(W*H);
 let sx=80,sy=80;for(let r=0;r<60;r++){let q=0;for(let a=0;a<16&&!q;a++){const x=80+Math.round(Math.cos(a)*r),y=80+Math.round(Math.sin(a)*r),w=world[y*W+x];if(w!=2&&w!=1&&!objs.has(y*W+x)){sx=x;sy=y;q=1}}if(q)break}
 P.x=sx*T+16;P.y=sy*T+16;P.wm=100;tm=.3;cam.x=P.x-cv.width/2;cam.y=P.y-cv.height/2;
 for(let k=0;k<22;k++){const x=(hash(k,5)*W)|0,y=(hash(k,6)*H)|0;if(world[y*W+x]!=2&&Math.hypot(x-sx,y-sy)>18&&!objs.has(y*W+x))spawnEn(x*T+16,y*T+16)}
 add('mask');f.style.opacity=0;save();
 story('Kapitel 2: Das Moor','Der Hubschrauber setzt dich am Rand eines giftigen Moors ab. Der Pilot drückt dir eine Gasmaske in die Hand: „Die Dämpfe im Sumpf sind tödlich. Such Basis Süd und bring dort den Strom zurück.“ Dann hebt er ab. Zurück gibt es nicht mehr.')},1400)}
