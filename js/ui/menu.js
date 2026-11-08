let ft=0;function flash(t){const h=$('#hint');h.textContent=t;h.style.opacity=1;clearTimeout(ft);ft=setTimeout(()=>h.style.opacity=0,1600)}
function showMenu(sub){paused=true;$('#menu').style.display='grid';if(sub)$('#sub').textContent=sub;$('#bRes').disabled=!run&&!localStorage.getItem('ws1');$('#bSave').disabled=!run}
$('#bNew').onclick=()=>newGame(parseInt($('#seedIn').value)||((Math.random()*1e6)|0));
$('#bRes').onclick=()=>run?start():load();$('#bSave').onclick=save;
$('#bMute').onclick=()=>{muted=!muted;$('#bMute').textContent='Ton: '+(muted?'aus':'an')};
