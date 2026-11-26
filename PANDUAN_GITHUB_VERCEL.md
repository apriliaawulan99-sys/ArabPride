# Panduan Membuat dan Menerbitkan ArabPride dengan GitHub dan Vercel

Paket ini memakai website statis HTML, CSS, dan JavaScript. GitHub menyimpan kode; Vercel menerbitkannya menjadi website.

## A. Persiapan
Siapkan akun di https://github.com/ dan https://vercel.com/. Ekstrak ZIP ke komputer. Pastikan struktur folder seperti berikut:

```text
ArabPride_GitHub_Vercel_Starter/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── vercel.json
├── README.md
├── PANDUAN_GITHUB_VERCEL.md
└── CHECKLIST_DEPLOY.md
```

Jangan unggah ZIP sebagai satu file saja. Ekstrak dahulu.

## B. Membuat repository GitHub
1. Masuk ke https://github.com/.
2. Klik **New** atau buka https://github.com/new.
3. Isi nama repository, misalnya `arabpride`.
4. Pilih **Public** atau **Private** sesuai kebutuhan.
5. Klik **Create repository**.
6. Pada halaman repository, pilih **uploading an existing file**.
7. Buka folder hasil ekstrak, pilih semua isi folder proyek (termasuk folder `public` dan `vercel.json`), lalu seret ke area unggah GitHub.
8. Pastikan file terlihat sebagai `public/index.html`, `public/style.css`, `public/app.js`, dan `vercel.json`, bukan berada dalam folder bertingkat yang keliru.
9. Isi pesan commit, misalnya `Menambahkan prototipe awal ArabPride`, lalu klik **Commit changes**.

## C. Menghubungkan repository ke Vercel
1. Buka https://vercel.com/ dan masuk.
2. Pilih **Continue with GitHub**.
3. Berikan izin Vercel untuk mengakses repository yang akan diterbitkan.
4. Di dashboard Vercel klik **Add New… → Project**.
5. Cari repository `arabpride`, lalu klik **Import**.
6. Pada konfigurasi proyek:
   - Project Name: `arabpride` (atau nama pilihan).
   - Framework Preset: `Other` bila tidak terdeteksi.
   - Root Directory: `./` (folder utama repository).
   - Build Command: kosong/tidak diperlukan untuk situs statis ini.
   - Output Directory: `public` jika kolom tersebut diminta.
7. Klik **Deploy**.
8. Tunggu sampai deployment selesai dan Vercel menampilkan domain `vercel.app`.
9. Klik **Visit** untuk membuka website.

File `vercel.json` mengatur direktori `public` sebagai direktori statis. Jika pengaturan dashboard menimpa konfigurasi, pastikan output directory mengarah ke `public`.

## D. Menguji website
1. Pastikan beranda menampilkan ArabPride.
2. Coba tab Ruang Baca, Materi Nahwu-Sharaf, dan Asesmen Lanjutan.
3. Isi kuis dan klik Periksa jawaban.
4. Periksa teks Arab di laptop dan ponsel.
5. Pastikan tidak ada bagian yang terpotong.

## E. Memperbarui website
1. Buka repository GitHub.
2. Pilih file yang akan diubah, misalnya `public/index.html`.
3. Klik ikon pensil **Edit**, lakukan perubahan.
4. Klik **Commit changes**.
5. Vercel akan membuat deployment baru secara otomatis dari branch yang terhubung.
6. Di dashboard Vercel → **Deployments**, tunggu status **Ready**, lalu buka kembali domain website.

## F. Domain sendiri (opsional)
Di proyek Vercel buka **Settings → Domains**, masukkan domain yang dimiliki, lalu ikuti instruksi DNS yang ditampilkan Vercel. Domain `vercel.app` sudah cukup untuk uji coba.

## G. Pemecahan masalah
- **404:** pastikan `public/index.html` ada dan Output Directory adalah `public`.
- **Update belum terlihat:** periksa status deployment terbaru di Vercel dan lakukan hard refresh.
- **Repository tidak muncul:** periksa izin integrasi GitHub pada akun Vercel.
- **Teks Arab tidak rapi:** pastikan CSS termuat dan atribut `lang="ar"` serta `dir="rtl"` tidak dihapus.

## H. Pengembangan lanjutan
1. Validasi materi dan jawaban dengan guru/ahli bahasa Arab.
2. Tambahkan audio model yang dibuat sendiri atau berizin.
3. Rancang login dan database jika progres harus tersimpan.
4. Rancang perekaman suara, izin mikrofon, keamanan, dan kebijakan privasi.
5. Uji speech-to-text bahasa Arab; hasil otomatis bukan penilaian mutlak.
6. Uji aksesibilitas serta tampilan pada perangkat siswa.

Jangan mengunggah nama lengkap, rekaman, nilai pribadi, API key, atau data sensitif siswa ke repository publik.


Pembaruan: 15 soal pada masing-masing dari 3 mini games; pre-test dan post-test masing-masing 30 soal. Audio memakai text-to-speech Arab pada perangkat dengan laju diperlambat. Pelafalan TTS berbeda menurut suara/perangkat dan tidak dapat dijamin sebagai rekaman qari/penutur yang tervalidasi; untuk akurasi mutlak gunakan rekaman audio Arab berharakat yang telah diperiksa ahli.
