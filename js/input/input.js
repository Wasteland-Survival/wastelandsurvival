function panel(id){const p=$(id),o=!p.classList.contains('open');document.querySelectorAll('.panel').forEach(x=>x.classList.remove('open'));if(o){p.classList.add('open');ui();if(id=='#pMap')drawMap()}}
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=1;if(!run)return;
 if(k=='escape'){document.querySelectorAll('.panel.open').length?document.querySelectorAll('.panel').forEach(x=>x.classList.remove('open')):showMenu('Pause')}
 else if(paused)return;else if(k=='i')panel('#pInv');else if(k=='c')panel('#pCr');else if(k=='m')panel('#pMap');
 else if(k>='1'&&k<='8'){sel=k-1;ui();itemToast()}else if(k=='e')drink()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
cv.onmousemove=e=>{mouse.x=e.clientX;mouse.y=e.clientY};cv.onmousedown=e=>{if(e.button==0)mouse.d=true;else place()};addEventListener('mouseup',()=>mouse.d=false);cv.oncontextmenu=e=>e.preventDefault();
const tileAt=()=>{const x=(mouse.x+cam.x)/T|0,y=(mouse.y+cam.y)/T|0;return[x,y,y*W+x]};
