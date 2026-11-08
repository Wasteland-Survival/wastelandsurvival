function spawnEn(x,y){const big=Math.random()<.2;en.push({x,y,hx:x,hy:y,big,hp:big?70:30,mx:big?70:30,st:'patrol',tx:x,ty:y,cd:0,lost:0,lx:x,ly:y})}
function newGame(s){gone=new Set();bld=new Map();unl={};en=[];gen(s);fog=new Uint8Array(W*H);inv=Array(24).fill(null);tm=.3;
 let sx=80,sy=80;for(let r=0;r<60;r++){let f=0;for(let a=0;a<16&&!f;a++){const x=80+Math.round(Math.cos(a)*r),y=80+Math.round(Math.sin(a)*r);if(world[y*W+x]!=2&&!objs.has(y*W+x)){sx=x;sy=y;f=1}}if(f)break}
 P={x:sx*T+16,y:sy*T+16,hp:100,hu:90,th:90,st:100,dir:1,wk:0};add('berry',3);add('wood',2);
 for(let k=0;k<18;k++){const x=(hash(k,5)*W)|0,y=(hash(k,6)*H)|0;if(world[y*W+x]!=2&&Math.hypot(x-sx,y-sy)>18&&!objs.has(y*W+x))spawnEn(x*T+16,y*T+16)}
 start()}
function start(){P.fx=P.fx??1;P.fy=P.fy??0;run=true;paused=false;held=-1;$('#menu').style.display='none';ui()}
