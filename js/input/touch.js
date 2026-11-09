let jv={x:0,y:0},touch=0,tsh=0;const joy=$('#joy'),kn=$('#knob');
function jm(t){const r=joy.getBoundingClientRect();let x=t.clientX-r.left-60,y=t.clientY-r.top-60;const l=Math.hypot(x,y);if(l>50){x*=50/l;y*=50/l}kn.style.transform=`translate(${x}px,${y}px)`;jv.x=x/50;jv.y=y/50}
joy.ontouchstart=joy.ontouchmove=e=>{e.preventDefault();jm(e.targetTouches[0])};
joy.ontouchend=joy.ontouchcancel=()=>{jv.x=jv.y=0;kn.style.transform=''};
function aim(){let bx=P.x+(P.fx??1)*44,by=P.y+(P.fy??0)*44,bd=1e9;for(const e of en){const d=Math.hypot(e.x-P.x,e.y-P.y);if(d<80&&d-30<bd){bd=d-30;bx=e.x;by=e.y}}
if(bd>1e8){const tx=P.x/T|0,ty=P.y/T|0;for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++){const i=(ty+y)*W+tx+x,cx=(tx+x)*T+16,cy=(ty+y)*T+16;if(!objs.has(i)&&!bld.has(i))continue;const dd=Math.hypot(cx-P.x,cy-P.y);if(dd>68)continue;const d=dd-((cx-P.x)*(P.fx??1)+(cy-P.y)*(P.fy??0))*.25;if(d<bd){bd=d;bx=cx;by=cy}}}
mouse.x=bx-cam.x;mouse.y=by-cam.y}
const press=k=>dispatchEvent(new KeyboardEvent('keydown',{key:k}));
$('#tc').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-a]');if(!b)return;e.preventDefault();const a=b.dataset.a;if(a=='act'){touch=1;aim();mouse.d=true}else if(a=='pl'){mouse.x=P.x-cam.x+(P.fx??1)*44;mouse.y=P.y-cam.y+(P.fy??0)*44;place()}else if(a=='sp')tsh=keys.shift=1;else press(a)});
addEventListener('pointerup',()=>{if(touch){touch=0;mouse.d=false}if(tsh){tsh=0;keys.shift=0}});
$('#hot').onclick=e=>{const d=e.target.closest('.sl');if(d){sel=+d.dataset.i;ui();itemToast()}};
$('#bUse').onclick=()=>{if(held>=0){const h=held;held=-1;use(h);ui()}};
$('#bSplit').onclick=()=>{if(held>=0&&inv[held]&&inv[held].n>1){const j=[...Array(24).keys()].find(k=>!inv[k]);if(j!=null){const h=inv[held].n>>1;inv[held].n-=h;inv[j]={id:inv[held].id,n:h}}}ui()};
$('#bSv').onclick=()=>{if(run)save();$('#sv').value=localStorage.getItem('ws1')||'';$('#pSv').classList.add('open')};
$('#bSvX').onclick=()=>$('#pSv').classList.remove('open');
$('#bSvC').onclick=()=>{$('#sv').select();document.execCommand('copy');$('#svm').textContent='Kopiert. Falls nicht: Text markieren und manuell kopieren.'};
$('#bSvI').onclick=()=>{try{const v=$('#sv').value.trim();JSON.parse(v);localStorage.setItem('ws1',v);run=false;$('#bRes').disabled=false;$('#bSave').disabled=true;$('#svm').textContent='Import erfolgreich. Schließen und Fortsetzen drücken.'}catch(e){$('#svm').textContent='Dieser Code ist ungültig.'}};
