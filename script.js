const slides=[...document.querySelectorAll('.slide')];
let current=0;
const dots=document.getElementById('dots');
slides.forEach((_,i)=>{const d=document.createElement('div');d.className='dot'+(i===0?' active':'');d.onclick=()=>go(i);dots.appendChild(d)});
function render(){slides.forEach((s,i)=>s.classList.toggle('active',i===current));[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===current));}
function go(i){current=(i+slides.length)%slides.length;render();}
function nextSlide(){go(current+1)}
function prevSlide(){go(current-1)}
document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key))nextSlide();if(['ArrowLeft','PageUp'].includes(e.key))prevSlide();if(e.key==='Escape')closeModal();});
function drivePreview(url){
  const m = url.match(/\/d\/([^/]+)/);
  if(m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}
function openModal(title,content){document.getElementById('modalTitle').innerHTML=title;document.getElementById('modalContent').innerHTML=content;document.getElementById('modal').classList.add('show');}
function openDoc(title,url){
  const preview=drivePreview(url);
  document.getElementById('modalTitle').innerHTML=title;
  document.getElementById('modalContent').innerHTML=`<iframe class="doc-frame" src="${preview}" allow="autoplay"></iframe><div class="doc-actions"><a class="doc-open" href="${url}" target="_blank" rel="noopener"><i class="fa-solid fa-up-right-from-square"></i> Abrir documento</a></div>`;
  document.getElementById('modal').classList.add('show');
}
function closeModal(){document.getElementById('modal').classList.remove('show');}
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
