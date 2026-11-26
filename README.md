# ArabPride — Starter Website (GitHub + Vercel)

Paket ini berisi prototipe awal ArabPride dan panduan publikasi melalui GitHub dan Vercel.

## Isi paket
- `public/index.html` — halaman dan konten belajar.
- `public/style.css` — desain responsif.
- `public/app.js` — navigasi dan kuis interaktif.
- `vercel.json` — konfigurasi situs statis.
- `PANDUAN_GITHUB_VERCEL.md` — petunjuk lengkap.
- `CHECKLIST_DEPLOY.md` — checklist publikasi.

## Pratinjau
Buka `public/index.html` di browser. Untuk server lokal, pasang Node.js lalu jalankan `npx serve public` dari folder proyek.

## Batasan prototipe
Navigasi, materi, dan kuis pilihan ganda berjalan di browser. Login, database, penyimpanan progres, rekaman audio, speech-to-text, dan panel guru belum dibuat. Jangan masukkan data pribadi siswa. Validasi materi dan kunci jawaban bersama guru/ahli bahasa Arab sebelum digunakan.

## Pembaruan alur dan interaksi
- Pre-test tampil pertama sebelum Ruang Baca; Post-test menjadi sesi kelima setelah Mini Games.
- Audio bacaan menggunakan Speech Synthesis browser dengan locale Arab Saudi (ar-SA); ketersediaan suara bergantung pada perangkat/browser.
- Mini Games terdiri dari 3 permainan dengan 10 soal masing-masing. Sentence Puzzle menyediakan bank potongan kata, ruang susun, pemeriksaan, dan menu kunci jawaban terpisah.
- Analisis teks tambahan 04–07 disusun per kalimat dan mencantumkan analisis setiap kata yang tersedia dalam data teks.
