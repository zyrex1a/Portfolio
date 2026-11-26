document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.getElementById('nav'),toggle=document.getElementById('menu-toggle');
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');toggle.textContent=open?'×':'☰'});
  nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.textContent='☰'}});
  function decorate(){
    document.querySelectorAll('main section.block, .band .block').forEach((section,i)=>{let heading=section.querySelector('h2');if(heading&&!heading.querySelector('.section-kicker')){let k=document.createElement('span');k.className='section-kicker';k.textContent=String(i+1).padStart(2,'0')+' / PORTFOLIO';heading.prepend(k)}});
    document.querySelectorAll('.project .mock').forEach((mock,i)=>{const data=[['COFFEE & COMMERCE','Crafted for everyday rituals.','E-commerce concept · Responsive interface'],['PRODUCTIVITY','A little clarity. A lot of progress.','Application concept · Task management'],['HOSPITALITY','A stay worth remembering.','Hospitality concept · Booking interface']][i%3];const box=document.createElement('div');box.className='concept-preview';['small','strong','span'].forEach((tag,j)=>{let el=document.createElement(tag);el.textContent=data[j];box.append(el)});mock.replaceWith(box)});
    document.querySelectorAll('.icon').forEach((icon,i)=>icon.textContent=['01','02','03','04'][i%4]);
    document.querySelectorAll('img').forEach(img=>{if(!img.closest('.photo'))img.loading='lazy';img.decoding='async'});
    ['testimonials','experience'].forEach(id=>{if(!(SITE[id]||[]).length)document.getElementById(id).hidden=true});
    document.querySelectorAll('a[href="#"]').forEach(a=>{const label=document.createElement('span');label.className='concept-label';label.textContent=a.textContent+' · Coming soon';a.replaceWith(label)});
  }
  decorate();
  const topButton=document.getElementById('back-top');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}));
  let scheduled=false;
  function scrollFrame(){scheduled=false;topButton.hidden=scrollY<500;const stage=document.querySelector('.portrait-stage');if(stage&&!reduced.matches&&innerWidth>760){stage.style.translate='0 '+Math.min(scrollY*.075,40)+'px';}else if(stage){stage.style.translate='none';}}
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(scrollFrame)}},{passive:true});
  window.addEventListener('resize',scrollFrame);reduced.addEventListener('change',scrollFrame);scrollFrame();
  if(SITE.contact.email==='hello@example.com'){
    document.getElementById('mail').textContent='Contact details coming soon';
    document.getElementById('mail').removeAttribute('href');
    document.getElementById('form-status').textContent='Contact form unavailable until the owner adds a real email address.';
    document.getElementById('send').disabled=true;
  }
  window.addEventListener('message',e=>{if(e.source===window.parent&&e.data?.type==='site')decorate()});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.addEventListener('pointermove',e=>{const card=e.target.closest('.photo,.project');if(!card)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*7}deg) rotateY(${x*9}deg) translateY(-3px)`});
    document.addEventListener('pointerout',e=>{const card=e.target.closest('.photo,.project');if(card&&!card.contains(e.relatedTarget))card.style.transform=''});
  }
});
