// ArabPride refinements: learning order, sentence-level analysis, Arabic audio, and 10-item games.
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const make=(tag,cls,html='')=>{const n=document.createElement(tag);if(cls)n.className=cls;n.innerHTML=html;return n;};
  function speakArabic(text){
    if(!('speechSynthesis' in window)){alert('Browser ini belum mendukung audio otomatis. Coba gunakan Chrome versi terbaru.');return;}
    speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text);u.lang='ar-SA';u.rate=.70;u.pitch=1;
    const voices=speechSynthesis.getVoices();const v=voices.find(x=>/^ar/i.test(x.lang));if(v)u.voice=v;speechSynthesis.speak(u);
  }
  function addAudioButtons(){
    $$('.reading-card').forEach(card=>{const arab= $('.arabic-text',card);if(!arab||$('.audio-button',card))return;
      const b=make('button','secondary audio-button','▶ Dengarkan bacaan');b.type='button';b.addEventListener('click',()=>speakArabic(arab.textContent.trim()));arab.insertAdjacentElement('afterend',b);
    });
  }
  function normalize(s){return s.replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[،؛,.!?؟]/g,'').trim();}
  function sentenceGroups(t){
    const sentences=t.ar.split(/[.!؟]+/).map(s=>s.trim()).filter(Boolean);let wi=0;
    return sentences.map(sentence=>{const tokens=sentence.split(/\s+/);const group=[];
      tokens.forEach(token=>{let combined='';const start=wi;while(wi<t.words.length && combined.length<normalize(token).length+2){combined+=normalize(t.words[wi][0]);wi++;if(combined===normalize(token))break;}
        if(wi===start && wi<t.words.length){group.push(t.words[wi++]);}else group.push(...t.words.slice(start,wi));
      });return {sentence,words:group};
    });
  }
  function rebuildExtraAnalysis(){
    const lesson=$('#lesson');if(!lesson||!window.extraTexts)return;
    const old=lesson.querySelector('h3');
    // Remove the earlier word-list-only copy of texts 4–7 so each text appears once.
    const earlier=lesson.querySelectorAll('div');
    earlier.forEach(node=>{if(node!==lesson && node.querySelector(':scope > h3') && /empat teks tambahan/i.test(node.textContent)) node.remove();});
    const generated=[...lesson.querySelectorAll('.analysis-group')].filter(x=>/Teks 0[4-7]/i.test(x.textContent));
    generated.forEach(x=>x.remove());
    const heading=make('h3','','Analisis teks 04–07 per kalimat');const intro=make('p','muted','Setiap kalimat diuraikan terlebih dahulu, kemudian seluruh kata di dalamnya dijelaskan fungsi nahwu dan bentuk sharafnya.');const groupContainer=make('div','extra-analysis-groups');
    const target=lesson.querySelector('.note'); const originals=[...lesson.querySelectorAll('.analysis-group')].filter(x=>/TEKS 0[1-3]/i.test(x.textContent)); const anchor=originals[originals.length-1]||target; if(anchor){anchor.insertAdjacentElement('afterend',heading);heading.insertAdjacentElement('afterend',intro);intro.insertAdjacentElement('afterend',groupContainer);}
    // Keep all seven texts in a consistent numerical order: 01–07.
    window.extraTexts.forEach((t,i)=>{
      const d=make('details','analysis-group');const summary=make('summary','',`TEKS 0${i+4} — ${t.title} (${sentenceGroups(t).length} kalimat)`);d.append(summary);
      sentenceGroups(t).forEach((g,j)=>{const item=make('div','analysis-item');item.append(make('h4','',`${j+1}. ${g.sentence}`));
        const grid=make('div','word-grid');g.words.forEach(([w,ex])=>grid.append(make('div','word-item',`<b dir="rtl">${w}</b><span>${ex}</span>`)));
        item.append(grid);d.append(item);
      });groupContainer.append(d);
    });
    const title=$('#lesson .panel-title p:last-child');if(title)title.textContent='Analisis setiap kalimat dan seluruh kata pada tujuh teks bacaan';
  }
  const puzzleData=[
    ['يَقْرَأُ خَالِدٌ الْكِتَابَ فِي الْمَكْتَبَةِ',['فِي','الْمَكْتَبَةِ','يَقْرَأُ','خَالِدٌ','الْكِتَابَ'],'Fi’il يقرأ diikuti fa’il خالد dan maf’ul bih الكتاب, lalu keterangan tempat.'],
    ['تَسْقِي مَرْيَمُ الْأَزْهَارَ بِالْمَاءِ',['بِالْمَاءِ','تَسْقِي','الْأَزْهَارَ','مَرْيَمُ'],'مريم adalah fa’il, الأزهار maf’ul bih, dan بالماء keterangan alat.'],
    ['يَجْلِسُ الطِّفْلُ تَحْتَ الشَّجَرَةِ',['تَحْتَ','الشَّجَرَةِ','يَجْلِسُ','الطِّفْلُ'],'الطفل fa’il; تحت الشجرة zharaf makan dan mudhaf ilaih.'],
    ['ذَهَبَتْ فَاطِمَةُ إِلَى الْمَدْرَسَةِ',['إِلَى','فَاطِمَةُ','الْمَدْرَسَةِ','ذَهَبَتْ'],'ذهبت فعل ماضٍ, فاطمة fa’il, إلى المدرسة جار ومجرور.'],
    ['يَكْتُبُ الطَّالِبُ الدَّرْسَ فِي الدَّفْتَرِ',['فِي','الدَّرْسَ','يَكْتُبُ','الدَّفْتَرِ','الطَّالِبُ'],'الطالب fa’il, الدرس maf’ul bih, في الدفتر جار ومجرور.'],
    ['تَلْعَبُ الْبَنَاتُ فِي الْحَدِيقَةِ',['الْحَدِيقَةِ','تَلْعَبُ','فِي','الْبَنَاتُ'],'البنات fa’il, في الحديقة جار ومجرور.'],
    ['يَحْمِلُ أَحْمَدُ حَقِيبَةً جَدِيدَةً',['جَدِيدَةً','أَحْمَدُ','حَقِيبَةً','يَحْمِلُ'],'أحمد fa’il, حقيبة maf’ul bih, جديدة na’at manshub.'],
    ['يَشْرَبُ الطِّفْلُ الْحَلِيبَ صَبَاحًا',['صَبَاحًا','الْحَلِيبَ','يَشْرَبُ','الطِّفْلُ'],'الطفل fa’il, الحليب maf’ul bih, صباحًا zharaf zaman.'],
    ['تَقْرَأُ الْمُعَلِّمَةُ قِصَّةً لِلْأَطْفَالِ',['لِلْأَطْفَالِ','قِصَّةً','تَقْرَأُ','الْمُعَلِّمَةُ'],'المعلمة fa’il, قصة maf’ul bih, للأطفال جار ومجرور.'],
    ['يَحْفَظُ التِّلْمِيذُ الْكَلِمَاتِ الْجَدِيدَةَ',['الْكَلِمَاتِ','يَحْفَظُ','الْجَدِيدَةَ','التِّلْمِيذُ'],'التلميذ fa’il; الكلمات maf’ul bih; الجديدة na’at manshub (jamak muannats salim).'],
    ['يَفْتَحُ الْحَارِسُ بَابَ الْمَدْرَسَةِ صَبَاحًا',['صَبَاحًا','بَابَ','يَفْتَحُ','الْمَدْرَسَةِ','الْحَارِسُ'],'يفتح فعل، الحارس فاعل، باب مفعول به وهو مضاف، المدرسة مضاف إليه، وصباحًا ظرف زمان.'],
    ['تَجْلِسُ فَاطِمَةُ مَعَ أُخْتِهَا فِي الْحَدِيقَةِ',['فِي','أُخْتِهَا','تَجْلِسُ','الْحَدِيقَةِ','مَعَ','فَاطِمَةُ'],'فاطمة فاعل، مع ظرف/اسم منصوب وهو مضاف، أخت مضاف إليه، وفي الحديقة جار ومجرور.'],
    ['يَحْمِلُ الطَّالِبَانِ الْكُتُبَ إِلَى الْفَصْلِ',['إِلَى','الطَّالِبَانِ','الْكُتُبَ','يَحْمِلُ','الْفَصْلِ'],'الطالبان فاعل مثنى مرفوع بالألف، الكتب مفعول به، وإلى الفصل جار ومجرور.'],
    ['لَنْ يُهْمِلَ الْمُجْتَهِدُ وَاجِبَهُ',['وَاجِبَهُ','الْمُجْتَهِدُ','لَنْ','يُهْمِلَ'],'لن حرف نصب، يهمل فعل مضارع منصوب، المجتهد فاعل، وواجبه مفعول به.'],
    ['كَتَبَتِ الْمُعَلِّمَةُ الْمُلَاحَظَاتِ فِي الدَّفْتَرِ',['فِي','الْمُلَاحَظَاتِ','كَتَبَتِ','الدَّفْتَرِ','الْمُعَلِّمَةُ'],'المعلمة فاعل، الملاحظات مفعول به جمع مؤنث سالم منصوب بالكسرة، وفي الدفتر جار ومجرور.'],
  ];
  const wordData=[
    ['يَكْتُبُ الطَّالِبُ الدَّرْسَ فِي الدَّفْتَرِ','الدَّرْسَ',['Fa’il','Maf’ul bih','Isim majrur'],1,'Objek yang ditulis adalah الدرس, sehingga maf’ul bih manshub.'],
    ['ذَهَبَتْ مَرْيَمُ إِلَى الْمَدْرَسَةِ','الْمَدْرَسَةِ',['Fa’il','Maf’ul bih','Isim majrur'],2,'المدرسة didahului إلى, yaitu huruf jar.'],
    ['فَتَحَ الْوَلَدُ الْبَابَ','الْوَلَدُ',['Fa’il','Maf’ul bih','Na’at'],0,'الولد melakukan pekerjaan membuka, jadi fa’il.'],
    ['قَرَأَتْ فَاطِمَةُ قِصَّةً','قِصَّةً',['Fa’il','Maf’ul bih','Mudhaf ilaih'],1,'قصة adalah sesuatu yang dibaca, jadi maf’ul bih.'],
    ['يَجْلِسُ الْمُعَلِّمُ عَلَى الْكُرْسِيِّ','الْكُرْسِيِّ',['Fa’il','Maf’ul bih','Isim majrur'],2,'على adalah huruf jar; الكرسي isim majrur.'],
    ['الْبَيْتُ الْكَبِيرُ جَمِيلٌ','الْكَبِيرُ',['Na’at','Fi’il','Huruf'],0,'الكبير menerangkan البيت dan mengikuti i’rab-nya sebagai na’at.'],
    ['يَشْرَبُ الطِّفْلُ الْمَاءَ','الطِّفْلُ',['Fa’il','Maf’ul bih','Isim majrur'],0,'الطفل adalah pelaku yang minum.'],
    ['وَضَعَتْ أُمِّي الطَّعَامَ عَلَى الطَّاوِلَةِ','عَلَى',['Isim','Fi’il','Huruf jar'],2,'على merupakan huruf jar yang menjarkan الطاولة.'],
    ['يَلْعَبُ الأَطْفَالُ فِي السَّاحَةِ','فِي',['Huruf jar','Isim','Fi’il'],0,'في adalah huruf jar.'],
    ['رَأَيْتُ طَالِبًا مُجْتَهِدًا','مُجْتَهِدًا',['Fa’il','Na’at manshub','Isim majrur'],1,'مجتهد menerangkan طالبًا dan mengikuti nashab-nya.'],
    ['يَشْرَحُ الْمُعَلِّمُ الْقَاعِدَةَ لِلطُّلَّابِ','الْقَاعِدَةَ',['Fa’il','Maf’ul bih','Isim majrur'],1,'Guru menjelaskan kaidah; القاعدة adalah objek langsung sehingga maf’ul bih manshub.'],
    ['إِنَّ الطَّالِبَيْنِ مُجْتَهِدَانِ','الطَّالِبَيْنِ',['Isim إنَّ manshub','Khabar إنَّ marfu’','Fa’il'],0,'الطالبين adalah isim إنَّ dan manshub dengan ya karena mutsanna.'],
    ['مَرَرْتُ بِالْمُعَلِّمِينَ','الْمُعَلِّمِينَ',['Maf’ul bih','Isim majrur','Fa’il'],1,'بِ adalah huruf jar; المعلمين isim majrur dengan ya karena jamak mudzakkar salim.'],
    ['الْبِنْتَانِ تَقْرَآنِ الْقِصَّةَ','تَقْرَآنِ',['Fi’il mudhari’ untuk mutsanna','Fi’il madhi','Isim'],0,'تقرآن fi’il mudhari’ yang disandarkan kepada alif mutsanna; alif menjadi fa’il.'],
    ['رَجَعَ الْمُسَافِرُ مُتْعَبًا','مُتْعَبًا',['Hal manshub','Mubtada','Mudhaf ilaih'],0,'متعبًا menjelaskan keadaan musafir ketika pulang, sehingga berfungsi sebagai hal manshub.'],
  ];
  const sarfData=[
    ['يَتَعَاوَنُونَ',['ع و ن – تَفَاعَلَ','ك ت ب – اِسْتَفْعَلَ','ع م ل – فَاعَلَ'],0,'Bentuknya تَعَاوَنَ–يَتَعَاوَنُ, akar ع و ن, pola تفاعل.'],
    ['يُدَوِّنُ',['د و ن – فَعَّلَ','د ر س – فَعَلَ','ق ر أ – أَفْعَلَ'],0,'Berasal dari دَوَّنَ–يُدَوِّنُ, akar د و ن, pola فعّل.'],
    ['يَسْتَغْفِرُ',['غ ف ر – اِسْتَفْعَلَ','غ ف ر – فَاعَلَ','ف ر ح – فَعِلَ'],0,'Berasal dari اِسْتَغْفَرَ–يَسْتَغْفِرُ, pola استفعل.'],
    ['مُعَلِّمٌ',['ع ل م – فَعَّلَ (isim fa’il)','ك ت ب – فَاعَلَ','ع م ل – أَفْعَلَ'],0,'معلّم adalah isim fa’il dari عَلَّمَ dengan pola مُفَعِّل.'],
    ['اِنْطَلَقَ',['ط ل ق – اِنْفَعَلَ','ط ل ق – اِفْتَعَلَ','ط ل ق – تَفَعَّلَ'],0,'انطلق mengikuti pola انْفَعَلَ dari akar ط ل ق.'],
    ['يُشَارِكُ',['ش ر ك – فَاعَلَ','ش ر ك – اِسْتَفْعَلَ','ش ر ك – فَعَّلَ'],0,'يشارك dari شَارَكَ–يُشَارِكُ, pola فاعل.'],
    ['مَكْتُوبٌ',['ك ت ب – مَفْعُول','ك ت ب – فَاعِل','ك ت ب – مِفْعَال'],0,'مكتوب adalah isim maf’ul dari كَتَبَ dengan pola مفعول.'],
    ['اِجْتَمَعَ',['ج م ع – اِفْتَعَلَ','ج م ع – تَفَاعَلَ','ج م ع – أَفْعَلَ'],0,'اجتمع mengikuti pola افتعل.'],
    ['يَسْتَخْرِجُونَ',['خ ر ج – اِسْتَفْعَلَ','خ ر ج – فَعَلَ','خ ر ج – فَاعَلَ'],0,'يستخرجون berasal dari استخرج–يستخرج, pola استفعل; واو الجماعة penanda pelaku jamak.'],
    ['نَظَّفَتْ',['ن ظ ف – فَعَّلَ','ن ظ ف – فَاعَلَ','ن ظ ف – اِنْفَعَلَ'],0,'نظّفت berasal dari نظّف dengan pola فعّل; تْ menunjukkan pelaku perempuan tunggal.'],
    ['مُسْتَخْدَمٌ',['خ د م – اسم مفعول من اِسْتَخْدَمَ','خ د م – اسم فاعل من خَدَمَ','ك ت ب – مفعول'],0,'مستخدم dalam konteks ini adalah isim maf’ul dari اِسْتَخْدَمَ–يَسْتَخْدِمُ, pola مُسْتَفْعَل.'],
    ['اِنْكَسَرَ',['ك س ر – اِنْفَعَلَ','ك س ر – تَفَعَّلَ','ك س ر – فَاعَلَ'],0,'انكسر berasal dari كَسَرَ dengan pola انْفَعَلَ; menunjukkan makna menjadi pecah.'],
    ['مُجْتَهِدُونَ',['ج ه د – اسم فاعل من اِجْتَهَدَ','ج ه د – اسم مفعول','ج م ع – تفاعل'],0,'مجتهد adalah isim fa’il dari اِجْتَهَدَ–يَجْتَهِدُ; bentuk jamaknya مجتهدون.'],
    ['تَعَلَّمَتْ',['ع ل م – تَفَعَّلَ','ع ل م – أَفْعَلَ','ع ل م – اِسْتَفْعَلَ'],0,'تعلّمت berasal dari تَعَلَّمَ–يَتَعَلَّمُ, akar ع ل م, pola تفعّل; تْ menunjukkan subjek perempuan tunggal.'],
    ['مَفْتُوحَةٌ',['ف ت ح – اسم مفعول مؤنث','ف ت ح – اسم فاعل مؤنث','ف ت ح – مصدر'],0,'مفتوحة adalah bentuk feminin dari isim maf’ul مَفْتُوح, dari فَتَحَ–يَفْتَحُ.'],
  ];
  function buildGames(){
    let root=$('#game-list');if(!root){const host=$('#games');if(!host)return;root=make('div','game-grid');root.id='game-list';host.append(root);}root.innerHTML='';
    const cards=[
      {name:'Sentence Puzzle',desc:'Pilih potongan kata, susun dalam ruang jawaban, lalu periksa. Kunci jawaban berada di menu terpisah.',type:'puzzle'},
      {name:'Tebak Jenis Kata',desc:'Tentukan kedudukan kata berdasarkan hubungan dan konteks kalimat.',type:'mcq',items:wordData},
      {name:'Deteksi Sharaf',desc:'Kenali akar kata, pola, dan bentuk turunannya dalam konteks.',type:'sarf',items:sarfData}
    ];
    cards.forEach((g,gi)=>{
      const card=make('article','game-card',`<span class="number">PERMAINAN 0${gi+1} · 15 SOAL</span><h4>${g.name}</h4><p>${g.desc}</p><div class="game-task"></div>`);const task=$('.game-task',card);
      if(g.type==='puzzle'){
        puzzleData.forEach((it,i)=>{const q=make('div','game-question');q.append(make('h5','',`Soal ${i+1}`),make('p','arabic-prompt',`Susun kalimat berikut:`));const bank=make('div','puzzle-bank');const answer=make('div','puzzle-answer','<span class="muted">Ruang menyusun kata — pilih potongan di atas</span>');const feedback=make('div','game-feedback');const shuffled=[...it[1]].sort(()=>Math.random()-.5);const selected=[];
          function draw(){bank.innerHTML='';answer.innerHTML='';shuffled.forEach((w,k)=>{if(selected.includes(k))return;const b=make('button','word-tile',w);b.type='button';b.onclick=()=>{selected.push(k);draw();};bank.append(b);});if(!selected.length)answer.innerHTML='<span class="muted">Ruang menyusun kata — pilih potongan di atas</span>';selected.forEach(k=>{const b=make('button','word-tile selected',shuffled[k]+' ×');b.type='button';b.title='Klik untuk mengembalikan kata';b.onclick=()=>{selected.splice(selected.indexOf(k),1);draw();};answer.append(b);});}
          draw();const actions=make('div','button-row');const check=make('button','secondary','Periksa susunan');const reset=make('button','secondary','Ulangi');check.type=reset.type='button';check.onclick=()=>{const val=selected.map(k=>shuffled[k]).join(' ');feedback.textContent=normalize(val)===normalize(it[0])?'Benar! Susunan kalimatmu tepat.':`Belum tepat. Perhatikan hubungan fi’il, fa’il, dan pelengkap kalimat.`;};reset.onclick=()=>{selected.length=0;feedback.textContent='';draw();};actions.append(check,reset);q.append(bank,make('b','','Ruang jawaban:'),answer,actions,feedback);task.append(q);
        });
        const keys=make('details','answer-keys');keys.append(make('summary','','Menu lain · Lihat kunci jawaban Sentence Puzzle'));puzzleData.forEach((it,i)=>keys.append(make('p','',`<b>${i+1}.</b> <span dir="rtl">${it[0]}</span><br><span class="muted">${it[2]}</span>`)));task.append(keys);
      } else {
        g.items.forEach((it,i)=>{const isSarf=g.type==='sarf';const sentence=isSarf?'Kata yang dianalisis:':`Kalimat: <span dir="rtl">${it[0]}</span>`;const word=isSarf?it[0]:it[1];const opts=isSarf?it[1]:it[2];const answer=isSarf?it[2]:it[3];const why=isSarf?it[3]:it[4];const q=make('div','game-question',`<b>Soal ${i+1}</b><p>${sentence}</p><p class="arabic-prompt" dir="rtl">${word}</p>${opts.map((o,j)=>`<label><input type="radio" name="g${gi}_${i}" value="${j}"> ${o}</label>`).join('')}<button type="button" class="secondary game-check">Periksa jawaban</button><div class="game-feedback"></div>`);$('.game-check',q).onclick=()=>{const v=$('input:checked',q);$('.game-feedback',q).textContent=!v?'Pilih jawaban terlebih dahulu.':(Number(v.value)===answer?'Benar! ':'Belum tepat. ')+why;};task.append(q);});
      }
      root.append(card);card.classList.add('game-enter');card.style.setProperty('--game-delay',`${gi*120}ms`);
    });
  }
  function arrangeFlow(){
    const learning=$('#learning'),nav=$('.tabs',learning);if(!learning||!nav)return;
    const assessment=$('#assessment'),reading=$('#reading'),lesson=$('#lesson');
    if(!assessment||!reading||!lesson)return;
    // Rebuild missing destination panels defensively so a partial render cannot hide navigation.
    let games=$('#games');
    if(!games){games=make('section','panel');games.id='games';games.innerHTML='<div class="panel-title"><div><p class="eyebrow">BELAJAR SAMBIL BERMAIN</p><h3>Mini Games Nahwu-Sharaf</h3><p>Tiga permainan untuk menguji penerapan kaidah.</p></div><span class="pill">3 permainan</span></div><div id="game-list" class="game-grid"></div>';lesson.insertAdjacentElement('afterend',games);}
    let report=$('#report');
    if(!report){report=make('section','panel','<div class="panel-title"><div><p class="eyebrow">REFLEKSI BELAJAR</p><h3>Perkembangan Belajarmu</h3><p>Bandingkan hasil pre-test dan post-test.</p></div></div><div id="progress-report" class="quiz-intro">Kerjakan kedua asesmen untuk melihat perbandingan hasil.</div>');report.id='report';games.insertAdjacentElement('afterend',report);}
    // Move pre-test to the first position and split post-test into its own final assessment panel.
    const postArea=$('#post-area');
    let postPanel=$('#post-assessment');
    if(postArea&&!postPanel){postPanel=make('section','panel');postPanel.id='post-assessment';postPanel.append(make('div','panel-title','<div><p class="eyebrow">ASESMEN AKHIR</p><h3>Post-test · 30 soal</h3><p>Uji kembali kemampuan analisis setelah mempelajari materi dan permainan.</p></div><span class="pill">30 soal</span>'));postPanel.append(make('div','quiz-intro','Kerjakan setelah menyelesaikan ruang baca, analisis, dan tiga permainan.'));postPanel.append(postArea);games.insertAdjacentElement('afterend',postPanel);}
    const switcher=$('.assessment-switch',assessment);if(switcher)switcher.remove();const postTab=$('#post-area');if(postTab)postTab.hidden=false;
    const h=assessment.querySelector('.panel-title h3');if(h)h.textContent='Pre-test · 30 soal';const desc=assessment.querySelector('.panel-title p:last-child');if(desc)desc.textContent='Asesmen awal sebelum membaca dan mempelajari analisis nahwu-sharaf.';
    const oldNote=assessment.querySelector('.note');if(oldNote)oldNote.textContent='Kerjakan sebelum membuka ruang baca. Soal menilai kemampuan mengenali fungsi kata dan hubungan antarkata dalam konteks.';
    const buttons=[['assessment','01 · Pre-test'],['reading','02 · Ruang Baca'],['lesson','03 · Analisis'],['games','04 · Mini Games'],['post-assessment','05 · Post-test'],['report','06 · Hasil Belajar']];nav.innerHTML='';buttons.forEach(([id,label],i)=>{const b=make('button','tab'+(i===0?' active':''),label);b.type='button';b.dataset.panel=id;b.addEventListener('click',()=>show(id));nav.append(b);});
    assessment.parentElement.insertBefore(assessment,reading);
    function show(id){$$('.panel',learning).forEach(p=>{p.classList.toggle('active',p.id===id);if(p.id===id){p.classList.remove('page-enter');void p.offsetWidth;p.classList.add('page-enter');}});$$('.tab',nav).forEach(b=>b.classList.toggle('active',b.dataset.panel===id));if(id==='post-assessment'&&window.preScore===undefined){const note=$('#post-assessment .quiz-intro');if(note)note.textContent='Kamu dapat melihat post-test, tetapi sebaiknya kerjakan pre-test terlebih dahulu agar hasil perkembangan dapat dibandingkan.';}}
    $$('[data-goto]',learning).forEach(b=>{b.onclick=()=>show(b.dataset.goto);});
    // Existing game navigation now routes to the complete game panel.
    const lessonBtn=$('#lesson [data-goto="assessment"]');if(lessonBtn){lessonBtn.dataset.goto='games';lessonBtn.textContent='Lanjut ke mini games →';}
    const readBtn=$('#reading [data-goto="lesson"]');if(readBtn)readBtn.textContent='Lanjut ke analisis nahwu-sharaf →';
    show('assessment');
  }
  document.addEventListener('DOMContentLoaded',()=>{
    // extra.js registers its renderer first; this callback runs after it.
    try{addAudioButtons();rebuildExtraAnalysis();buildGames();arrangeFlow();}catch(err){console.error('ArabPride initialization error:',err);const msg=make('div','note','Sebagian fitur belum termuat. Muat ulang halaman; jika masalah berlanjut, hubungi pengelola media.');const main=$('#learning');if(main)main.prepend(msg);}
    const note=make('p','audio-note','Audio otomatis menggunakan suara Arab yang tersedia pada browser/perangkat dengan kecepatan diperlambat. Kualitas makhraj, harakat, dan i‘rab bergantung pada mesin suara; bacaan otomatis ini belum dapat dijamin setepat rekaman penutur Arab yang telah ditashih. Untuk audio tervalidasi, gunakan rekaman penutur/guru yang membaca teks berharakat dan telah diperiksa ahli.');const reading=$('#reading');if(reading)reading.append(note);
  });
})();
