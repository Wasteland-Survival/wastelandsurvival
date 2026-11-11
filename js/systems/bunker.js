let bunker=null;
const loc=(dx,dy)=>hints?`${arw(dx,dy)} ca. ${Math.round(Math.hypot(dx,dy)/T/5)*5} Kacheln`:'Such die Umgebung ab';
const arw=(dx,dy)=>'→↘↓↙←↖↑↗'[(Math.round(Math.atan2(dy,dx)/.7854)+8)%8];
function placeBunker(){bunker=null;const o=crash||tw;if(!o)return;
 for(let pass=0;pass<2&&!bunker;pass++)for(let r=48;r>=24&&!bunker;r-=4)for(let k=0;k<17&&!bunker;k++){const a=pass?k*.37:-1.5708+(k%2?1:-1)*Math.ceil(k/2)*.2,x=Math.round(o.x+Math.cos(a)*r),y=Math.round(o.y+Math.sin(a)*r);if(x<8||y<8||x>W-8||y>H-8)continue;let ok=1;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)if(world[(y+dy)*W+x+dx]==2)ok=0;if(ok)bunker={x,y}}
 if(bunker){for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)objs.delete((bunker.y+dy)*W+bunker.x+dx);objs.set(bunker.y*W+bunker.x,{t:8,hp:999});for(const[dx,dy]of[[-3,-3],[3,-3],[-3,3],[3,3]])objs.set((bunker.y+dy)*W+bunker.x+dx,{t:5,hp:9})}}
function bunkerUse(){if(!bunker||(unl.cs|0)<2||Math.hypot(bunker.x*T+16-P.x,bunker.y*T+16-P.y)>90)return false;
 if(!unl.bs){if(count('keycard')){take('keycard',1);unl.bs=1;add('fuel');add('parts');add('bandage',2);ui();story('Der Bunker','Die Tür gleitet auf. Notbeleuchtung flackert über Regale voller Vorräte. Du findest einen Kanister Treibstoff, Ersatzteile für den Hubschrauber und Verbandsmaterial. Irgendwo springt eine Sirene an … die Meute ist alarmiert!');for(let k=0;k<Math.round(3*DF.en);k++)tSpawn();return true}
  story('Der Bunker','Eine schwere Stahltür mit Kartenleser. Nichts rührt sich, nur ein tiefes Grollen aus dem Wald. Der Alpha-Bär scheint den Schlüssel zu tragen.');return true}
 story('Der Bunker','Die Regale sind leer. Bring Treibstoff und Ersatzteile zum Hubschrauber.');return true}
function bossTick(){if(!bunker||(unl.cs|0)<2||unl.ub||Math.hypot(bunker.x*T+16-P.x,bunker.y*T+16-P.y)>320)return;
 for(let t=0;t<16;t++){const a=Math.random()*6.283,x=bunker.x*T+16+Math.cos(a)*130,y=bunker.y*T+16+Math.sin(a)*130;if(!hit(x,y,9)){unl.ub=1;spawnEn(x,y);const e=en[en.length-1];e.boss=1;e.big=1;e.hp=e.mx=[160,220,280][diff];e.st='chase';flash('Ein gewaltiger Alpha-Bär versperrt den Weg!');return}}}
function bunkerGoal(){if(unl.fin)return '<b>Abflug bereit</b><br>Sprich mit dem Piloten. Der Flug ist endgültig: nimm mit, was du brauchst.';if(!bunker)return '';const dx=bunker.x*T+16-P.x,dy=bunker.y*T+16-P.y;
 if(!unl.bs)return `<b>Den Bunker finden</b><br>${loc(dx,dy)}<br><small>${count('keycard')?'Du hast die Schlüsselkarte':'Ein Alpha-Bär trägt die Schlüsselkarte'}</small>`;
 return '<b>Zum Hubschrauber</b><br>Bringe Treibstoff und Ersatzteile zum Wrack'}
