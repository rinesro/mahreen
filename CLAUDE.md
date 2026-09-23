# Sorotan Mahreen

Website sederhana untuk Creative Challenge Mahreen Indonesia Internship Batch 2, posisi Website Development.
Dikerjakan oleh Sandhika Hamzah (Universitas Gunadarma).

Tema challenge: **BERKARYA UNTUK INDONESIA** (Satu Ide. Satu Karya. Satu Dampak.)

## Cara kerja yang saya minta

- Kerjakan **satu tahap per sesi perintah**. Setelah satu tahap selesai, berhenti, tampilkan ringkasan perubahan, lalu tunggu persetujuan saya sebelum membuat commit.
- Satu tahap = satu commit dengan pesan format Conventional Commits dalam bahasa Indonesia (contoh: `feat: tambah timeline kegiatan`).
- Jelaskan singkat keputusan teknis yang tidak jelas, supaya saya paham dan bisa menjelaskannya ulang.
- Jangan menambah fitur di luar brief ini tanpa bertanya.

## Masalah yang diselesaikan

Dari brief Mahreen: program, kegiatan, dan peluang Mahreen Indonesia **belum selalu mudah dikenal, dipahami, dan diikuti** oleh generasi muda. Mahreen ingin komunikasi yang **menarik, mudah dipahami, dan relevan**.

Temuan dari observasi Instagram Mahreen (Mei sampai September 2026):
1. Informasi tersebar di minimal lima akun: @mahreenindonesia, @tanyamahreen, @pedulimahreen, @mahreencsr, @mahreenindonesiainternship.
2. Postingan yang menjelaskan siapa Mahreen mendapat sekitar 6 sampai 9 like, sedangkan postingan kolaborasi mendapat 109 sampai 143 like.
3. Belum ada satu tempat yang merangkum semua kegiatan dan menandai mana yang masih bisa diikuti.

## Konsep

Satu halaman pusat informasi bernama **Sorotan Mahreen** yang merangkum program, kegiatan, dan kolaborasi Mahreen, dengan pola yang sudah akrab bagi anak muda (highlight ala Instagram), dan label status yang jelas.

- **Dikenal:** highlight kategori dan timeline menunjukkan semua yang Mahreen lakukan.
- **Dipahami:** setiap item dijelaskan singkat dengan bahasa santai.
- **Diikuti:** setiap item punya label status. Tombol aksi hanya muncul untuk yang masih bisa diikuti. Item yang sudah lewat diberi ajakan untuk mengikuti akun terkait supaya tidak ketinggalan kegiatan berikutnya.

Cakupan data: **sorotan Mei sampai September 2026**. Halaman harus jujur menyebut ini dan mengarahkan ke Instagram untuk kegiatan lainnya.

## Tech stack

- **HTML, CSS, dan JavaScript murni.** Tanpa framework, tanpa build tool, tanpa npm. Website harus bisa dibuka dengan klik dua kali `index.html` dan langsung di-deploy sebagai situs statis.
- CSS biasa dengan custom properties sebagai design tokens.
- Semua konten kegiatan disimpan di `js/data.js` sebagai satu konstanta global (`const KEGIATAN = [...]`), terpisah dari tampilan. Menambah kegiatan baru cukup dengan menambah satu entri tanpa mengubah kode lain.
  - Alasan tidak memakai file `.json` dengan `fetch()`: browser memblokir `fetch()` ke file lokal saat `index.html` dibuka langsung tanpa server. Dengan `data.js` yang dimuat lewat tag `<script>` biasa, website tetap jalan di mana pun.
  - Dengan alasan yang sama, pakai `<script>` klasik (bukan `type="module"`), dimuat berurutan dengan atribut `defer`: `data.js` dulu, lalu `main.js`.
- Ikon: SVG inline dengan gaya garis dan ketebalan stroke yang sama.
- Font dari Google Fonts lewat tag `<link>`.
- Deploy sebagai situs statis ke Vercel atau GitHub Pages langsung dari repo, tanpa langkah build.

Struktur folder:

```
/
├─ index.html
├─ css/
│  ├─ tokens.css
│  ├─ base.css
│  └─ components.css
├─ js/
│  ├─ data.js
│  └─ main.js
├─ assets/          (favicon, gambar, ikon)
└─ README.md
```

Kalau `main.js` terlalu panjang, boleh dipecah per bagian (misalnya `timeline.js`, `story.js`) selama tetap memakai script klasik dan urutan pemuatannya jelas.

## Struktur halaman

1. **Header:** wordmark "Mahreen Indonesia" (nanti diganti logo resmi dari template Canva), navigasi: Program, Timeline, Akun Resmi.
2. **Hero** (pola baca Z):
   - Judul: "Semua yang Mahreen lakukan untuk anak muda, dalam satu halaman."
   - Subjudul: "Program, kegiatan, dan kolaborasi Mahreen Indonesia tersebar di lima akun Instagram. Di sini semuanya dirangkum, lengkap dengan mana yang masih bisa kamu ikuti."
   - Keterangan kecil: "Sorotan Mei sampai September 2026"
   - Tombol utama: "Lihat yang bisa kamu ikuti" (scroll ke timeline dengan filter "Bisa diikuti" aktif)
   - Tombol kedua: "Jelajahi timeline"
   - Motif bunga empat kelopak dari template sebagai elemen dekoratif.
3. **Highlight kategori:** empat lingkaran ala highlight Instagram: Program, Kegiatan, Kolaborasi, Segera Hadir. Klik membuka **story viewer** berisi item kategori tersebut.
4. **Timeline** (pola baca F):
   - Filter chip: Semua, Bisa diikuti, Sedang berjalan, Sudah berlangsung, Segera hadir.
   - Garis vertikal timeline di kiri, item urut dari terbaru.
   - Setiap item: label status dan tanggal (kecil), judul (besar, tebal), ringkasan (ukuran baca normal), lalu tombol aksi atau ajakan follow.
   - Penutup timeline: "Masih banyak kegiatan sebelumnya. Lihat selengkapnya di @mahreenindonesia."
5. **Satu Mahreen, lima akun:** daftar akun Instagram resmi beserta fungsi masing-masing (lihat data di bawah).
6. **Footer** (gaya gelap, jembatan ke identitas korporat Mahreen): tagline "Satu ide. Satu karya. Satu dampak.", alamat, kontak, tautan sosial media, dan baris kredit: "Prototype oleh Sandhika Hamzah untuk Creative Challenge Mahreen Indonesia Internship Batch 2."

## Story viewer

- Tampil layar penuh di HP, di tengah layar dengan latar gelap di desktop.
- Progress bar di atas, satu segmen per slide.
- Navigasi: ketuk kanan atau kiri, swipe di HP, tombol panah keyboard, Esc untuk menutup, tombol tutup yang jelas.
- Tidak auto-play, supaya pengguna membaca dengan tempo sendiri.
- Aksesibel: `role="dialog"`, `aria-modal`, fokus terkunci di dalam dialog, fokus kembali ke highlight saat ditutup.
- Setiap slide menampilkan: label status, judul, ringkasan, poin detail, dan tombol aksi jika ada.

## Arahan desain (prinsip desain grafis dan DKV)

**Identitas visual.** Pakai gaya kampanye Mahreen (magenta, pink, kelopak oranye) sebagai gaya utama. Gaya gelap bertekstur hanya untuk footer. Nilai hex di bawah adalah perkiraan; saya akan menggantinya dengan hasil color picker dari template Canva resmi.

| Token | Perkiraan | Peran |
|---|---|---|
| `--color-primary` | `#D1227A` | Tombol, label "Bisa diikuti", aksen |
| `--color-secondary` | `#930D3C` | Judul dan teks penting |
| `--color-accent` | `#F2653A` | Label "Segera hadir", motif dekoratif |
| `--color-bg` | `#FFF5F9` | Latar utama |
| `--color-ink` | `#2B0B1D` | Teks utama |
| `--color-neutral` | `#6B6470` | Label "Sudah berlangsung", teks sekunder |
| `--color-dark` | `#1C1A1D` | Footer |

**Warna status bermakna.** Makin bisa ditindaklanjuti, makin kuat warnanya: Bisa diikuti (magenta penuh), Sedang berjalan (magenta garis tepi), Segera hadir (oranye), Sudah berlangsung (abu-abu garis tepi). Selalu sertakan teks label, jangan hanya warna.

**Hierarki.** Tiga tingkat per item: meta (status dan tanggal), judul, ringkasan. Orang harus bisa memindai judul saja dan sudah paham.

**Tipografi.** Poppins untuk judul (konsisten dengan materi Mahreen), Plus Jakarta Sans untuk teks. Maksimal dua keluarga font. Skala ukuran kelipatan 1,25. Panjang baris 45 sampai 75 karakter.

**Gestalt.** Proximity: elemen dalam satu item dirapatkan, jarak antar item dilebarkan. Similarity: tiap kategori punya satu ikon dan perlakuan yang konsisten. Continuity: garis timeline menuntun mata. Common region: highlight berbentuk lingkaran ala Instagram.

**Grid dan ruang.** 12 kolom di desktop, 4 kolom di HP. Sistem jarak kelipatan 8px. Beri ruang kosong yang cukup.

**Ikon dan motif.** Ikon garis seragam. Motif bunga empat kelopak dipakai secukupnya (hero dan cincin highlight), tidak di setiap bagian.

**Motion.** Hanya untuk merespons aksi pengguna (buka tutup story, ganti filter). Hormati `prefers-reduced-motion`.

**Mobile first dan aksesibilitas.** Desain dari layar HP dulu. Kontras teks minimal 4,5:1. Area sentuh minimal 44px. Fokus keyboard terlihat jelas. HTML semantik.

## Aturan konten (wajib)

- Jangan pernah memakai em dash atau en dash di teks mana pun. Pakai koma, titik, atau kata "sampai".
- Bahasa Indonesia santai tapi sopan, kalimat pendek, sapaan "kamu".
- Jangan mengarang fakta, link pendaftaran, harga, atau jadwal. Hanya pakai data di file ini.
- Jangan menampilkan foto atau nama pribadi orang (mentor, penerima penghargaan, struktur organisasi).
- Hindari tampilan generik: jangan pakai label huruf kapital semua di atas setiap judul, jangan tambahkan panah "→" di setiap tombol, jangan jadikan semua konten kartu identik dengan bayangan yang sama.

## Data kegiatan

Salin data ini ke `js/data.js` dalam bentuk `const KEGIATAN = [ ... ];` (isi array sama persis dengan di bawah). Nilai `status`: `bisa-diikuti`, `sedang-berjalan`, `sudah-berlangsung`, `segera-hadir`. Nilai `kategori`: `program`, `kegiatan`, `kolaborasi`, `segera-hadir`.

```json
[
  {
    "id": "tanya-mahreen",
    "kategori": "program",
    "judul": "Tanya Mahreen",
    "tanggal": null,
    "tanggalLabel": "Layanan aktif",
    "status": "bisa-diikuti",
    "ringkasan": "Partner kreatif dan digital untuk UMKM, brand, dan bisnis yang ingin naik level.",
    "detail": [
      "Layanan utama: website, branding, social media management, dan creative design.",
      "Cocok kalau kamu punya usaha, atau ingin membantu usaha keluarga dan teman agar makin dikenal."
    ],
    "aksi": { "label": "Kenalan dengan Tanya Mahreen", "url": "https://www.instagram.com/tanyamahreen/" }
  },
  {
    "id": "peduli-mahreen",
    "kategori": "program",
    "judul": "Peduli Mahreen",
    "tanggal": null,
    "tanggalLabel": "Program aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Gerakan sosial dan kemanusiaan dari Mahreen Indonesia.",
    "detail": [
      "Kepedulian: menumbuhkan rasa peduli dan empati untuk lingkungan yang lebih baik.",
      "Edukasi: memberi edukasi dan inspirasi untuk generasi yang berpengetahuan dan berkarakter.",
      "Bantuan sosial: menyalurkan bantuan secara tepat dan berkelanjutan.",
      "Pemberdayaan: membantu masyarakat berkembang, mandiri, dan bermanfaat bagi sekitarnya."
    ],
    "aksi": { "label": "Ikuti @pedulimahreen", "url": "https://www.instagram.com/pedulimahreen/" }
  },
  {
    "id": "mahreen-studio",
    "kategori": "program",
    "judul": "Mahreen Studio",
    "tanggal": null,
    "tanggalLabel": "Program aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Unit Mahreen di bidang creative lifestyle dan fashion.",
    "detail": [
      "Informasi lengkapnya belum banyak dibagikan. Pantau kabarnya di akun utama Mahreen."
    ],
    "aksi": { "label": "Ikuti @mahreenindonesia", "url": "https://www.instagram.com/mahreenindonesia/" }
  },
  {
    "id": "mahreen-csr",
    "kategori": "program",
    "judul": "Mahreen CSR",
    "tanggal": null,
    "tanggalLabel": "Program aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Unit yang mengurus kemitraan dan tanggung jawab sosial Mahreen.",
    "detail": [
      "Semua pengumuman kolaborasi resmi Mahreen dibagikan lewat akun ini."
    ],
    "aksi": { "label": "Ikuti @mahreencsr", "url": "https://www.instagram.com/mahreencsr/" }
  },
  {
    "id": "mahreen-internship",
    "kategori": "program",
    "judul": "Mahreen Indonesia Internship",
    "tanggal": "2026-10-01",
    "tanggalLabel": "Batch 2: 1 Oktober 2026 sampai 31 Januari 2027",
    "status": "sedang-berjalan",
    "online": true,
    "ringkasan": "Program magang remote (WFH atau WFA), jadi bisa diikuti dari mana saja di Indonesia.",
    "detail": [
      "Benefit: learning dan mentoring, pengalaman proyek nyata, portofolio profesional, peluang fee berbasis proyek, sertifikat dan jam belajar, serta jaringan ekosistem.",
      "Posisi Batch 2: Graphic Design, Video Editor, Social Media Management, UI/UX, Frontend Development, Backend Development, serta Business Development dan Partnership.",
      "Pendaftaran Batch 2 sudah ditutup."
    ],
    "aksi": { "label": "Pantau batch berikutnya", "url": "https://www.instagram.com/mahreenindonesiainternship/" }
  },
  {
    "id": "peduli-mahreen-kenalan",
    "kategori": "kegiatan",
    "judul": "Peduli Mahreen memperkenalkan diri",
    "tanggal": "2026-06-29",
    "tanggalLabel": "29 Juni 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Peduli Mahreen membagikan cerita awal perjalanan, visi misi, dan aksi sosial yang sedang diperjuangkan.",
    "detail": [
      "Mereka juga mengajak followers menyampaikan isu sosial yang menurut mereka paling mendesak."
    ],
    "aksi": { "label": "Ikuti @pedulimahreen", "url": "https://www.instagram.com/pedulimahreen/" }
  },
  {
    "id": "seminar-ai-umkm",
    "kategori": "kegiatan",
    "judul": "Seminar AI for UMKM: Grow Your Business with AI",
    "tanggal": "2026-07-18",
    "tanggalLabel": "18 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Seminar gratis tentang cara AI membantu UMKM meningkatkan produktivitas dan pertumbuhan bisnis.",
    "detail": [
      "Benefit peserta: e-certificate, belajar dari pembicara profesional, dan strategi memakai AI untuk UMKM."
    ],
    "aksi": { "label": "Ikuti @mahreenindonesia untuk seminar berikutnya", "url": "https://www.instagram.com/mahreenindonesia/" }
  },
  {
    "id": "seminar-nasional-level-up",
    "kategori": "kegiatan",
    "judul": "Seminar Nasional: Level Up Your Brand",
    "tanggal": "2026-08-08",
    "tanggalLabel": "8 Agustus 2026",
    "status": "sudah-berlangsung",
    "online": true,
    "ringkasan": "Seminar online via Zoom tentang strategi digital marketing dan solusi keuangan digital untuk UMKM.",
    "detail": [
      "Dua sesi: Digital Marketing Strategy dan Digital Financial Solutions.",
      "Benefit peserta: e-certificate nasional, AI prompt kit untuk bisnis, digital marketing checklist, content calendar 30 hari, dan Canva template pack."
    ],
    "aksi": { "label": "Ikuti @mahreenindonesia untuk seminar berikutnya", "url": "https://www.instagram.com/mahreenindonesia/" }
  },
  {
    "id": "best-internship-awards-1",
    "kategori": "kegiatan",
    "judul": "Best Internship Awards Batch 1",
    "tanggal": "2026-08-30",
    "tanggalLabel": "30 Agustus sampai 1 September 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Penghargaan untuk peserta magang Batch 1 dalam 10 kategori.",
    "detail": [
      "Kategori: Best Intern of the Batch, Most Outstanding Intern, Most Consistent Intern, Most Engaged Intern, Most Creative Designer, Creative Editing Award, Best Content Strategist, Web Innovator Award, Best Team Player, dan Most Improved Intern."
    ],
    "aksi": { "label": "Lihat di @mahreenindonesiainternship", "url": "https://www.instagram.com/mahreenindonesiainternship/" }
  },
  {
    "id": "mentor-batch-2",
    "kategori": "kegiatan",
    "judul": "Perkenalan mentor Internship Batch 2",
    "tanggal": "2026-09-12",
    "tanggalLabel": "12 September 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Tiga mentor diperkenalkan untuk mendampingi peserta Batch 2.",
    "detail": [
      "Bidang mentoring: Website Development, Social Media Management, dan Graphic Design."
    ],
    "aksi": null
  },
  {
    "id": "open-recruitment-batch-2",
    "kategori": "kegiatan",
    "judul": "Open recruitment Internship Batch 2",
    "tanggal": "2026-09-14",
    "tanggalLabel": "14 September 2026",
    "status": "sudah-berlangsung",
    "online": true,
    "ringkasan": "Pembukaan pendaftaran magang Batch 2 dengan sistem kerja remote.",
    "detail": [
      "Pendaftaran sudah ditutup. Batch berikutnya akan diumumkan lewat Instagram."
    ],
    "aksi": { "label": "Pantau batch berikutnya", "url": "https://www.instagram.com/mahreenindonesiainternship/" }
  },
  {
    "id": "kolab-utb",
    "kategori": "kolaborasi",
    "judul": "Kerja sama dengan Universitas Teknologi Bandung",
    "tanggal": "2026-07-07",
    "tanggalLabel": "7 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Kolaborasi untuk mendukung dunia pendidikan dan pengembangan sumber daya manusia di Indonesia.",
    "detail": [],
    "aksi": null
  },
  {
    "id": "kolab-ntmy",
    "kategori": "kolaborasi",
    "judul": "Kemitraan dengan Nice To Meet You (NTMY)",
    "tanggal": "2026-07-12",
    "tanggalLabel": "12 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Kemitraan untuk memperkuat identitas merek dan membuka ruang bagi talenta muda lewat Mahreen Indonesia Internship.",
    "detail": [
      "Fokus kerja sama: pengembangan identitas merek, perencanaan logo, penguatan visual branding, dan pengembangan talenta kreatif."
    ],
    "aksi": null
  },
  {
    "id": "kolab-yayasan-fas",
    "kategori": "kolaborasi",
    "judul": "Kolaborasi dengan Yayasan Fauzan Adzima Sukajadi",
    "tanggal": "2026-07-24",
    "tanggalLabel": "24 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Kemitraan untuk mendukung gerakan kebaikan yang nyata dan berkelanjutan di bidang pendidikan dan sosial.",
    "detail": [],
    "aksi": null
  },
  {
    "id": "kolab-bem-utb",
    "kategori": "kolaborasi",
    "judul": "Official Partner BEM Universitas Teknologi Bandung",
    "tanggal": "2026-08-20",
    "tanggalLabel": "20 Agustus 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Awal dari berbagai program, ruang belajar, dan kesempatan bertumbuh bersama mahasiswa.",
    "detail": [],
    "aksi": null
  },
  {
    "id": "ajak-kolaborasi",
    "kategori": "kolaborasi",
    "judul": "Ajak Mahreen berkolaborasi",
    "tanggal": null,
    "tanggalLabel": "Terbuka",
    "status": "bisa-diikuti",
    "ringkasan": "Punya organisasi, komunitas, atau BEM kampus? Kamu bisa menghubungi Mahreen untuk menjajaki kerja sama.",
    "detail": [
      "Hubungi lewat email info@mahreenindonesia.com atau WhatsApp resmi Mahreen."
    ],
    "aksi": { "label": "Hubungi lewat WhatsApp", "url": "https://wa.me/6289652647385" }
  },
  {
    "id": "segera-hadir",
    "kategori": "segera-hadir",
    "judul": "Yang sedang disiapkan Mahreen",
    "tanggal": null,
    "tanggalLabel": "Segera hadir",
    "status": "segera-hadir",
    "ringkasan": "Mahreen mengumumkan beberapa hal baru yang sedang disiapkan.",
    "detail": [
      "Signature Collection",
      "Creative Collaboration",
      "Digital Services",
      "Social Programs",
      "Community Development",
      "Future Expansion"
    ],
    "aksi": { "label": "Ikuti @mahreenindonesia", "url": "https://www.instagram.com/mahreenindonesia/" }
  }
]
```

Catatan: semua URL Instagram dibuat dari nama akun yang terlihat di postingan. Saya akan mengecek setiap link secara manual sebelum deploy.

## Data akun resmi

| Akun | Fungsi |
|---|---|
| @mahreenindonesia | Akun utama: info umum, seminar, dan pengumuman |
| @tanyamahreen | Layanan kreatif dan digital untuk UMKM dan bisnis |
| @pedulimahreen | Gerakan sosial dan kemanusiaan |
| @mahreencsr | Kemitraan dan tanggung jawab sosial |
| @mahreenindonesiainternship | Program magang, mentor, dan penghargaan peserta |

Kontak resmi (dari kop surat Mahreen):
- Website: https://mahreenindonesia.com
- Email: info@mahreenindonesia.com
- WhatsApp: +62 896 5264 7385
- Alamat: Jl. Kebon Kopi No. 153, Kota Cimahi, Jawa Barat 40535
- Sosial lain: TikTok @mahreenindonesia, YouTube @officialmahreenindonesia, LinkedIn dan X "Mahreen Indonesia"

## Tahapan kerja

1. `chore`: struktur folder, `index.html` kerangka dasar, `.gitignore`, dan `js/data.js` berisi data kegiatan.
2. `feat`: design tokens dan base styles (warna, tipografi, spacing, fokus, reduced motion).
3. `feat`: header dan hero.
4. `feat`: timeline dengan render dari `KEGIATAN` dan filter status (termasuk filter dari tombol hero dan sinkron ke URL hash, misalnya `#timeline?status=bisa-diikuti`).
5. `feat`: highlight kategori dan story viewer.
6. `feat`: section akun resmi dan footer.
7. `fix`: pengecekan responsif (360px, 768px, 1280px), aksesibilitas keyboard, dan kontras.
8. `perf`: optimasi Lighthouse (target 90 ke atas di semua kategori), meta tag, Open Graph untuk preview link saat dibagikan.
9. `docs`: README berisi latar masalah, konsep, keputusan desain, cara menambah kegiatan lewat `js/data.js`, dan cara menjalankan proyek.

## Definisi selesai

- Semua item dari `js/data.js` tampil dengan label status yang benar.
- Filter dan story viewer berfungsi dengan mouse, sentuhan, dan keyboard.
- Tidak ada em dash atau en dash di seluruh teks.
- Tampilan rapi di HP dan desktop.
- Skor Lighthouse 90 ke atas.
- Bisa dibuka dengan klik dua kali `index.html` tanpa server.
- Sudah ter-deploy (Vercel atau GitHub Pages) dan link bisa dibuka publik.
