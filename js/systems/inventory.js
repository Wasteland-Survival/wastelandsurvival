function add(id,n=1){for(const s of inv)if(s&&s.id==id&&s.n<IT[id][4]){const k=Math.min(n,IT[id][4]-s.n);s.n+=k;n-=k}
 for(let i=0;i<24&&n>0;i++)if(!inv[i]){const k=Math.min(n,IT[id][4]);inv[i]={id,n:k};n-=k}return n}
const count=id=>inv.reduce((a,s)=>a+(s&&s.id==id?s.n:0),0);
const nearB=()=>{for(const[i,b]of bld)if(b.t=='bench'&&Math.hypot((i%W)*T+16-P.x,(i/W|0)*T+16-P.y)<120)return 1};
function take(id,n){for(let i=0;i<24&&n>0;i++){const s=inv[i];if(s&&s.id==id){const k=Math.min(n,s.n);s.n-=k;n-=k;if(!s.n)inv[i]=null}}}
function use(i){const s=inv[i];if(!s)return;const f={berry:[10,3],mushroom:[8,0],meat:[25,0],cooked:[40,0]}[s.id];
 if(f){P.hu=Math.min(100,P.hu+f[0]);P.th=Math.min(100,P.th+f[1]);beep(300,.1,'sine')}else if(s.id=='bandage')P.hp=Math.min(100,P.hp+30);else return;
 if(--s.n<=0)inv[i]=null;ui()}
