let drops=[],cOpen=null;
function add(id,n=1){const l=addRaw(id,n);if(l>0)dropItem(id,l,0)}
function dropItem(id,n,manual){drops.push({x:P.x+(Math.random()-.5)*30,y:P.y+8+(Math.random()-.5)*20,id,n,w:1.5});if(!manual)flash(IT[id][1]+' '+IT[id][0]+' liegt am Boden (Inventar voll)')}
function pickTick(dt){for(let i=drops.length-1;i>=0;i--){const d=drops[i];d.w-=dt;if(d.w>0||Math.hypot(d.x-P.x,d.y-P.y)>24)continue;const l=addRaw(d.id,d.n);if(l<d.n){d.n=l;ui();beep(520,.06,'sine')}if(!d.n)drops.splice(i,1)}}
function drawDrops(ox,oy){g.textAlign='center';for(const d of drops){const x=d.x+ox,y=d.y+oy;g.fillStyle='rgba(0,0,0,.3)';g.fillRect(x-7,y+4,14,4);g.font='18px serif';g.fillStyle='#fff';g.fillText(IT[d.id][1],x,y+2);if(d.n>1){g.font='10px sans-serif';g.fillText(d.n,x+10,y+10)}}g.textAlign='start'}
function wear(h){if(!DUR[h])return;const s=inv[sel];s.d=(s.d??DUR[h])-1;if(s.d<=0){inv[sel]=null;flash('Dein Werkzeug ist zerbrochen!');beep(120,.3,'sawtooth')}ui()}
function slotX(s,id){const d=s&&IT[s.id];return `<div class="sl ${d?'r'+d[3]:''}" data-s="${id}" title="${d?d[0]:''}">${d?d[1]+(s.n>1?'<b>'+s.n+'</b>':''):''}</div>`}
function chestUI(){$('#cg').innerHTML=[...Array(12).keys()].map(i=>slotX(cOpen.inv[i],'c'+i)).join('');$('#cp').innerHTML=[...Array(24).keys()].map(i=>slotX(inv[i],'p'+i)).join('')}
function chestAdd(s){let n=s.n;const c=cOpen.inv;for(let i=0;i<12&&n>0;i++)if(c[i]&&c[i].id==s.id&&c[i].n<IT[s.id][4]){const k=Math.min(n,IT[s.id][4]-c[i].n);c[i].n+=k;n-=k}for(let i=0;i<12&&n>0;i++)if(!c[i]){const k=Math.min(n,IT[s.id][4]);c[i]={...s,n:k};n-=k}return n}
$('#pCh').onclick=e=>{const d=e.target.closest('.sl');if(!d||!cOpen)return;const k=d.dataset.s,i=+k.slice(1);
 if(k[0]=='c'){const s=cOpen.inv[i];if(s){const l=addRaw(s.id,s.n);if(l>0)s.n=l;else cOpen.inv[i]=null}}
 else{const s=inv[i];if(s){const l=chestAdd(s);if(l>0)s.n=l;else inv[i]=null}}ui();chestUI()};
function chestUse(){for(const[i,b]of bld)if(b.t=='chest'&&Math.hypot((i%W)*T+16-P.x,(i/W|0)*T+16-P.y)<85){cOpen=b;document.querySelectorAll('.panel').forEach(x=>x.classList.remove('open'));$('#pCh').classList.add('open');chestUI();return true}return false}
function sleepUse(){for(const[i,b]of bld)if(b.t=='shelter'&&Math.hypot((i%W)*T+16-P.x,(i/W|0)*T+16-P.y)<80){
 if(dark()<.45){flash('Du bist nicht müde. Schlafe nachts.');return true}
 if(en.some(e=>Math.hypot(e.x-P.x,e.y-P.y)<260)){flash('Gegner in der Nähe: Du kannst nicht schlafen');return true}
 const f=$('#fade');f.style.opacity=1;paused=true;setTimeout(()=>{tm=.3;P.st=100;P.wm=100;P.hp=Math.min(100,P.hp+25);P.hu=Math.max(5,P.hu-15);P.th=Math.max(5,P.th-15);wx=0;rain=0;f.style.opacity=0;paused=false;save();flash('Guten Morgen!')},1400);return true}return false}
let parts=[],shake=0;
function spark(x,y,c,n){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*90,vy:-30-Math.random()*60,l:.5,c})}
function partsTick(dt){if(P.sw>0)P.sw-=dt;for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=160*dt;p.l-=dt;if(p.l<=0)parts.splice(i,1)}}
function drawParts(ox,oy){for(const p of parts){g.globalAlpha=Math.min(1,p.l*2);g.fillStyle=p.c;g.fillRect(p.x+ox,p.y+oy,3,3)}g.globalAlpha=1}
