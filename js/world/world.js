function hash(x,y){let h=(x*374761393+y*668265263+seed*2147483)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967295}
function n2(x,y,s){const xi=Math.floor(x/s),yi=Math.floor(y/s),fx=x/s-xi,fy=y/s-yi,a=hash(xi,yi),b=hash(xi+1,yi),c=hash(xi,yi+1),d=hash(xi+1,yi+1),u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
function gen(s){seed=s;world=new Uint8Array(W*H);objs=new Map();ruins=[];
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const e=n2(x,y,22)*.6+n2(x+300,y,8)*.4,m=n2(x,y+300,14),i=y*W+x,w=e<.34?2:e>.74?3:m>.55?1:0;world[i]=w;if(w==2)continue;const r=hash(x*7+1,y*13+5);
  if(w==1&&r<.3||w==0&&r<.04)objs.set(i,{t:1,hp:5});else if(w==3&&r<.1)objs.set(i,{t:2,hp:6});else if(w!=3&&r>.96)objs.set(i,{t:3,hp:2});else if(w==3&&r>.995)objs.set(i,{t:4,hp:1})}
 for(let k=0;k<14;k++){const cx=(10+hash(k,77)*(W-20))|0,cy=(10+hash(k,99)*(H-20))|0;if(world[cy*W+cx]==2)continue;ruins.push([cx,cy]);
  for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const i=(cy+dy)*W+cx+dx;if(world[i]==2)continue;if(Math.max(Math.abs(dx),Math.abs(dy))==3&&hash(cx+dx,cy+dy)<.6)objs.set(i,{t:5,hp:9});else objs.delete(i)}
  objs.set(cy*W+cx,{t:4,hp:1})}
 gone.forEach(i=>objs.delete(i));placeTower()}
