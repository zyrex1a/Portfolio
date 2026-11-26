document.addEventListener('DOMContentLoaded',()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- PDF certificates: image preview (pdf.js, local copy in /vendor) + opening data: PDFs through a Blob ---- */
  const isPdf=u=>/^data:application\/pdf/i.test(u||'')||/\.pdf(?:[?#].*)?$/i.test(u||'');
  function dataBytes(u){const m=/^data:[^,]*?(;base64)?,(.*)$/is.exec(u);const bin=m[1]?atob(m[2]):decodeURIComponent(m[2]);const b=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);return b}
  function blobUrl(u){const m=/^data:([^;,]+)/i.exec(u);return URL.createObjectURL(new Blob([dataBytes(u)],{type:m?m[1]:'application/octet-stream'}))}
  window.openDataUrl=u=>{window.open(blobUrl(u),'_blank','noopener')};
  document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="data:"]');if(!a||a.classList.contains('diploma-link'))return;e.preventDefault();window.openDataUrl(a.getAttribute('href'))});
  let pdfLib=null;const pdfDone=new Map();
  function loadPdf(){return pdfLib||(pdfLib=import(new URL('vendor/pdf.min.mjs',document.baseURI).href).then(l=>{l.GlobalWorkerOptions.workerSrc=new URL('vendor/pdf.worker.min.mjs',document.baseURI).href;return l}))}
  function renderPdf(u,w){const k=w+'|'+u;if(!pdfDone.has(k))pdfDone.set(k,loadPdf().then(async lib=>{const doc=await lib.getDocument(/^data:/i.test(u)?{data:dataBytes(u)}:{url:u}).promise;const page=await doc.getPage(1);const v1=page.getViewport({scale:1});const sc=Math.min(3,w*Math.min(2,devicePixelRatio||1)/v1.width);const vp=page.getViewport({scale:sc});const c=document.createElement('canvas');c.width=Math.floor(vp.width);c.height=Math.floor(vp.height);const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);await page.render({canvasContext:ctx,viewport:vp}).promise;return c.toDataURL('image/jpeg',.9)}));return pdfDone.get(k)}
  function pdfThumbs(){document.querySelectorAll('.diploma-card').forEach(card=>{const a=card.querySelector('.diploma-link');if(!a||card.dataset.pdfThumb==='1')return;const url=a.getAttribute('href');if(!isPdf(url))return;card.dataset.pdfThumb='1';const icon=card.querySelector('.diploma-icon');if(!icon)return;renderPdf(url,520).then(src=>{if(!icon.isConnected)return;const im=document.createElement('img');im.src=src;im.alt=card.querySelector('h3')?.textContent||'';im.dataset.pdfThumb='1';icon.replaceWith(im)}).catch(()=>{})})}
  const modal=document.createElement('dialog');modal.className='document-modal';
  const head=document.createElement('div');head.className='document-modal-head';
  const title=document.createElement('h2');title.id='document-modal-title';
  const close=document.createElement('button');close.type='button';close.className='document-close';close.textContent='×';close.setAttribute('aria-label','Close document');head.append(title,close);
  const content=document.createElement('div');content.className='document-modal-content';modal.append(head,content);modal.setAttribute('aria-labelledby',title.id);document.body.append(modal);
  close.addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});
  modal.addEventListener('close',()=>content.replaceChildren());
  function preview(card){const a=card.querySelector('.diploma-link');if(!a)return;const url=a.getAttribute('href');title.textContent=card.querySelector('h3')?.textContent||'Document';content.replaceChildren();const img=card.querySelector('.diploma-visual img');if(img&&!img.dataset.pdfThumb){const full=document.createElement('img');full.src=img.src;full.alt=img.alt;content.append(full)}else if(isPdf(url)){const note=document.createElement('p');note.textContent='Loading preview…';content.append(note);renderPdf(url,1100).then(src=>{if(!note.isConnected)return;const full=document.createElement('img');full.src=src;full.alt=title.textContent;note.replaceWith(full)}).catch(()=>{if(!note.isConnected)return;const f=document.createElement('iframe');f.className='document-frame';f.title=title.textContent;f.src=/^data:/i.test(url)?blobUrl(url):url;note.replaceWith(f)})}else{const note=document.createElement('p');note.textContent='Open the document using the button below.';content.append(note)}const open=document.createElement('a');open.href=url;open.target='_blank';open.rel='noopener';open.textContent='Open original document ↗';open.className='document-original';content.append(open);modal.showModal();close.focus()}
  function projectPreview(card){
    const items=(window.activePortfolio||SITE).projects||[];
    const index=Array.from(document.querySelectorAll('.project')).indexOf(card),project=items[index];if(!project)return;
    title.textContent=project.title;content.replaceChildren();
    if(project.image){const img=document.createElement('img');img.src=project.image;img.alt=project.title;content.append(img)}
    else{const visual=card.querySelector('.concept-preview');if(visual)content.append(visual.cloneNode(true))}
    const description=document.createElement('p');description.textContent=project.details||project.description;content.append(description);
    if(project.features){const list=document.createElement('ul');list.className='project-feature-list';project.features.forEach(feature=>{const item=document.createElement('li');item.textContent=feature;list.append(item)});content.append(list)}
    const tags=document.createElement('ul');tags.className='tags';(project.tags||[]).forEach(tag=>{const item=document.createElement('li');item.textContent=tag;tags.append(item)});content.append(tags);
    const links=document.createElement('div');links.className='project-modal-links';
    (project.links||[]).filter(link=>/^https?:\/\//i.test(link.url)).forEach(link=>{const a=document.createElement('a');a.textContent=link.label+' ↗';a.href=link.url;a.target='_blank';a.rel='noopener';a.className='btn';links.append(a)});
    if(!links.childElementCount){const note=document.createElement('p');note.className='project-link-note';note.textContent='Project links will appear here once added by the owner.';links.append(note)}content.append(links);modal.showModal();close.focus();
  }
  function setup(){
    document.querySelectorAll('.project').forEach(card=>{if(!card.querySelector('.project-detail-button')){const button=document.createElement('button');button.type='button';button.className='project-detail-button';button.textContent='View project details ↗';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label','View details: '+card.querySelector('h3').textContent);card.querySelector('.pbody').append(button)}});
document.querySelectorAll('.diploma-card').forEach(card=>{const a=card.querySelector('.diploma-link');if(a){a.setAttribute('aria-haspopup','dialog');const visual=card.querySelector('.diploma-visual');if(visual&&!visual.querySelector('button')){const button=document.createElement('button');button.type='button';button.className='certificate-preview';button.setAttribute('aria-label','Preview '+card.querySelector('h3').textContent);button.setAttribute('aria-haspopup','dialog');while(visual.firstChild)button.append(visual.firstChild);visual.append(button)}}})}
  setup();pdfThumbs();window.addEventListener('message',e=>{if(e.source===window.parent&&e.data?.type==='site'){setup();pdfThumbs()}});
  document.addEventListener('click',e=>{const card=e.target.closest('.project,.service,.diploma-card,.skills > div');if(!card)return;
    if(!reduced.matches){const r=card.getBoundingClientRect(),wave=document.createElement('span');wave.className='card-wave';const diameter=Math.max(r.width,r.height)*2;wave.style.width=wave.style.height=diameter+'px';wave.style.left=(e.clientX-r.left-diameter/2)+'px';wave.style.top=(e.clientY-r.top-diameter/2)+'px';card.append(wave);wave.addEventListener('animationend',()=>wave.remove(),{once:true});card.animate([{scale:'1'},{scale:'.985'},{scale:'1'}],{duration:280,easing:'ease-out'})}
    if(card.classList.contains('project')&&!e.target.closest('a')){projectPreview(card);return}
    if(card.classList.contains('diploma-card')&&e.target.closest('.diploma-link,.certificate-preview')){e.preventDefault();preview(card)}
  });
});
