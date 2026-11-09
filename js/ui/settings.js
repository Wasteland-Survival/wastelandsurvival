let vol=.6,tut=true;
try{const d=JSON.parse(localStorage.getItem('ws_set'));if(d){vol=d.vol??vol;tut=d.tut??tut;muted=!!d.muted;diff=d.diff??1;DF=DIFFS[diff]}}catch(e){}
function setSave(){try{localStorage.setItem('ws_set',JSON.stringify({vol,tut,muted,diff}))}catch(e){}}
$('#cTut').checked=tut;$('#sDiff').value=diff;$('#sDiff').onchange=e=>{diff=+e.target.value;DF=DIFFS[diff];setSave()};$('#rVol').value=vol*100;$('#bMute').textContent='Ton: '+(muted?'aus':'an');
$('#cTut').onchange=e=>{tut=e.target.checked;setSave();questTick()};
$('#rVol').oninput=e=>{vol=e.target.value/100;setSave();beep(500,.08,'sine')};
$('#bMute').addEventListener('click',setSave);
document.querySelectorAll('#menu [data-v]').forEach(b=>b.onclick=()=>$('#menu').dataset.v=b.dataset.v);
const QS=[['Sammle 5 Holz: Linksklick auf Bäume',()=>count('wood')>=5],['Sammle 3 Stein von Felsen',()=>count('stone')>=3],['Stelle in C eine Axt her',()=>unl.axe],['Baue ein Lagerfeuer und platziere es',()=>unl.fire],['Erlege einen Wolf',()=>unl.kill],['Grille Fleisch am Feuer (E)',()=>unl.cook]];
function questTick(){const q=$('#quest');if(!run||paused){q.style.display='none';return}
let i=unl.q||0;const o=i;while(i<QS.length&&QS[i][1]())i++;
if(i!=o){unl.q=i;beep(660,.15,'sine');if(i>=QS.length)flash('Tutorial abgeschlossen!')}
let h=tut&&i<QS.length?`<b>Aufgabe ${i+1}/${QS.length}</b><br>${QS[i][0]}`:'';
const gt=goalText();if(gt)h+=(h?'<hr style="border:0;border-top:1px solid #4a5440;margin:6px 0">':'')+gt;
q.innerHTML=h;q.style.display=h?'block':'none'}
setInterval(questTick,400);
