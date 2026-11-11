const DIFFS=[{hu:.6,cold:.5,en:.7,dmg:.7},{hu:1,cold:1,en:1,dmg:1},{hu:1.3,cold:1.4,en:1.3,dmg:1.3}];
let diff=1,DF=DIFFS[1];
function nearHeat(){for(const[i,b]of bld){const d=Math.hypot((i%W)*T+16-P.x,(i/W|0)*T+16-P.y);if(b.t=='campfire'&&d<140||b.t=='torch'&&d<50)return true}return false}
function coldTick(dt){if(chap==2&&world[(P.y/T|0)*W+(P.x/T|0)]==1&&!count('mask')){P.hp-=1.6*dt*DF.cold;if(!unl.pw){unl.pw=1;flash('Giftige Dämpfe! Eine Gasmaske schützt dich.')}if(Math.random()<.1)spark(P.x,P.y,'#7ab04a',1)}let c=dark()*1.1+(wx==1?.4:0)+(wx==3?.9:0)+(wx==2?.2:0);if(count('coat'))c*=.4;c*=DF.cold;
 if(nearHeat())P.wm=Math.min(100,P.wm+12*dt);else if(c>.25)P.wm=Math.max(0,P.wm-c*.8*dt);else P.wm=Math.min(100,P.wm+3*dt);
 if(P.wm<=0)P.hp-=1.2*dt}
