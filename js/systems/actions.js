function drink(){if(towerUse())return;for(const[i,b]of bld)if(b.t=='campfire'&&Math.hypot((i%W)*T+16-P.x,(i/W|0)*T+16-P.y)<70&&count('meat')){take('meat',1);add('cooked');unl.cook=1;ui();beep(420,.15,'sine');return flash('Fleisch gegrillt')}
 const tx=P.x/T|0,ty=P.y/T|0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(world[(ty+dy)*W+tx+dx]==2){P.th=Math.min(100,P.th+30);beep(700,.15,'sine');return flash('Du trinkst Wasser')}if(matchMedia('(pointer:coarse)').matches){aim();act()}}
function place(){if(paused)return;const s=inv[sel];if(!s||!PL.includes(s.id))return;const[x,y,i]=tileAt();if(!canPlace(x,y,i))return flash('Hier nicht möglich');
 if(s.id=='campfire')unl.fire=1;bld.set(i,{t:s.id});if(--s.n<=0)inv[sel]=null;beep(200,.1);ui()}
const canPlace=(x,y,i)=>x>=0&&y>=0&&x<W&&y<H&&world[i]!=2&&!objs.has(i)&&!bld.has(i)&&Math.hypot(x*T+16-P.x,y*T+16-P.y)<130&&Math.hypot(x*T+16-P.x,y*T+16-P.y)>20;
function act(){const s=inv[sel],h=s&&s.id,[x,y,i]=tileAt(),wx=mouse.x+cam.x,wy=mouse.y+cam.y;
 for(const e of en)if(Math.hypot(e.x-wx,e.y-wy)<26&&Math.hypot(e.x-P.x,e.y-P.y)<60){e.hp-=h=='spear2'?22:h=='spear'?14:h=='axe'?8:5;e.st='chase';beep(120,.1,'sawtooth');if(e.hp<=0){en.splice(en.indexOf(e),1);unl.kill=1;add('meat',(e.big?3:1)+(Math.random()<.5)|0);if(e.big)add('cloth',2)}return}
 if(Math.hypot(x*T+16-P.x,y*T+16-P.y)>75)return;
 const b=bld.get(i);if(b){bld.delete(i);add(b.t);ui();return beep(180,.1)}
 const o=objs.get(i);if(!o||o.t==6)return;let d=1;if(o.t==1&&h=='axe')d=3;if((o.t==2||o.t==5)&&h=='pick')d=3;o.hp-=d;beep(o.t==1?160:260,.07,'triangle');
 const r=Math.random;if(o.t==1){add('wood',1+(r()<.4));if(r()<.3)add('fiber')}
 if(o.t==2||o.t==5){add('stone');if(r()<.2)add('metal');if(r()<.2)add('coal')}
 if(o.t==3){add('berry',1+(r()<.5));add('fiber');if(world[i]==1)add('mushroom');o.hp=0}
 if(o.t==4){['cloth','metal','fiber','bandage','torch'].forEach(k=>{if(r()<.6)add(k,1+(r()<.5))});o.hp=0;flash('Truhe durchsucht')}
 if(o.hp<=0){objs.delete(i);gone.add(i)}ui()}
