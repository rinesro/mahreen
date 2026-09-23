# Mahreen untuk Anak Muda

Website sederhana yang memperkenalkan Mahreen Indonesia kepada generasi muda lewat tema **Berkarya untuk Indonesia**.

Dibuat oleh Sandhika Hamzah (Universitas Gunadarma) untuk Creative Challenge Mahreen Indonesia Internship Batch 2, posisi Website Development. Semua informasi dirangkum dari unggahan publik Mahreen Indonesia, Mei sampai September 2026.

> Ini prototype, bukan website resmi Mahreen Indonesia. Untuk informasi terbaru, cek akun resmi mereka.

## Tugas

> Buat sebuah website sederhana yang menurut Anda dapat memperkenalkan Mahreen Indonesia kepada generasi muda dengan tema "BERKARYA UNTUK INDONESIA" dengan cara yang menarik, mudah dipahami, dan relevan.

Konteks dari studi kasus: program dan peluang Mahreen belum selalu mudah dikenal, dipahami, dan diikuti oleh generasi muda.

## Konsep

Tema "Berkarya untuk Indonesia" dipakai sebagai alur cerita halaman, dari atas ke bawah:

1. **Kenalan:** siapa Mahreen (visi, misi, dan tiga nilai).
2. **Karya:** bagaimana Mahreen berkarya lewat unit-unitnya, dengan contoh nyata dari unggahan mereka.
3. **Anak Muda:** ruang yang Mahreen sediakan untuk anak muda, yaitu program magang.
4. **Mulai:** pembaca memilih minatnya, lalu diarahkan ke posisi magang, unit, dan akun Mahreen yang relevan.

Setelah itu ada daftar lima akun Instagram resmi (karena informasi Mahreen tersebar di beberapa akun) dan footer berisi kontak resmi.

Kaitan dengan tiga kata kunci tugas:

- **Menarik:** alur bercerita dengan tema sebagai benang merah, visual mengikuti identitas kampanye Mahreen, dan satu bagian interaktif.
- **Mudah dipahami:** satu bagian satu pesan, bahasa sederhana, dan istilah Inggris pada tiga nilai diberi padanan bahasa Indonesia.
- **Relevan:** bagian Mulai menghubungkan minat pembaca (desain, konten, teknologi, bisnis, sosial) dengan bagian Mahreen yang berkaitan.

### Aturan isi

- Semua fakta hanya dari data di `js/data.js`. Tidak ada program, jadwal, manfaat, atau testimoni karangan.
- Contoh nyata dan fakta penting diberi keterangan sumber kecil (akun dan tanggal), dengan tautan ke unggahannya.
- Mahreen dibicarakan sebagai orang ketiga, dan pembaca disapa "kamu". Tidak memakai "kami" dan tidak memakai bahasa jualan.
- Tidak ada foto atau nama pribadi orang.
- Tidak ada em dash atau en dash di seluruh teks.

## Keputusan desain

**Pola baca.** Hero memakai pola Z: judul di kiri atas, motif bunga di kanan atas, subjudul menyilang ke bawah, lalu tombol di kiri bawah. Di tablet dan desktop pola ini terbentuk lewat grid; di HP semuanya bertumpuk.

**Hierarki.** Setiap bagian punya satu judul yang jelas, satu pengantar (satu pesan utama), lalu detail. Judul-judul bagian saja sudah cukup untuk memahami isi halaman.

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
- Similarity: semua unit punya struktur yang sama.
- Continuity: motif bunga kecil di depan judul empat bagian cerita menandai alurnya.
- Common region: kotak "Contoh nyata" berlatar oranye muda, dan bagian Mulai berada dalam satu panel putih.

**Variasi yang bermakna.** Blok unit tidak dibuat kartu identik. Unit yang punya contoh nyata dibagi dua di desktop (keterangan di kiri, contoh di kanan) sehingga contohnya mendapat ruang terbesar. Unit tanpa contoh tampil ringkas. Sorotan 10 kategori penghargaan menjadi satu-satunya blok berlatar merah tua.

**Grid dan ruang.** 4 kolom di HP dan 12 kolom mulai 1024px, jarak kelipatan 8px, dan area sentuh minimal 48px.

**Motion.** Hanya untuk merespons aksi pengguna: hasil di bagian Mulai muncul dengan fade pendek. Semua gerak mati kalau pengguna memilih `prefers-reduced-motion`.

**Aksesibilitas.**
- HTML semantik, skip link yang hanya muncul saat mendapat fokus, dan garis fokus yang terlihat saat navigasi keyboard.
- Bagian Mulai memakai radio button bawaan HTML yang ditampilkan seperti tombol pilihan. Perilaku radio group (satu pilihan aktif, panah untuk berpindah, dibaca "1 dari 5" oleh pembaca layar) sudah disediakan browser tanpa ARIA buatan. Hasilnya diumumkan lewat `aria-live="polite"`.
- Istilah bahasa Inggris ditandai `lang="en"` supaya dilafalkan dengan benar oleh pembaca layar.
- Tautan kecil di keterangan sumber diberi padding supaya area sentuhnya tetap sekitar 45px.

## Teknis

- **HTML, CSS, dan JavaScript murni.** Tanpa framework, tanpa build tool, tanpa npm.
- **Konten dipisah dari tampilan.** Semua konten ada di `js/data.js` sebagai `const MAHREEN = { ... };`, dan dirender oleh `js/main.js`.
- **Tidak memakai `fetch()` atau `type="module"`.** Keduanya diblokir browser saat `index.html` dibuka langsung tanpa server. Sebagai gantinya, `data.js` dan `main.js` dimuat berurutan dengan `<script defer>` biasa.
- **Teks aman.** Semua teks dari data dimasukkan lewat `textContent`, bukan `innerHTML`.
- **Tetap terbaca tanpa JavaScript.** Judul hero dan judul setiap bagian ditulis langsung di HTML, jadi tetap tampil kalau JavaScript gagal.
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
| `profil` | Kenalan | `visi`, `misi` (daftar), `nilai` (`en` dan padanan `id`), `sumber` |
| `unit` | Karya | Satu objek per unit: `nama`, `bidang`, `apa`, `contoh`, `sumber`, `akun`, `akunUrl` |
| `kegiatanBersama` | Karya, "Juga dari Mahreen Indonesia" | `judul`, `tanggal`, `keterangan`, `sumber` |
| `internship` | Anak Muda, juga catatan di Mulai | `ringkas`, `periodeBatch2`, `statusPendaftaran`, `benefit`, `posisi` per `grup`, `mentorBatch2`, `penghargaanBatch1`, `sumber`, `ikuti` |
| `minat` | Mulai | Satu objek per pilihan: `id`, `label`, `posisi`, `unit`, `akun` |
| `akun` | Satu Mahreen, lima akun | `nama`, `fungsi`, `url` |
| `kontak` | Footer | `website`, `email`, `whatsapp`, `whatsappUrl`, `alamat` |

Aturan kecil yang perlu diingat:

- Setiap `sumber` berisi `label` (akun dan tanggal unggahan) dan `url` (tautan ke unggahannya).
- `contoh: null` pada unit berarti belum ada contoh nyata. Unit itu tampil ringkas tanpa kotak contoh.
- `posisi: []` pada minat berarti tidak ada posisi magang yang berkaitan. Blok posisinya tidak ditampilkan.
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
├─ index.html          kerangka halaman, judul tiap bagian, dan sprite ikon SVG
├─ css/
│  ├─ tokens.css       design tokens: warna, huruf, jarak, gerak
│  ├─ base.css         reset, tipografi dasar, grid, fokus, reduced motion
│  └─ components.css   semua komponen, urut sesuai alur halaman
├─ js/
│  ├─ data.js          semua konten (objek MAHREEN)
│  └─ main.js          fungsi render tiap bagian
└─ assets/
   ├─ favicon.svg      motif bunga empat kelopak
   └─ og-image.png     gambar pratinjau saat tautan dibagikan (1200 x 630)
```

## Deploy

Situs statis, jadi bisa langsung di-deploy tanpa langkah build.

- **GitHub Pages:** Settings, Pages, pilih branch dan folder root.
- **Vercel:** import repo, pilih framework "Other", dan kosongkan build command.

### Sebelum deploy

- [ ] Ganti setiap `sumber.url` di `js/data.js` dengan tautan unggahan asli (tombol Bagikan di Instagram). Saat ini masih mengarah ke halaman akun.
- [ ] Ganti nilai warna di `css/tokens.css` dengan hasil color picker dari template Canva resmi.
- [ ] Ganti wordmark di header dengan logo resmi, dan motif bunga dengan motif asli dari template.
- [ ] Cek manual semua tautan Instagram, website, email, dan WhatsApp.

### Setelah deploy

- [ ] Ganti `og:image` di `index.html` dengan alamat lengkap (`https://.../assets/og-image.png`) dan tambahkan `og:url`. WhatsApp, LinkedIn, dan Facebook tidak membaca alamat relatif.
- [ ] Coba bagikan tautannya sekali untuk memastikan pratinjaunya muncul.

## Hasil pengecekan

- **Lighthouse** (mobile dan desktop): Performance 100, Accessibility 100, Best Practices 96, SEO 100. Poin Best Practices berkurang karena Google Fonts diblokir di lingkungan pengujian.
- **Audit axe** (WCAG 2.2 AA): tidak ada pelanggaran, sebelum dan sesudah memilih minat.
- **Responsif:** tanpa scroll horizontal di lebar 320px, 360px, 768px, dan 1280px. Baris teks terpanjang 73 karakter.
- **Keyboard:** 30 elemen bisa dicapai dengan Tab dalam urutan yang logis, semuanya dengan garis fokus yang terlihat. Bagian Mulai bisa dipakai dengan panah dan spasi.
- **Area sentuh:** semua tautan dan pilihan minimal 44px.
