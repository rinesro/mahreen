# Sorotan Mahreen

Rangkuman tidak resmi program, kegiatan, dan kolaborasi Mahreen Indonesia, disusun dari unggahan Instagram publik mereka (Mei sampai September 2026).

Dibuat oleh Sandhika Hamzah (Universitas Gunadarma) untuk Creative Challenge Mahreen Indonesia Internship Batch 2, posisi Website Development. Tema: **Berkarya untuk Indonesia**.

> Halaman ini bukan website resmi Mahreen Indonesia. Untuk informasi terbaru, cek akun resmi mereka.

## Latar masalah

Dari brief Mahreen: program, kegiatan, dan peluang Mahreen Indonesia belum selalu mudah dikenal, dipahami, dan diikuti oleh generasi muda.

Temuan dari observasi Instagram Mahreen (Mei sampai September 2026):

1. Informasi tersebar di minimal lima akun: @mahreenindonesia, @tanyamahreen, @pedulimahreen, @mahreencsr, dan @mahreenindonesiainternship.
2. Unggahan yang menjelaskan siapa Mahreen mendapat sekitar 6 sampai 9 like, sedangkan unggahan kolaborasi mendapat 109 sampai 143 like.
3. Belum ada satu tempat yang merangkum semua kegiatan dan menandai statusnya.

## Konsep

Satu halaman kurasi yang merangkum semuanya, dengan pola yang sudah akrab bagi anak muda:

- **Dikenal:** highlight kategori ala Instagram dan timeline menunjukkan semua yang dirangkum.
- **Dipahami:** setiap item dijelaskan singkat, dengan bahasa netral dari sudut pandang pihak luar.
- **Diikuti:** setiap item punya label status (Sedang berjalan, Segera hadir, Sudah berlangsung), keterangan sumber, dan tautan ke unggahan aslinya. Tombol ikuti akun hanya muncul kalau datanya ada.

Isi halaman:

1. Header dan hero (pola baca Z).
2. Highlight kategori: Program, Kegiatan, Kolaborasi, Segera Hadir. Klik membuka story viewer.
3. Timeline (pola baca F) dengan filter status yang tersinkron ke URL, misalnya `#timeline?status=sedang-berjalan`.
4. Satu Mahreen, lima akun.
5. Footer gelap dengan kontak resmi dan catatan bahwa halaman ini tidak resmi.

## Keputusan desain

**Sudut pandang.** Semua teks ditulis sebagai rangkuman pihak luar: tanpa kata "kami", tanpa bahasa promosi, dan tanpa asumsi. Setiap klaim menyebut sumbernya, dan informasi yang tidak ada di unggahan ditulis apa adanya.

**Warna.** Gaya kampanye Mahreen (magenta, pink, kelopak oranye) untuk halaman, dan gaya gelap bertekstur hanya untuk footer. Semua nilai ada di `css/tokens.css`.

- Warna status punya makna. Sedang berjalan memakai magenta penuh, Segera hadir oranye, dan Sudah berlangsung abu-abu garis tepi. Teks label selalu ada, jadi informasinya tidak bergantung pada warna saja.
- Oranye tidak dipakai sebagai warna teks, dan teks putih tidak dipakai di atas oranye. Kontrasnya di bawah 4,5:1, jadi label oranye memakai teks gelap.

**Tipografi.** Poppins untuk judul, Plus Jakarta Sans untuk teks. Skala ukurannya kelipatan 1,25 dari 16px, dan panjang baris dibatasi 45 sampai 75 karakter.

**Hierarki.** Setiap item punya tiga tingkat: meta (status dan tanggal) kecil, judul besar dan tebal, lalu ringkasan dengan ukuran baca normal. Memindai judulnya saja sudah cukup untuk paham.

**Gestalt.**
- Proximity: elemen dalam satu item rapat, jarak antar item lebar.
- Similarity: tiap kategori punya satu ikon yang dipakai di timeline, highlight, dan story.
- Continuity: garis vertikal timeline menuntun mata.
- Common region: highlight berbentuk lingkaran.

**Grid dan ruang.** 4 kolom di HP dan 12 kolom mulai 1024px. Semua jarak kelipatan 8px. Area sentuh minimal 48px.

**Motion.** Hanya untuk merespons aksi pengguna: ganti filter, buka tutup story, dan ganti slide. Semua gerak mati otomatis kalau pengguna memilih `prefers-reduced-motion`.

**Aksesibilitas.**
- HTML semantik dan skip link.
- Garis fokus terlihat saat navigasi keyboard.
- Chip filter memakai `aria-pressed`, dan jumlah hasil diumumkan lewat `aria-live`.
- Story viewer memakai `<dialog>`: fokus terkunci di dalam, Esc menutup, lalu fokus kembali ke highlight yang membukanya.
- Setiap tautan "Lihat unggahan aslinya" diberi judul item untuk screen reader.

**Teknis.**
- HTML, CSS, dan JavaScript murni, tanpa framework dan tanpa langkah build.
- Data disimpan di `js/data.js`, bukan file `.json` dengan `fetch()`, karena browser memblokir `fetch()` ke file lokal saat `index.html` dibuka langsung.
- Dengan alasan yang sama, semua script memakai `<script defer>` klasik, bukan module.
- Font Google dimuat tanpa menahan tampilan halaman.

## Cara menjalankan

Tidak perlu instalasi apa pun.

- **Paling cepat:** klik dua kali `index.html`.
- **Lewat server lokal** (opsional, supaya perilakunya sama dengan saat di-deploy):

  ```bash
  python3 -m http.server 8000
  ```

  lalu buka `http://localhost:8000`.

## Cara menambah kegiatan

Semua konten ada di `js/data.js`. Tambahkan satu objek ke array `KEGIATAN`, tanpa perlu mengubah file lain. Timeline, jumlah item di highlight, dan story viewer akan ikut diperbarui.

```js
{
  "id": "contoh-kegiatan",             // unik, huruf kecil dan tanda hubung
  "kategori": "kegiatan",              // program, kegiatan, kolaborasi, atau segera-hadir
  "judul": "Judul kegiatan",
  "tanggal": "2026-09-20",             // format YYYY-MM-DD, atau null kalau tidak ada tanggal
  "tanggalLabel": "20 September 2026", // teks tanggal yang ditampilkan
  "status": "sudah-berlangsung",       // sedang-berjalan, sudah-berlangsung, atau segera-hadir
  "online": true,                      // opsional, tampil sebagai label "Online"
  "ringkasan": "Satu atau dua kalimat netral, bersumber dari unggahan.",
  "detail": ["Poin detail yang tampil di story viewer."],
  "sumber": {                          // wajib
    "label": "@mahreenindonesia, 20 September 2026",
    "url": "https://www.instagram.com/p/..."
  },
  "ikuti": null                        // atau { "label": "Ikuti @akun", "url": "..." }
}
```

Urutan tampil diatur otomatis. Item tanpa tanggal ada di atas, lalu item bertanggal dari yang terbaru.

## Struktur folder

```
/
├─ index.html          kerangka halaman, sprite ikon SVG, dan dialog story
├─ css/
│  ├─ tokens.css       design tokens: warna, huruf, jarak, gerak
│  ├─ base.css         reset, tipografi dasar, grid, fokus, reduced motion
│  └─ components.css   semua komponen halaman
├─ js/
│  ├─ data.js          data kegiatan (KEGIATAN)
│  ├─ main.js          label dan fungsi bersama
│  ├─ timeline.js      timeline, filter status, dan sinkron URL hash
│  └─ story.js         highlight kategori dan story viewer
└─ assets/
   ├─ favicon.svg
   └─ og-image.png     gambar pratinjau saat tautan dibagikan
```

## Deploy

Situs statis, jadi bisa langsung di-deploy tanpa langkah build.

- **GitHub Pages:** Settings, Pages, pilih branch dan folder root.
- **Vercel:** import repo, pilih framework "Other", kosongkan build command.

## Sebelum deploy

- [ ] Ganti setiap `sumber.url` di `js/data.js` dengan tautan unggahan asli (tombol Bagikan di Instagram). Saat ini masih mengarah ke halaman akun.
- [ ] Setelah dapat alamat situs, ganti `og:image` di `index.html` dengan alamat lengkap (`https://.../assets/og-image.png`) dan tambahkan `og:url`.
- [ ] Ganti nilai warna di `css/tokens.css` dengan hasil color picker dari template Canva resmi.
- [ ] Ganti wordmark di header dengan logo resmi, dan motif bunga dengan motif asli dari template.
- [ ] Cek manual semua tautan Instagram, TikTok, YouTube, dan WhatsApp.

## Hasil pengecekan

- Lighthouse (mobile dan desktop): Performance 100, Accessibility 100, Best Practices 96, SEO 100. Poin Best Practices berkurang karena Google Fonts diblokir di lingkungan pengujian.
- Audit axe (WCAG 2.1 AA): tidak ada pelanggaran, baik di halaman maupun di story viewer.
- Tanpa scroll horizontal di lebar 360px, 768px, dan 1280px.
