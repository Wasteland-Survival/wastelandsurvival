let last=0;function loop(t){const dt=Math.min(.05,(t-last)/1000);last=t;if(run){if(!paused)update(dt);draw()}requestAnimationFrame(loop)}
