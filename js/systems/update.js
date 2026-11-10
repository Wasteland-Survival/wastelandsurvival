const dark=()=>Math.min(.88,(1-(.5+.5*Math.sin((tm-.25)*6.2832)))*.9+rain*.12);
function update(dt){tm=(tm+dt/300)%1;const night=dark()>.5;
 let dx=(keys.d?1:0)-(keys.a?1:0)+(Math.abs(jv.x)>.25?jv.x:0),dy=(keys.s?1:0)-(keys.w?1:0)+(Math.abs(jv.y)>.25?jv.y:0),mv=dx||dy,sp=wx==3?48:60;
 if(mv){const l=Math.hypot(dx,dy);dx/=l;dy/=l;if(keys.shift&&P.st>1){sp=110;P.st-=18*dt}if(dx)P.dir=dx;P.fx=dx;P.fy=dy;P.wk+=dt*8;move(P,dx*sp*dt,dy*sp*dt,6);if(Math.sin(P.wk)>.98)beep(90,.04,'triangle',.03)}
 if(!(keys.shift&&mv))P.st=Math.min(100,P.st+(mv?8:16)*dt);
 P.hu=Math.max(0,P.hu-.3*DF.hu*dt);P.th=Math.max(0,P.th-.45*DF.hu*dt);coldTick(dt);
 if(P.hu<=0||P.th<=0)P.hp-=1.5*dt;else if(P.hu>25&&P.th>25)P.hp=Math.min(100,P.hp+.8*dt);
 if(rain)P.th=Math.min(100,P.th+.4*dt);
 rainT-=dt;if(rainT<=0){wx=wx?0:[1,2,3][Math.random()*3|0];rain=wx==1||wx==3?1:0;rainT=50+Math.random()*90}
 hitCd-=dt;towerTick(dt);crashTick();bossTick();if(touch)aim();if(mouse.d&&hitCd<=0){act();hitCd=.4}
 const tx=P.x/T|0,ty=P.y/T|0;for(let y=-8;y<=8;y++)for(let x=-8;x<=8;x++)if(x*x+y*y<=64&&tx+x>=0&&ty+y>=0&&tx+x<W&&ty+y<H)fog[(ty+y)*W+tx+x]=1;
 for(const e of en){const d=Math.hypot(P.x-e.x,P.y-e.y),sight=night?260:170,spd=(night?72:55)*(e.big?.8:1);e.cd-=dt;let gx=null,gy;
  if(e.st=='patrol'){if(Math.hypot(e.tx-e.x,e.ty-e.y)<6||Math.random()<.003){e.tx=e.hx+(Math.random()-.5)*160;e.ty=e.hy+(Math.random()-.5)*160}gx=e.tx;gy=e.ty;if(d<sight)e.st='chase'}
  else if(e.st=='chase'){gx=P.x;gy=P.y;e.lx=P.x;e.ly=P.y;if(d<18&&e.cd<=0){P.hp-=(night?12:8)*(e.big?1.6:1)*DF.dmg;e.cd=1;beep(100,.12,'sawtooth',.08)}if(d>sight*1.6){e.st='search';e.lost=4}}
  else if(e.st=='search'){gx=e.lx;gy=e.ly;e.lost-=dt;if(d<sight)e.st='chase';else if(e.lost<=0)e.st='return'}
  else{gx=e.hx;gy=e.hy;if(d<sight)e.st='chase';else if(Math.hypot(e.hx-e.x,e.hy-e.y)<8)e.st='patrol'}
  if(gx!=null){const a=Math.atan2(gy-e.y,gx-e.x),v=e.st=='patrol'?spd*.4:spd;move(e,Math.cos(a)*v*dt,Math.sin(a)*v*dt,7)}}
 if(night&&en.length<24&&Math.random()<dt*.15*DF.en){const a=Math.random()*6.28;const x=P.x+Math.cos(a)*420,y=P.y+Math.sin(a)*420;if(!hit(x,y,7)&&x>0&&y>0&&x<W*T&&y<H*T)spawnEn(x,y)}
 if(P.hp<=0){run=false;showMenu('Du bist gestorben. Lade deinen letzten Spielstand oder starte neu.')}
 auto+=dt;if(auto>30){auto=0;save()}
 cam.x+=(P.x-cv.width/2-cam.x)*Math.min(1,dt*6);cam.y+=(P.y-cv.height/2-cam.y)*Math.min(1,dt*6)}
