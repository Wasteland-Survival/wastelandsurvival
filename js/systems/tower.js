let tw=null,twW=0;
let TN={metal:6,coal:4,cloth:3,fiber:8};
function placeTower(){TN=chap==2?{metal:8,coal:6,fiber:6,cloth:2}:{metal:6,coal:4,cloth:3,fiber:8};tw=null;let bd=1e9;for(const[x,y]of ruins){const d=Math.abs(Math.hypot(x-80,y-80)-45);if(d<bd){bd=d;tw={x,y}}}if(tw)objs.set(tw.y*W+tw.x,{t:chap==2?8:6,hp:999})}
function towerUse(){if(!tw||Math.hypot(tw.x*T+16-P.x,tw.y*T+16-P.y)>85)return false;const s=unl.tw|0;
 if(s==0){const tp=unl.tp=unl.tp||{};let got=0;for(const k in TN){const n=Math.min(count(k),TN[k]-(tp[k]|0));if(n>0){take(k,n);tp[k]=(tp[k]|0)+n;got+=n}}
  if(Object.keys(TN).every(k=>(tp[k]|0)>=TN[k])){unl.tw=1;beep(520,.3,'sine');flash(chap==2?'Der Generator läuft! Drücke E, um das Signal zu senden.':'Der Funkturm ist repariert! Drücke E zum Senden.')}else flash(got?'Teile eingebaut':'Dir fehlen Teile: '+Object.keys(TN).map(k=>IT[k][0]).join(', '));ui();return true}
 if(s==1){unl.tw=2;unl.tt=chap==2?150:120;twW=8;beep(300,.4,'sawtooth');flash('Signal gesendet! Halte durch.');return true}
 return s==2}
function tSpawn(big){for(let t=0;t<12;t++){const a=Math.random()*6.283,x=P.x+Math.cos(a)*380,y=P.y+Math.sin(a)*380;if(!hit(x,y,7)&&x>0&&y>0&&x<W*T&&y<H*T&&en.length<30){spawnEn(x,y);const e=en[en.length-1];e.st='chase';if(big&&!e.big){e.big=1;e.hp=e.mx=70}return}}}
function towerTick(dt){if(unl.tw!=2||!tw||Math.hypot(tw.x*T+16-P.x,tw.y*T+16-P.y)>450)return;unl.tt-=dt;twW-=dt;
 if(twW<=0){twW=25;const n=Math.round((2+(dark()>.5?1:0))*DF.en);for(let k=0;k<n;k++)tSpawn();if(!unl.tb&&unl.tt<80){unl.tb=1;tSpawn(1)}flash('Eine Horde nähert sich!')}
 if(unl.tt<=0){unl.tw=3;showMenu(chap==2?'Der Generator brummt, das Signal geht raus. Auf dem Terminal flackern die letzten Logbücher: Die Station erforschte die Sporen im Sumpf. Ihr Ursprung liegt weit im Osten, dort, wo noch jemand sendet … Kapitel 2 ist geschafft.':'Der Hubschrauber setzt zur Landung an … dann bricht der Funk ab. Rauch steigt am Horizont auf. Die Geschichte ist noch nicht vorbei.')}}
function goalText(){if(!tw)return '';if((unl.tw|0)>=3)return chap==2?'<b>Kapitel 2 abgeschlossen</b><br>Der Ursprung der Sporen liegt im Osten …':crashGoal();const s=unl.tw|0,dx=tw.x*T+16-P.x,dy=tw.y*T+16-P.y,ar='→↘↓↙←↖↑↗'[(Math.round(Math.atan2(dy,dx)/.7854)+8)%8];
 if(s==0){const tp=unl.tp||{};return `<b>Ziel: ${chap==2?'Basis Süd: Notstrom starten':'Funkturm reparieren'}</b><br>${loc(dx,dy)}<br>`+Object.keys(TN).map(k=>`${IT[k][0]} ${tp[k]|0}/${TN[k]}`).join(' · ')+'<br><small>Teile am Ziel mit E einbauen</small>'}
 if(s==1)return `<b>${chap==2?'Basis Süd hat Strom':'Funkturm bereit'}</b><br>${hints?ar:''} Am Ziel E drücken, um das Signal zu senden. Bereite dich vor!`;
 return `<b>Signal läuft</b><br>Bleib in der Nähe des Turms: ${Math.max(0,unl.tt|0)} s`}
