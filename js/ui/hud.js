const BARS=[['bh','lh','❤️ Leben','hp'],['bu','lu','🍖 Hunger','hu'],['bt','lt','💧 Durst','th'],['bs','ls','⚡ Ausdauer','st'],['bw','lw','🔥 Wärme','wm']];
function barsUI(){for(const[b,l,n,k]of BARS){const v=Math.max(0,P[k]??100),e=$('#'+b);e.style.width=v+'%';$('#'+l).textContent=n+' '+(v|0);e.parentNode.classList.toggle('low',v<20)}}
let itT=0,svT=0;
function itemToast(){const s=inv[sel],t=$('#itoast');clearTimeout(itT);if(s){const d=IT[s.id];t.innerHTML=`<b>${d[1]} ${d[0]}</b><small>${d[2]} · ${d[3]}${s.d!=null?' · Haltbarkeit '+s.d:''}</small>`}else t.innerHTML='<b>Leere Hand</b>';t.style.opacity=1;itT=setTimeout(()=>t.style.opacity=0,1500)}
function savedNote(){const n=$('#svnote');n.textContent='💾 Gespeichert';n.style.opacity=1;clearTimeout(svT);svT=setTimeout(()=>n.style.opacity=0,1400)}
addEventListener('wheel',e=>{if(!run||paused)return;sel=(sel+(e.deltaY>0?1:7))%8;ui();itemToast()});
