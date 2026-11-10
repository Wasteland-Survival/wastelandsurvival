let crash=null,stOpen=false;
const PN={bandage:2,cooked:1};
function placeCrash(){crash=null;if(!tw)return;const a0=hash(tw.x,tw.y)*6.283;
 for(let k=0;k<16&&!crash;k++){const a=a0+k*.4;for(let r=56;r>=30&&!crash;r-=4){const x=Math.round(tw.x+Math.cos(a)*r),y=Math.round(tw.y+Math.sin(a)*r);if(x<6||y<6||x>W-6||y>H-6)continue;let ok=1;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(world[(y+dy)*W+x+dx]==2)ok=0;if(ok)crash={x,y}}}
 if(crash){for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)objs.delete((crash.y+dy)*W+crash.x+dx);objs.set(crash.y*W+crash.x,{t:7,hp:999})}}
function story(t,p){$('#stT').textContent=t;$('#stP').textContent=p;$('#pSt').classList.add('open');paused=true;stOpen=true}
function stClose(){$('#pSt').classList.remove('open');paused=false;stOpen=false}
$('#stB').onclick=stClose;
addEventListener('keydown',e=>{if(stOpen&&(e.key=='Escape'||e.key=='Enter')){e.stopImmediatePropagation();stClose()}},true);
function crashUse(){if(!crash||(unl.tw|0)<3||Math.hypot(crash.x*T+16-P.x,crash.y*T+16-P.y)>85)return false;const cs=unl.cs|0;
 if(cs==0){unl.cs=1;story('Die Absturzstelle','Der Helikopter liegt rauchend zwischen den Bäumen. Im Cockpit stöhnt der Pilot: „Verbände … und etwas Warmes zu essen … bitte.“ Er braucht 2 Verbände und 1 Gegrilltes Fleisch.');return true}
 if(cs==1){const pp=unl.pp=unl.pp||{};let got=0;for(const k in PN){const n=Math.min(count(k),PN[k]-(pp[k]|0));if(n>0){take(k,n);pp[k]=(pp[k]|0)+n;got+=n}}
  if(Object.keys(PN).every(k=>(pp[k]|0)>=PN[k])){unl.cs=2;add('coat');ui();story('Der Pilot','„Danke. Ohne dich wäre ich erledigt.“ Er drückt dir seinen Fliegermantel in die Hand und ein zerkratztes Funkprotokoll: Kurz vor dem Absturz kam ein Signal aus einem Bunker im Norden, dort lagern Treibstoff und Ersatzteile. „Aber irgendetwas dort unten hat unseren Funk gestört. Sei vorsichtig.“')}
  else flash(got?'Du versorgst den Piloten':'Dir fehlen Verbände oder gegrilltes Fleisch');return true}
 if(unl.fin){story('Der Pilot','„Die Maschine läuft. Wir haben es geschafft.“');return true}
 if((unl.bs|0)>=1){if(count('fuel')&&count('parts')){take('fuel',1);take('parts',1);unl.fin=1;ui();story('Kapitel 1: Ende','Gemeinsam schraubt ihr die Ersatzteile fest und füllt den Tank. Der Rotor kommt stotternd in Fahrt, dann hebt der Hubschrauber ab. Unter dir wird die Einöde klein. Plötzlich knistert der Funk: „Hier Basis Süd … wir hören euch. Kommt zu uns.“ Das war erst der Anfang.');return true}story('Der Pilot','„Mit Treibstoff und Ersatzteilen bringe ich uns hier raus. Ohne beides sitzen wir fest.“');return true}
 story('Der Pilot','„Ruh dich aus, ich halte hier die Stellung. Such den Bunker im Norden, aber geh nicht unvorbereitet.“');return true}
function crashTick(){if(!crash||(unl.tw|0)<3||unl.ca||Math.hypot(crash.x*T+16-P.x,crash.y*T+16-P.y)>260)return;unl.ca=1;for(let k=0;k<Math.round(3*DF.en);k++)tSpawn();tSpawn(1);flash('Aasfresser umkreisen die Absturzstelle!')}
function crashGoal(){if(!crash)return '';const cs=unl.cs|0,dx=crash.x*T+16-P.x,dy=crash.y*T+16-P.y,ar='→↘↓↙←↖↑↗'[(Math.round(Math.atan2(dy,dx)/.7854)+8)%8];
 if(cs==0)return `<b>Rauch am Horizont</b><br>${ar} Finde die Absturzstelle, ca. ${Math.round(Math.hypot(dx,dy)/T/5)*5} Kacheln`;
 if(cs==1){const pp=unl.pp||{};return `<b>Dem Piloten helfen</b><br>${Object.keys(PN).map(k=>`${IT[k][0]} ${pp[k]|0}/${PN[k]}`).join(' · ')}<br><small>Am Wrack E drücken</small>`}
 return bunkerGoal()}
