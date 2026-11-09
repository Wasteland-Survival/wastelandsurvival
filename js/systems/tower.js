let tw=null,twW=0;
const TN={metal:6,coal:4,cloth:3,fiber:8};
function placeTower(){tw=null;let bd=1e9;for(const[x,y]of ruins){const d=Math.abs(Math.hypot(x-80,y-80)-45);if(d<bd){bd=d;tw={x,y}}}if(tw)objs.set(tw.y*W+tw.x,{t:6,hp:999})}
function towerUse(){if(!tw||Math.hypot(tw.x*T+16-P.x,tw.y*T+16-P.y)>85)return false;const s=unl.tw|0;
 if(s==0){const tp=unl.tp=unl.tp||{};let got=0;for(const k in TN){const n=Math.min(count(k),TN[k]-(tp[k]|0));if(n>0){take(k,n);tp[k]=(tp[k]|0)+n;got+=n}}
  if(Object.keys(TN).every(k=>(tp[k]|0)>=TN[k])){unl.tw=1;beep(520,.3,'sine');flash('Der Funkturm ist repariert! Drücke E zum Senden.')}else flash(got?'Teile eingebaut':'Dir fehlen Teile: Metall, Kohle, Stoff, Fasern');ui();return true}
 if(s==1){unl.tw=2;unl.tt=120;twW=8;beep(300,.4,'sawtooth');flash('Notruf gesendet! Halte 120 Sekunden durch.');return true}
 return s==2}
function tSpawn(big){for(let t=0;t<12;t++){const a=Math.random()*6.283,x=P.x+Math.cos(a)*380,y=P.y+Math.sin(a)*380;if(!hit(x,y,7)&&x>0&&y>0&&x<W*T&&y<H*T&&en.length<30){spawnEn(x,y);const e=en[en.length-1];e.st='chase';if(big&&!e.big){e.big=1;e.hp=e.mx=70}return}}}
function towerTick(dt){if(unl.tw!=2||!tw||Math.hypot(tw.x*T+16-P.x,tw.y*T+16-P.y)>450)return;unl.tt-=dt;twW-=dt;
 if(twW<=0){twW=25;const n=Math.round((2+(dark()>.5?1:0))*DF.en);for(let k=0;k<n;k++)tSpawn();if(!unl.tb&&unl.tt<80){unl.tb=1;tSpawn(1)}flash('Eine Horde nähert sich!')}
 if(unl.tt<=0){unl.tw=3;showMenu('Der Hubschrauber setzt zur Landung an … dann bricht der Funk ab. Rauch steigt am Horizont auf. Die Geschichte ist noch nicht vorbei.')}}
function goalText(){if(!tw)return '';if((unl.tw|0)>=3)return '<b>Funkspruch abgebrochen</b><br>Am Horizont steigt Rauch auf. Die Geschichte geht weiter …';const s=unl.tw|0,dx=tw.x*T+16-P.x,dy=tw.y*T+16-P.y,ar='→↘↓↙←↖↑↗'[(Math.round(Math.atan2(dy,dx)/.7854)+8)%8];
 if(s==0){const tp=unl.tp||{};return `<b>Ziel: Funkturm reparieren</b><br>${ar} ca. ${Math.round(Math.hypot(dx,dy)/T/5)*5} Kacheln entfernt<br>`+Object.keys(TN).map(k=>`${IT[k][0]} ${tp[k]|0}/${TN[k]}`).join(' · ')+'<br><small>Teile am Turm mit E einbauen</small>'}
 if(s==1)return `<b>Funkturm bereit</b><br>${ar} Am Turm E drücken, um Hilfe zu rufen. Bereite dich vor!`;
 return `<b>Notruf läuft</b><br>Bleib in der Nähe des Turms: ${Math.max(0,unl.tt|0)} s`}
