function drawPlayer(x,y){const mv=keys.w||keys.a||keys.s||keys.d||Math.hypot(jv.x,jv.y)>.25,l=mv?Math.sin(P.wk)*3:0,d=P.dir>0?1:-1;
 g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+10,8,3,0,0,6.3);g.fill();
 g.fillStyle='#3a3226';g.fillRect(x-5,y+4+l*.5,4,6);g.fillRect(x+1,y+4-l*.5,4,6);
 g.fillStyle='#8a6a40';g.fillRect(x-6,y-5,12,11);g.fillStyle='#6a4e2c';g.fillRect(x-6,y+3,12,2);
 g.fillStyle='#e0b890';g.fillRect(x-4,y-12,8,8);g.fillStyle='#3a2a1a';g.fillRect(x-5,y-13,10,4);g.fillStyle='#222';g.fillRect(x+(d>0?1:-3),y-9,2,2);
 const s=Math.max(0,P.sw||0)/.25,h=inv[sel]&&inv[sel].id;g.save();g.translate(x+d*6,y-1);g.rotate(d*(s*2.2-.5));g.fillStyle='#e0b890';g.fillRect(-1,0,3,5);
 if(DUR[h]||h=='torch'){g.fillStyle='#5a3a1a';g.fillRect(-1,-8,2,10);g.fillStyle=h=='torch'?'#f0a030':h.startsWith('spear')?'#d0d0c8':'#9a978b';g.fillRect(h=='axe'?-1:-2,-12,h=='axe'?5:4,5)}g.restore()}
function drawBeast(e,x,y){const t=performance.now()/1000,d=P.x>e.x?1:-1,c=e.sc?'#55683f':e.big?'#4a3020':'#3a3a40',lg=Math.sin(t*11+e.x)*2;
 g.fillStyle='rgba(0,0,0,.3)';g.fillRect(x-10,y+6,20,4);g.fillStyle='#22222a';g.fillRect(x-8,y+3+lg,3,6);g.fillRect(x-2,y+3-lg,3,6);g.fillRect(x+5,y+3+lg,3,6);
 g.fillStyle=c;g.fillRect(x-9,y-6,18,11);g.fillRect(x-d*11,y-7+Math.sin(t*8)*1.5,4,3);g.fillRect(x+d*7-3,y-10,8,9);g.fillRect(x+d*7-3,y-13,2,4);g.fillRect(x+d*7+3,y-13,2,4);
 g.fillStyle='#555a5e';g.fillRect(x+d*11-1,y-5,4,3);g.fillStyle='#d03030';g.fillRect(x+d*8,y-8,2,2)}
