function slotHTML(i,cls=''){const s=inv[i],d=s&&IT[s.id];return `<div class="sl ${cls} ${d?'r'+d[3]:''}" data-i="${i}" title="${d?d[0]+' – '+d[2]+' ('+d[3]+')':'Leer'}">${d?d[1]+(s.n>1?'<b>'+s.n+'</b>':''):''}</div>`}
function ui(){$('#hot').innerHTML=[...Array(8).keys()].map(i=>slotHTML(i,i==sel?'on':'')).join('');
 $('#ig').innerHTML=[...Array(24).keys()].map(i=>slotHTML(i,i==held?'held':'')).join('');
 $('#rl').innerHTML=RC.map((r,k)=>{const lock=r[3]&&!unl[r[3]],nb=r[4]&&!nearB(),ok=!lock&&!nb&&Object.entries(r[2]).every(([a,b])=>count(a)>=b);
  return `<div class="rc"><b>${IT[r[0]][1]}</b><span>${IT[r[0]][0]}${r[1]>1?' ×'+r[1]:''}<br><small>${lock?'🔒 Erst '+IT[r[3]][0]+' herstellen':nb?'🔒 Werkbank in der Nähe nötig':Object.entries(r[2]).map(([a,b])=>`<i class="${count(a)>=b?'ok':'no'}" style="font-style:normal">${IT[a][0]} ${count(a)}/${b}</i>`).join(' · ')}</small></span><button data-k="${k}" ${ok?'':'disabled'}>Herstellen</button></div>`}).join('')}
$('#ig').onclick=e=>{const d=e.target.closest('.sl');if(!d)return;const i=+d.dataset.i;
 if(e.shiftKey&&inv[i]&&inv[i].n>1){const j=[...Array(24).keys()].find(k=>!inv[k]);if(j!=null){const h=inv[i].n>>1;inv[i].n-=h;inv[j]={id:inv[i].id,n:h}}}
 else if(held<0){if(inv[i])held=i}else if(held==i)held=-1;else{const a=inv[held],b=inv[i];if(a&&b&&a.id==b.id){const k=Math.min(a.n,IT[a.id][4]-b.n);b.n+=k;a.n-=k;if(!a.n)inv[held]=null}else{inv[held]=b;inv[i]=a}held=-1}ui()};
$('#ig').oncontextmenu=e=>{e.preventDefault();const d=e.target.closest('.sl');if(d)use(+d.dataset.i)};
$('#bSort').onclick=()=>{const a=inv.filter(Boolean).sort((x,y)=>x.id<y.id?-1:1);inv=[...a,...Array(24-a.length).fill(null)];held=-1;ui()};
$('#bDrop').onclick=()=>{if(held>=0){const s=inv[held];if(s)dropItem(s.id,s.n,1);inv[held]=null;held=-1;ui()}};
$('#rl').onclick=e=>{const b=e.target.closest('button');if(!b)return;const r=RC[+b.dataset.k];if(r[4]&&!nearB())return;for(const a in r[2])take(a,r[2][a]);add(r[0],r[1]);unl[r[0]]=1;beep(500,.12,'square');ui()};
