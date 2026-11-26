const tabs=document.querySelectorAll('.tab');
const panels=document.querySelectorAll('.panel');
function showPanel(id){panels.forEach(p=>p.classList.toggle('active',p.id===id));tabs.forEach(t=>t.classList.toggle('active',t.dataset.panel===id));}
tabs.forEach(t=>t.addEventListener('click',()=>showPanel(t.dataset.panel)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>showPanel(b.dataset.goto)));

const questions=[
['q1','b',"أستيقظُ adalah fi'il mudhari' (kata kerja yang menunjukkan pekerjaan sedang/akan berlangsung)."],
['q2','a','Subjek yang tersembunyi pada أذهبُ adalah dhamir أنا karena bentuk fi'ilnya menunjukkan orang pertama tunggal.'],
['q3','b','الساعةِ menjadi isim majrur karena didahului huruf jar في.'],
['q4','a','الخامسةِ adalah na’at/sifat bagi الساعةِ sehingga mengikuti i‘rab-nya, yaitu majrur.'],
['q5','c','الفجرَ adalah objek pekerjaan salat, sehingga menjadi maf‘ul bih manshub.'],
['q6','a','بعدَ menunjukkan waktu (setelah), berfungsi sebagai zharaf zaman manshub dan menjadi mudhaf bagi الدرسِ.'],
['q7','b','أدرسُ berasal dari دَرَسَ – يَدْرُسُ dengan akar huruf د ر س.'],
['q8','b','و adalah huruf ‘athaf yang menghubungkan العلومَ dengan unsur sebelumnya.'],
['q9','a','خالدٌ adalah pelaku dari يذهبُ, sehingga menjadi fa‘il marfu‘.'],
['q10','b','كتابًا merupakan objek yang dibaca, sehingga berkedudukan sebagai maf‘ul bih manshub.'],
['q11','a','جديدًا menerangkan كتابًا. Na‘at mengikuti man‘ut dalam i‘rab, maka keduanya manshub.'],
['q12','c','يكتبُ berasal dari كَتَبَ – يَكْتُبُ, akar katanya ك ت ب.'],
['q13','a','دفترِ didahului في sehingga isim majrur. ضمير ه menjadi mudhaf ilaih.'],
['q14','b','كتابينِ adalah mutsanna sebagai maf‘ul bih. Tanda nashab mutsanna adalah ya.'],
['q15','a','مسرورًا menjelaskan keadaan Khalid saat pulang, sehingga menjadi hal manshub.'],
['q16','b','مريمُ adalah pelaku dari تعتني, sehingga menjadi fa‘il marfu‘.'],
['q17','a','الأزهارَ merupakan objek yang disirami, sehingga maf‘ul bih manshub.'],
['q18','b','اليابسةِ menerangkan الأوراقِ dan mengikuti i‘rab-nya sebagai na‘at majrur.'],
['q19','b','جعل di sini bermakna menjadikan dan membutuhkan dua maf‘ul: المدرسةَ (pertama) dan مكانًا (kedua).'],
['q20','c','أنْ adalah salah satu huruf nashab yang menashabkan fi‘il mudhari‘ setelahnya: تحافظَ.']
];
const quiz=document.getElementById('quiz-form');
quiz.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(quiz);
 const unanswered=questions.filter(([name])=>!data.get(name));
 const result=document.getElementById('quiz-result');
 const review=document.getElementById('answer-review');
 if(unanswered.length){result.className='quiz-result bad';result.textContent=`Masih ada ${unanswered.length} soal yang belum dijawab. Lengkapi semuanya terlebih dahulu.`;review.innerHTML='';const first=quiz.querySelector(`[name="${unanswered[0][0]}"]`);first?.focus();return;}
 let score=0;
 const rows=questions.map(([name,answer,explanation],i)=>{
  const chosen=data.get(name);const correct=chosen===answer;if(correct)score++;
  const field=quiz.querySelector(`fieldset:has(input[name="${name}"])`);
  field?.classList.toggle('answer-correct',correct);field?.classList.toggle('answer-wrong',!correct);
  const picked=field?.querySelector(`input[value="${chosen}"]`)?.parentElement?.textContent.trim()||'—';
  const right=field?.querySelector(`input[value="${answer}"]`)?.parentElement?.textContent.trim()||answer;
  return `<article class="review-item ${correct?'correct':'wrong'}"><b>Nomor ${i+1} · ${correct?'Benar':'Belum tepat'}</b><p>Jawabanmu: ${picked}</p>${correct?'':`<p>Jawaban benar: <strong>${right}</strong></p>`}<p class="explanation">${explanation}</p></article>`;
 }).join('');
 const percent=Math.round(score/questions.length*100);
 result.className='quiz-result '+(score>=15?'good':'bad');
 result.innerHTML=`<div class="score-number">${score} / ${questions.length}</div><strong>Nilai: ${percent}</strong><p>${score===20?'Masyaallah! Semua jawaban benar.':score>=15?'Bagus! Terus pertahankan dan pelajari pembahasan yang masih keliru.':'Tetap semangat. Baca kembali analisis materi, lalu coba lagi.'}</p>`;
 review.innerHTML=`<h4>Koreksi dan pembahasan per nomor</h4>${rows}`;
 review.scrollIntoView({behavior:'smooth',block:'start'});
});
quiz.addEventListener('reset',()=>{setTimeout(()=>{document.getElementById('quiz-result').innerHTML='';document.getElementById('quiz-result').className='quiz-result';document.getElementById('answer-review').innerHTML='';quiz.querySelectorAll('fieldset').forEach(f=>f.classList.remove('answer-correct','answer-wrong'));},0);});
