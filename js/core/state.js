let seed=1,world,objs=new Map(),gone=new Set(),bld=new Map(),fog,ruins=[],P,inv=[],sel=0,tm=.3,en=[],unl={},rain=0,wx=0,rainT=60,run=false,paused=true,muted=false,auto=0,held=-1,hitCd=0,mouse={x:0,y:0,d:false},keys={},cam={x:0,y:0};
const cv=$('#c'),g=cv.getContext('2d'),lc=document.createElement('canvas'),lg=lc.getContext('2d');
function resize(){cv.width=innerWidth;cv.height=innerHeight;lc.width=cv.width;lc.height=cv.height}addEventListener('resize',resize);resize();
