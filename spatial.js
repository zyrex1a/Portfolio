document.addEventListener('DOMContentLoaded',()=>{
  const stage=document.querySelector('.portrait-stage');
  const scene=document.createElement('div');scene.className='spatial-scene';scene.setAttribute('aria-hidden','true');
  const world=document.createElement('div');world.className='spatial-world';scene.append(world);stage.prepend(scene);
  const hero=document.querySelector('.hero');
  const tiltMotion=matchMedia('(prefers-reduced-motion: reduce)');
  hero.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse'||tiltMotion.matches)return;
    const r=hero.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
    hero.style.setProperty('--depth-x',(nx*20)+'deg');hero.style.setProperty('--depth-y',(-ny*16)+'deg');
    hero.style.setProperty('--light-x',(50+nx*35)+'%');hero.style.setProperty('--light-y',(50+ny*35)+'%');
    stage.style.setProperty('--portrait-x',(nx*18)+'deg');stage.style.setProperty('--portrait-y',(-ny*14)+'deg');
  },{passive:true});
  function resetDepth(){['--depth-x','--depth-y','--light-x','--light-y'].forEach(k=>hero.style.removeProperty(k));['--portrait-x','--portrait-y'].forEach(k=>stage.style.removeProperty(k));}
  hero.addEventListener('pointerleave',resetDepth);tiltMotion.addEventListener('change',resetDepth);
  const fine=matchMedia('(hover: hover) and (pointer: fine)'),motion=matchMedia('(prefers-reduced-motion: reduce)');
  const root=document.documentElement,dot=document.createElement('div'),ring=document.createElement('div');dot.className='cursor-dot';ring.className='cursor-ring';dot.setAttribute('aria-hidden','true');ring.setAttribute('aria-hidden','true');document.body.append(dot,ring);
  let x=-100,y=-100,rx=x,ry=y,raf=0,enabled=false;
  function draw(){rx=motion.matches?x:rx+(x-rx)*.2;ry=motion.matches?y:ry+(y-ry)*.2;dot.style.transform=`translate(${x}px,${y}px)`;ring.style.transform=`translate(${rx}px,${ry}px)`;if(Math.abs(x-rx)+Math.abs(y-ry)>.15)raf=requestAnimationFrame(draw);else raf=0}
  function hide(){root.classList.remove('custom-cursor','cursor-visible','cursor-hover','cursor-typing');if(raf)cancelAnimationFrame(raf);raf=0}
  function capability(){enabled=fine.matches;if(!enabled)hide()}
  fine.addEventListener('change',capability);capability();
  document.addEventListener('pointermove',e=>{
    if(!enabled||e.pointerType!=='mouse'){hide();return}
    x=e.clientX;y=e.clientY;
    if(!root.classList.contains('cursor-visible')){rx=x;ry=y}
    root.classList.add('custom-cursor','cursor-visible');
    const typing=!!e.target.closest('input,textarea,[contenteditable="true"]');const hover=!typing&&!!e.target.closest('a[href],button:not(:disabled),summary,select');
    root.classList.toggle('cursor-hover',hover);root.classList.toggle('cursor-typing',typing);ring.textContent=hover?'↗':'';
    if(!raf)raf=requestAnimationFrame(draw);
    if(!motion.matches){const sx=(x/innerWidth-.5)*20,sy=(y/innerHeight-.5)*-15;world.style.setProperty('--scene-x',sy+'deg');world.style.setProperty('--scene-y',sx+'deg')}
  },{passive:true});
  document.addEventListener('pointerout',e=>{if(!e.relatedTarget)hide()});window.addEventListener('blur',hide);document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
  motion.addEventListener('change',()=>{world.style.removeProperty('--scene-x');world.style.removeProperty('--scene-y')});
});
