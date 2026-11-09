const mb=$('#mbg'),mg=mb.getContext('2d'),emb=[];
function mbDraw(t){requestAnimationFrame(mbDraw);const m=$('#menu');if(m.style.display=='none'||!m.classList.contains('title'))return;
const w=mb.width=innerWidth,h=mb.height=innerHeight,s=t/1000,gy=h*.78,fx=w*.2,fy=h*.9;
const sk=mg.createLinearGradient(0,0,0,h);sk.addColorStop(0,'#05080f');sk.addColorStop(.6,'#142418');sk.addColorStop(1,'#0b130c');mg.fillStyle=sk;mg.fillRect(0,0,w,h);
for(let i=0;i<70;i++){mg.fillStyle=`rgba(255,255,220,${.3+.3*Math.sin(s*2+i)})`;mg.fillRect((i*137.5)%w,(i*71.3)%(h*.55),2,2)}
const mx=w*.74,my=h*.22,mgd=mg.createRadialGradient(mx,my,10,mx,my,h*.35);mgd.addColorStop(0,'rgba(255,240,170,.35)');mgd.addColorStop(1,'rgba(255,240,170,0)');mg.fillStyle=mgd;mg.fillRect(0,0,w,h);
mg.fillStyle='#f3e4a0';mg.beginPath();mg.arc(mx,my,h*.06,0,6.3);mg.fill();
for(let l=0;l<3;l++){mg.fillStyle=['#0d1a10','#0a140c','#060d07'][l];for(let i=0;i<14;i++){const x=((i*w/10+l*57-s*(4+l*6))%(w+120)+w+120)%(w+120)-60,th=h*(.16+.07*l)+(i*37+l*11)%40,by=gy+l*h*.06;mg.beginPath();mg.moveTo(x-th*.28,by);mg.lineTo(x,by-th);mg.lineTo(x+th*.28,by);mg.fill()}}
mg.fillStyle='#050a06';mg.fillRect(0,gy+h*.1,w,h);
const fl=.8+.2*Math.sin(s*17)+.1*Math.sin(s*29),gr=mg.createRadialGradient(fx,fy,5,fx,fy,h*.3*fl);gr.addColorStop(0,'rgba(255,170,60,.5)');gr.addColorStop(1,'rgba(255,120,30,0)');mg.fillStyle=gr;mg.fillRect(0,0,w,h);
mg.fillStyle='#4a3a30';for(let i=0;i<5;i++)mg.fillRect(fx-34+i*14,fy+4+(i%2)*3,12,9);
for(const[c,k]of[['#e8601c',1],['#ffb030',.65],['#fff0a0',.35]]){mg.fillStyle=c;mg.beginPath();mg.moveTo(fx-16*k,fy+4);mg.lineTo(fx+Math.sin(s*9+k)*4,fy-44*k*fl);mg.lineTo(fx+16*k,fy+4);mg.fill()}
if(Math.random()<.35)emb.push({x:fx+(Math.random()-.5)*16,y:fy-10,vx:(Math.random()-.5)*.5,vy:-.7-Math.random(),l:1});
for(let i=emb.length-1;i>=0;i--){const e=emb[i];e.x+=e.vx;e.y+=e.vy;e.l-=.012;if(e.l<=0){emb.splice(i,1);continue}mg.fillStyle=`rgba(255,${150+e.l*80|0},60,${e.l})`;mg.fillRect(e.x,e.y,2,2)}}
requestAnimationFrame(mbDraw);
