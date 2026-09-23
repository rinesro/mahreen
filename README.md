# Mahreen untuk Anak Muda

Website sederhana yang memperkenalkan Mahreen Indonesia kepada generasi muda lewat tema **Berkarya untuk Indonesia**.

Dibuat oleh Sandhika Hamzah (Universitas Gunadarma) untuk Creative Challenge Mahreen Indonesia Internship Batch 2, posisi Website Development. Semua informasi dirangkum dari unggahan publik Mahreen Indonesia, Mei sampai September 2026.

> Ini prototype, bukan website resmi Mahreen Indonesia. Untuk informasi terbaru, cek akun resmi mereka.

## Tugas

> Buat sebuah website sederhana yang menurut Anda dapat memperkenalkan Mahreen Indonesia kepada generasi muda dengan tema "BERKARYA UNTUK INDONESIA" dengan cara yang menarik, mudah dipahami, dan relevan.

Konteks dari studi kasus: program dan peluang Mahreen belum selalu mudah dikenal, dipahami, dan diikuti oleh generasi muda.

## Konsep

Tema "Berkarya untuk Indonesia" dipakai sebagai alur cerita yang dibagi ke empat halaman:

| Urutan | Halaman | Isi |
|---|---|---|
| 1 | **Beranda** (`index.html`) | Siapa Mahreen: visi, misi, tiga kata kunci, dan tautan untuk menjelajah |
| 2 | **Karya** (`karya.html`) | Bagaimana Mahreen berkarya lewat unit-unitnya, dengan contoh nyata dari unggahan mereka |
| 3 | **Anak Muda** (`anak-muda.html`) | Ruang yang Mahreen sediakan untuk anak muda: program magang |
| 4 | **Mulai** (`mulai.html`) | Pembaca memilih minatnya, lalu diarahkan ke posisi magang, unit, dan akun yang relevan |

Halaman Karya dan Anak Muda ditutup blok "Lanjut" ke halaman berikutnya, berisi judul halaman tujuan dan satu kalimat isinya, dengan seluruh blok sebagai area klik. Halaman Mulai ditutup blok "Kembali ke Beranda". Blok ini memakai gradasi kampanye yang sama dengan hero Beranda. Beranda sendiri tidak punya blok Lanjut, karena bagian Jelajahi sudah menautkan ketiga halaman lain dengan urutan yang sama. Footer di semua halaman memuat lima akun Instagram resmi (karena informasi Mahreen tersebar di beberapa akun) dan kontak resmi.

Kaitan dengan tiga kata kunci tugas:

- **Menarik:** alur bercerita dengan tema sebagai benang merah, visual mengikuti identitas kampanye Mahreen, dan satu halaman interaktif.
- **Mudah dipahami:** satu halaman satu tujuan, bahasa sederhana, dan istilah Inggris pada tiga kata kunci diberi padanan bahasa Indonesia.
- **Relevan:** halaman Mulai menghubungkan minat pembaca (desain, konten, teknologi, bisnis, sosial) dengan bagian Mahreen yang berkaitan.

### Kenapa multi-halaman, bukan satu halaman panjang

- **Satu halaman, satu tujuan.** Pembaca yang hanya ingin tahu soal magang bisa langsung ke Anak Muda tanpa melewati bagian lain. Setiap halaman punya satu judul utama (`h1`), dan isinya bisa dipahami hanya dengan membaca judul-judulnya.
- **Alur cerita lebih terasa.** Bagian Jelajahi di Beranda dan blok "Lanjut" di akhir halaman berikutnya membuat urutan Beranda, Karya, Anak Muda, lalu Mulai jadi langkah yang jelas, bukan sekadar gulir panjang.
- **Bisa dibagikan per topik.** Setiap halaman punya alamat, `<title>`, deskripsi, dan pratinjau Open Graph sendiri. Pilihan di halaman Mulai bahkan tersimpan di alamatnya (misalnya `mulai.html?minat=teknologi`), jadi hasilnya bisa langsung dibagikan.
- **Tetap sederhana.** Keempat halaman memakai CSS, `data.js`, dan `main.js` yang sama. Tidak perlu router atau build tool.

### Aturan isi

- Semua fakta hanya dari data di `js/data.js`. Tidak ada program, jadwal, manfaat, atau testimoni karangan.
- Contoh nyata dan fakta penting diberi keterangan sumber kecil (akun dan tanggal), dengan tautan ke unggahannya.
- Mahreen dibicarakan sebagai orang ketiga, dan pembaca disapa "kamu". Tidak memakai "kami" dan tidak memakai bahasa jualan.
- Tidak ada foto atau nama pribadi orang.
- Tidak ada em dash atau en dash di seluruh teks.
- Tidak ada tautan anchor ke bagian di halaman yang sama, kecuali skip link untuk aksesibilitas.

## Keputusan desain

**Pola baca.** Hero di Beranda memakai pola Z: judul di kiri atas, motif bunga di kanan atas, subjudul menyilang ke bawah, lalu tombol di kiri bawah. Di tablet dan desktop pola ini terbentuk lewat grid; di HP semuanya bertumpuk.

**Hierarki.** Setiap halaman punya satu `h1`. Judul halaman Karya, Anak Muda, dan Mulai dibuat selevel judul bagian, tidak sebesar judul hero, karena halaman-halaman ini adalah lanjutan alur cerita. Level judul di dalam halaman tidak pernah meloncat (misalnya dari `h1` langsung ke `h3`), karena pembaca layar memakai urutan judul untuk bernavigasi.

**Warna.** Gaya kampanye Mahreen (magenta, pink, kelopak oranye) untuk seluruh halaman, dan gaya gelap bertekstur hanya untuk footer. Semua nilai ada di `css/tokens.css`. Kontras teks selalu minimal 4,5:1, dan beberapa kombinasi sengaja dihindari:

| Kombinasi | Kontras | Keputusan |
|---|---|---|
| Teks putih di atas oranye `#F2653A` | 3,14:1 | Tidak dipakai. Oranye hanya untuk dekorasi. |
| Oranye di atas merah tua | 2,83:1 | Nomor penghargaan memakai oranye muda (7,26:1). |
| Magenta di atas oranye muda | 4,06:1 | Label "Contoh nyata" memakai oranye gelap (5,23:1). |
| Putih di atas magenta (pilihan aktif) | 4,98:1 | Dipakai. |

**Tipografi.** Poppins untuk judul dan Plus Jakarta Sans untuk teks. Skala ukurannya kelipatan 1,25 dari 16px. Panjang baris dibatasi 45 sampai 75 karakter lewat token `--measure: 46ch`. Angkanya 46, bukan 65, karena satuan `ch` mengikuti lebar angka "0" yang lebih lebar dari rata-rata huruf: di Plus Jakarta Sans, 1ch memuat sekitar 1,5 karakter teks.

**Gestalt.**
- Proximity: nama, bidang, penjelasan, dan akun satu unit dikelompokkan rapat, dan antar unit diberi jarak lebar.
- Similarity: header, footer, tombol, dan keterangan sumber sama persis di keempat halaman.
- Continuity: tautan "Lanjut" antarhalaman, nomor 01 sampai 03 di bagian Jelajahi, dan motif bunga kecil di depan judul halaman dan judul bagian.
- Common region: kotak "Contoh nyata" berlatar oranye muda, dan area interaktif di halaman Mulai berada dalam satu panel putih.

**Variasi yang bermakna.** Blok unit tidak dibuat kartu identik. Unit yang punya contoh nyata dibagi dua di desktop (keterangan di kiri, contoh di kanan) sehingga contohnya mendapat ruang terbesar. Unit tanpa contoh tampil sebagai satu baris ringkas: di desktop, logo dan nama di kolom kiri, keterangan, akun, dan sumber di kolom kanan, tanpa kotak contoh yang kosong. Sorotan 10 kategori penghargaan menjadi satu-satunya blok berlatar merah tua. Di halaman Anak Muda, chip posisi berisi warna pink muda, sedangkan chip bidang mentoring hanya bergaris tepi, supaya keduanya tidak tertukar.

**Grid dan ruang.** 4 kolom di HP dan 12 kolom mulai 1024px, jarak kelipatan 8px, dan area sentuh minimal 44px.

**Motion.** Hanya untuk merespons aksi pengguna: membuka menu dan memilih minat. Semua gerak mati kalau pengguna memilih `prefers-reduced-motion`.

**Navigasi.**
- Halaman aktif ditandai warna magenta dan garis bawah tebal, ditambah `aria-current="page"` untuk pembaca layar. Penanda ini ditulis langsung di HTML setiap halaman.
- Di layar di bawah 480px, navigasi dilipat di balik tombol "Menu" (disclosure dengan `aria-expanded`). Tombol Esc menutup menu dan mengembalikan fokus ke tombolnya.
- Tanpa JavaScript, tombol Menu tidak muncul dan navigasi tampil lengkap.

**Aksesibilitas.**
- HTML semantik, skip link yang hanya muncul saat mendapat fokus, dan garis fokus yang terlihat saat navigasi keyboard.
- Halaman Mulai memakai radio button bawaan HTML yang ditampilkan seperti tombol pilihan. Perilaku radio group (satu pilihan aktif, panah untuk berpindah, dibaca "1 dari 5" oleh pembaca layar) sudah disediakan browser tanpa ARIA buatan. Hasilnya diumumkan lewat `aria-live="polite"`.
- Istilah bahasa Inggris ditandai `lang="en"` supaya dilafalkan dengan benar oleh pembaca layar.
- Tautan kecil di keterangan sumber diberi padding supaya area sentuhnya sekitar 45px. Di bagian Jelajahi, seluruh blok bisa diklik, walaupun tautannya hanya di judul. Blok yang seluruhnya bisa diklik (Jelajahi, Lanjut) dan daftar akun di footer tidak bergaris bawah, garisnya muncul saat hover atau fokus. Tautan di dalam kalimat tetap bergaris bawah.
- Logo resmi punya alt text ("Mahreen Indonesia" di header dan footer, "Logo" diikuti nama unit di halaman Karya dan Anak Muda). Versi crimson dipakai di latar terang, versi putih di latar gelap. Setiap logo punya ukuran tampil tetap, jadi teks di sekitarnya tidak bergeser saat gambar dimuat.

## Teknis

- **HTML, CSS, dan JavaScript murni.** Tanpa framework, tanpa build tool, tanpa npm.
- **Konten dipisah dari tampilan.** Semua konten ada di `js/data.js` sebagai `const MAHREEN = { ... };`, dan dirender oleh `js/main.js`.
- **Satu `main.js` untuk empat halaman.** Setiap halaman memuat file yang sama. `main.js` membaca `data-page` pada `<body>` (`beranda`, `karya`, `anak-muda`, atau `mulai`) untuk menentukan bagian mana yang dirender.
- **Tidak memakai `fetch()` atau `type="module"`.** Keduanya diblokir browser saat halaman dibuka langsung tanpa server. Sebagai gantinya, `data.js` dan `main.js` dimuat berurutan dengan `<script defer>` biasa.
- **Tetap terbaca tanpa JavaScript.** Header, navigasi, footer, teks hero, dan judul setiap halaman ditulis langsung di HTML.
- **Tanpa pergeseran tata letak.** Isi halaman dalam dirender sesaat setelah halaman tampil. Supaya tautan "Lanjut" dan footer tidak terdorong ke bawah di depan pembaca, keduanya disembunyikan (tetap memakan tempat) sampai `main.js` selesai. Kalau JavaScript gagal di tengah jalan, keduanya tetap muncul setelah 2 detik.
- **Pilihan minat di URL.** Halaman Mulai memakai `history.replaceState`, jadi mengganti pilihan tidak menambah riwayat browser dan tombol Back tetap kembali ke halaman sebelumnya.
- **Teks aman.** Semua teks dari data dimasukkan lewat `textContent`, bukan `innerHTML`.
- **Font Google tidak menahan tampilan.** Font dimuat tanpa memblokir render; sampai font siap, teks tampil dengan font sistem.

## Cara menjalankan

Tidak perlu instalasi.

- **Paling cepat:** klik dua kali `index.html`.
- **Lewat server lokal** (opsional, supaya perilakunya sama dengan saat di-deploy):

  ```bash
  python3 -m http.server 8000
  ```

  lalu buka `http://localhost:8000`.

## Cara memperbarui `js/data.js`

Semua konten ada di satu objek `MAHREEN`. Mengubah isi halaman cukup di file ini, tanpa menyentuh HTML, CSS, atau `main.js`.

| Kunci | Tampil di | Isi |
|---|---|---|
| `profil` | Beranda, "Kenalan dulu sama Mahreen" | `visi`, `misi` (daftar), `nilai` (tiga kata kunci: `en` dan padanan `id`), `sumber` |
| `unit` | Karya | Satu objek per unit: `nama`, `bidang`, `apa`, `contoh`, `sumber`, `akun`, `akunUrl` |
| `kegiatanBersama` | Karya, "Juga dari Mahreen Indonesia" | `judul`, `tanggal`, `keterangan`, `sumber` |
| `internship` | Anak Muda, juga catatan di Mulai | `ringkas`, `periodeBatch2`, `statusPendaftaran`, `benefit`, `posisi` per `grup`, `mentorBatch2`, `penghargaanBatch1`, `sumber`, `ikuti` (`label` tombol, `akun` sebagai keterangan kecil di bawahnya, `url`) |
| `minat` | Mulai | Satu objek per pilihan: `id` (juga dipakai di URL), `label`, `posisi`, `unit`, `akun` |
| `akun` | Footer semua halaman | `nama`, `fungsi`, `url` |
| `kontak` | Footer semua halaman | `website`, `email`, `whatsapp`, `whatsappUrl`, `alamat` |

Aturan kecil yang perlu diingat:

- Setiap `sumber` berisi `label` (akun dan tanggal unggahan) dan `url` (tautan ke unggahannya). Di halaman, hanya nama akun di `label` yang menjadi tautan: akun pertama memakai `url`, akun berikutnya (kalau ada) memakai alamat akunnya dari `akun`.
- `contoh: null` pada unit berarti belum ada contoh nyata. Unit itu tampil ringkas tanpa kotak contoh.
- `posisi: []` pada minat berarti tidak ada posisi magang yang berkaitan. Blok posisinya tidak ditampilkan.
- `id` pada minat muncul di alamat halaman (`mulai.html?minat=id`). Kalau `id` diganti, tautan lama yang sudah dibagikan tidak akan memilih apa pun, tapi halamannya tetap terbuka normal.
- Jumlah pada judul "10 kategori penghargaan Batch 1" dihitung otomatis dari panjang `penghargaanBatch1`.

Contoh menambah unit baru:

```js
{
  "id": "unit-baru",                  // unik, huruf kecil dan tanda hubung
  "nama": "Nama Unit",
  "bidang": "Bidang unit",
  "apa": "Satu kalimat netral tentang apa yang dikerjakan unit ini.",
  "contoh": null,                     // atau satu kalimat contoh nyata dari unggahan
  "sumber": {
    "label": "@akun, 1 Oktober 2026",
    "url": "https://www.instagram.com/p/..."
  },
  "akun": "@akun",
  "akunUrl": "https://www.instagram.com/akun/"
}
```

## Struktur folder

```
/
├─ index.html          Beranda (data-page="beranda")
├─ karya.html          Karya (data-page="karya")
├─ anak-muda.html      Anak Muda (data-page="anak-muda")
├─ mulai.html          Mulai (data-page="mulai")
├─ css/
│  ├─ tokens.css       design tokens: warna, huruf, jarak, gerak
│  ├─ base.css         reset, tipografi dasar, grid, fokus, reduced motion
│  └─ components.css   semua komponen, urut sesuai alur halaman
├─ js/
│  ├─ data.js          semua konten (objek MAHREEN)
│  └─ main.js          fungsi render, menu, dan pemilihan per halaman lewat data-page
└─ assets/
   ├─ logo/            logo resmi versi crimson dan putih (lihat assets/logo/README.md)
   ├─ favicon.svg      motif bunga empat kelopak
   └─ og-image.png     gambar pratinjau saat tautan dibagikan (1200 x 630)
```

Header dan footer ditulis ulang di setiap file HTML (bukan disisipkan lewat JavaScript) supaya tetap tampil tanpa JavaScript. Kalau salah satunya diubah, ubah di keempat file.

## Deploy

Situs statis, jadi bisa langsung di-deploy tanpa langkah build.

- **GitHub Pages:** Settings, Pages, pilih branch dan folder root.
- **Vercel:** import repo, pilih framework "Other", dan kosongkan build command.

### Sebelum deploy

- [ ] Ganti setiap `sumber.url` di `js/data.js` dengan tautan unggahan asli (tombol Bagikan di Instagram). Saat ini masih mengarah ke halaman akun.
- [ ] Ganti nilai warna di `css/tokens.css` dengan hasil color picker dari template Canva resmi.
- [ ] Ganti motif bunga dengan motif asli dari template.
- [ ] Cek manual semua tautan Instagram, website, email, dan WhatsApp.

### Setelah deploy

- [ ] Di keempat file HTML, ganti `og:image` dengan alamat lengkap (`https://.../assets/og-image.png`) dan tambahkan `og:url` sesuai alamat halamannya. WhatsApp, LinkedIn, dan Facebook tidak membaca alamat relatif.
- [ ] Coba bagikan tautan setiap halaman sekali untuk memastikan pratinjaunya muncul.

## Hasil pengecekan

- **Lighthouse** (mobile dan desktop, keempat halaman): Performance 99 sampai 100, Accessibility 100, Best Practices 96, SEO 100. Poin Best Practices berkurang karena Google Fonts diblokir di lingkungan pengujian.
- **Audit axe** (WCAG 2.2 AA): tidak ada pelanggaran di keempat halaman, termasuk saat menu terbuka dan saat minat dipilih.
- **Responsif:** tanpa scroll horizontal di lebar 320px, 360px, 768px, dan 1280px. Baris teks terpanjang 73 karakter.
- **Keyboard:** semua elemen bisa dicapai dengan Tab dalam urutan yang logis, dengan garis fokus yang terlihat. Menu bisa dibuka dan ditutup dengan keyboard, dan halaman Mulai bisa dipakai dengan panah dan spasi.
- **Tanpa JavaScript:** navigasi, judul, bagian Jelajahi, dan blok "Lanjut" tetap tampil.
