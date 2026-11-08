function solid(px,py){const tx=px/T|0,ty=py/T|0;if(tx<0||ty<0||tx>=W||ty>=H)return true;const i=ty*W+tx;if(world[i]==2)return true;const o=objs.get(i);if(o&&o.t!=3)return true;const b=bld.get(i);return !!b&&b.t!='torch'}
function hit(x,y,r){return solid(x-r,y-r)||solid(x+r,y-r)||solid(x-r,y+r)||solid(x+r,y+r)}
function move(e,dx,dy,r){if(!hit(e.x+dx,e.y,r))e.x+=dx;if(!hit(e.x,e.y+dy,r))e.y+=dy}
