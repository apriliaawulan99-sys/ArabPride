const tabs=document.querySelectorAll('.tab');const panels=document.querySelectorAll('.panel');
function showPanel(id){panels.forEach(p=>p.classList.toggle('active',p.id===id));tabs.forEach(t=>t.classList.toggle('active',t.dataset.panel===id));}
tabs.forEach(t=>t.addEventListener('click',()=>showPanel(t.dataset.panel)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>showPanel(b.dataset.goto)));
const key={q1:'b',q2:'a',q3:'b',q4:'a'};
document.getElementById('quiz-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const result=document.getElementById('quiz-result');if(Object.keys(key).some(k=>!data.get(k))){result.className='quiz-result bad';result.textContent='Lengkapi semua pertanyaan terlebih dahulu.';return;}let score=0;Object.entries(key).forEach(([k,v])=>{if(data.get(k)===v)score++;});result.className='quiz-result '+(score===4?'good':'bad');result.textContent=`Skor latihan: ${score} dari 4. `+(score===4?'Bagus! Semua jawaban tepat.':'Pelajari kembali materi, lalu coba lagi.');});
