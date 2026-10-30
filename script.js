(() => {
'use strict';
const cfg=window.AESTHETIC_VILLA||{};
const get=id=>document.getElementById(id);
const all=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const text=(id,value)=>{if(get(id))get(id).textContent=value;};
const iso=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
const dayAfter=value=>{if(!value)return iso();const d=new Date(value+'T12:00:00');d.setDate(d.getDate()+1);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
const dateString=value=>new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric'}).format(new Date(value+'T12:00:00'));
const safeLink=value=>{try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
let timer;
function toast(message){const el=get('toast');el.textContent=message;el.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('show'),4000);}
['checkin','checkout','enquiry-checkin','enquiry-checkout'].forEach(id=>get(id).min=iso());
[['checkin','checkout'],['enquiry-checkin','enquiry-checkout']].forEach(pair=>{get(pair[0]).addEventListener('change',()=>{const input=get(pair[1]);input.min=dayAfter(get(pair[0]).value);if(input.value&&input.value<input.min)input.value='';});});
text('copyright-year',new Date().getFullYear());
text('location-label',cfg.locationLabel||'Lokasi belum diatur');
text('location-desc',cfg.locationDescription||'Silakan hubungi pengelola untuk informasi lokasi.');
const map=safeLink(cfg.mapsUrl||'');if(map){const a=get('location-action');a.href=map;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Buka Google Maps ↗';}
const ig=safeLink(cfg.instagram||'');if(ig){get('footer-instagram').href=ig;get('footer-instagram').hidden=false;}
if(cfg.email&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cfg.email)){get('footer-email').href='mailto:'+cfg.email;get('footer-email').hidden=false;}
const header=get('header'),menu=get('mobile-nav'),toggle=get('menu-toggle');
const menuState=open=>{menu.hidden=!open;toggle.classList.toggle('active',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Tutup menu':'Buka menu');};
toggle.addEventListener('click',()=>menuState(menu.hidden));
all('a',menu).forEach(a=>a.addEventListener('click',()=>menuState(false)));
window.addEventListener('resize',()=>{if(innerWidth>820)menuState(false);});
function updateScroll(){header.classList.toggle('scrolled',scrollY>45);const max=document.documentElement.scrollHeight-innerHeight;get('page-progress').style.width=(max>0?Math.min(100,scrollY*100/max):0)+'%';}
addEventListener('scroll',updateScroll,{passive:true});updateScroll();
const icons={
waves:'<path d="M2 7c2.3 0 2.3 2 4.6 2S9 7 11.3 7s2.3 2 4.6 2S18.3 7 20.6 7M2 13c2.3 0 2.3 2 4.6 2s2.4-2 4.7-2 2.3 2 4.6 2 2.4-2 4.7-2"/>',
bed:'<path d="M3 20v-9M21 20v-9M3 17h18v-6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v6ZM5 8V5h6v3M13 8V5h6v3"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
utensils:'<path d="M4 2v8a3 3 0 0 0 6 0V2M7 2v20M20 22V2c-3 1-5 5-5 10h5"/>',
wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 3a7 7 0 0 1 8 0M12 19h.01"/>',
car:'<path d="m5 11 2-6h10l2 6M5 17H3V11h18v6h-2M5 17h14M7 17v2H5v-2m14 0v2h-2v-2M6 13h2m8 0h2"/>'};
(cfg.amenities||[]).forEach(item=>{const el=document.createElement('article');el.className='amenity-item';const ico=document.createElement('span');ico.className='amenity-icon';ico.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+(icons[item.icon]||icons.sun)+'</svg>';const h=document.createElement('h3');h.textContent=item.title||'';const p=document.createElement('p');p.textContent=item.text||'';el.append(ico,h,p);get('amenities-list').append(el);});
const photos=(cfg.photos||[]).filter(p=>safeLink(p.src));
let selected=0,lastFocus=null;
const booking=get('booking-modal'),lightbox=get('gallery-modal');
function lock(){document.body.classList.toggle('modal-open',!booking.hidden||!lightbox.hidden);}
function close(modal){modal.hidden=true;lock();if(lastFocus?.isConnected)lastFocus.focus();}
function openBooking(){lastFocus=document.activeElement;booking.hidden=false;get('copy-panel').hidden=true;get('form-validation').hidden=true;get('enquiry-checkin').value=get('checkin').value;get('enquiry-checkout').value=get('checkout').value;get('enquiry-checkout').min=dayAfter(get('enquiry-checkin').value);get('enquiry-guests').value=get('guests').value;lock();menuState(false);get('enquiry-name').focus();}
all('[data-book-open]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openBooking();}));
get('booking-close').addEventListener('click',()=>close(booking));
get('booking-bar').addEventListener('submit',e=>{e.preventDefault();const start=get('checkin').value,end=get('checkout').value;if(!start||!end||start<iso()||end<=start){toast('Pilih tanggal check-in dan check-out yang benar.');return;}openBooking();});
get('enquiry-form').addEventListener('submit',e=>{e.preventDefault();const start=get('enquiry-checkin').value,end=get('enquiry-checkout').value;let error=!start||!end?'Pilih tanggal check-in dan check-out.':start<iso()?'Tanggal check-in sudah lewat.':end<=start?'Tanggal check-out harus setelah check-in.':'';const warning=get('form-validation');warning.hidden=!error;if(error){warning.textContent=error;return;}
const name=get('enquiry-name').value.trim(),note=get('enquiry-note').value.trim(),guests=get('enquiry-guests').value;
const message='Halo, saya ingin menanyakan ketersediaan Aesthetic Villa.\n\nNama: '+name+'\nCheck-in: '+dateString(start)+'\nCheck-out: '+dateString(end)+'\nJumlah tamu: '+(guests==='9'?'9 atau lebih':guests)+' orang'+(note?'\nCatatan: '+note:'')+'\n\nMohon informasi ketersediaan, harga, dan ketentuan reservasi. Terima kasih.';
const wa=String(cfg.whatsapp||'').replace(/\D/g,'');if(wa.length>=10&&wa.length<=15){window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');toast('Pesan WhatsApp siap dikirim. Reservasi belum dikonfirmasi.');}else{get('copy-message').textContent=message;get('copy-panel').hidden=false;get('copy-panel').scrollIntoView({block:'nearest',behavior:'smooth'});}
});
get('copy-request').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(get('copy-message').textContent);text('copy-status','Pesan berhasil disalin.');}catch{text('copy-status','Silakan pilih teks di atas dan salin secara manual.');}});
function paint(){const p=photos[selected];get('gallery-large').src=p.src;get('gallery-large').alt=p.alt||'Foto villa';text('gallery-large-label',p.label||'Galeri');text('gallery-counter',String(selected+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0'));}
function openGallery(index){if(!photos.length)return;lastFocus=document.activeElement;selected=index;paint();lightbox.hidden=false;lock();get('gallery-close').focus();}
function move(delta){selected=(selected+delta+photos.length)%photos.length;paint();}
photos.forEach((p,i)=>{const item=document.createElement('button');item.type='button';item.className='gallery-item';item.setAttribute('aria-label','Lihat foto '+(i+1)+': '+p.label);const img=document.createElement('img');img.src=p.src;img.alt=p.alt||'Foto inspirasi villa';img.loading='lazy';const title=document.createElement('span');title.className='gallery-item-label';title.textContent=p.label||'';const zoom=document.createElement('span');zoom.className='gallery-zoom';zoom.textContent='↗';item.append(img,title,zoom);item.addEventListener('click',()=>openGallery(i));get('gallery-grid').append(item);});
get('gallery-prev').addEventListener('click',()=>move(-1));get('gallery-next').addEventListener('click',()=>move(1));get('gallery-close').addEventListener('click',()=>close(lightbox));
[booking,lightbox].forEach(modal=>modal.addEventListener('click',e=>{if(e.target===modal)close(modal);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!lightbox.hidden)close(lightbox);else if(!booking.hidden)close(booking);else menuState(false);}if(!lightbox.hidden){if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);}const active=!lightbox.hidden?lightbox:!booking.hidden?booking:null;if(active&&e.key==='Tab'){const focus=all('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]',active).filter(x=>x.getClientRects().length);if(focus.length){if(e.shiftKey&&document.activeElement===focus[0]){e.preventDefault();focus[focus.length-1].focus();}else if(!e.shiftKey&&document.activeElement===focus[focus.length-1]){e.preventDefault();focus[0].focus();}}}});
})();
