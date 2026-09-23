# Mahreen untuk Anak Muda

Website sederhana untuk Creative Challenge Mahreen Indonesia Internship Batch 2, posisi Website Development.
Dikerjakan oleh Sandhika Hamzah (Universitas Gunadarma).

## Tugas

> Buat sebuah website sederhana yang menurut Anda dapat memperkenalkan Mahreen Indonesia kepada generasi muda dengan tema "BERKARYA UNTUK INDONESIA" dengan cara yang menarik, mudah dipahami, dan relevan.

Konteks dari studi kasus: program dan peluang Mahreen belum selalu mudah dikenal, dipahami, dan diikuti oleh generasi muda.

## Kondisi proyek saat ini

Kerangka HTML dan mungkin sebagian tampilan sudah dibuat berdasarkan konsep lama (katalog dan timeline kegiatan). Konsepnya sekarang **berubah menjadi website perkenalan**. Sesuaikan kode yang ada, jangan mulai dari nol:
- Pertahankan yang masih cocok (struktur folder, design tokens, base styles).
- Hapus bagian konsep lama: timeline, filter status, highlight kategori, dan story viewer.
- Situs sekarang **multi-halaman** (empat halaman), bukan satu halaman dengan tautan anchor.
- Ganti isi `js/data.js` dengan data baru di bawah.

## Cara kerja yang saya minta

- Kerjakan satu tahap per perintah. Setelah selesai, berhenti, tampilkan ringkasan perubahan, lalu tunggu persetujuan saya sebelum commit.
- Satu tahap = satu commit, format Conventional Commits dalam bahasa Indonesia.
- Jelaskan singkat keputusan teknis yang tidak jelas supaya saya paham.
- Jangan menambah fitur di luar brief ini tanpa bertanya.

## Konsep

Mahreen Indonesia diperkenalkan **lewat tema "Berkarya untuk Indonesia"**. Tema ini menjadi alur cerita yang dibagi ke empat halaman:
1. Siapa Mahreen.
2. Bagaimana Mahreen berkarya untuk Indonesia lewat unit-unitnya, dengan contoh nyata dari unggahan mereka.
3. Ruang yang Mahreen sediakan untuk anak muda.
4. Pembaca memilih minatnya dan diarahkan ke bagian Mahreen yang relevan.

Kaitan dengan kata kunci tugas:
- **Menarik:** alur bercerita dengan tema sebagai benang merah, visual mengikuti identitas kampanye Mahreen, satu halaman interaktif.
- **Mudah dipahami:** satu halaman satu tujuan, bahasa sederhana, istilah asing diberi padanan.
- **Relevan:** fokus pada hal yang bisa dihubungkan anak muda dengan minatnya sendiri.

## Aturan fakta dan bahasa (wajib)

- Semua fakta hanya dari data di file ini. Jangan mengarang program, link pendaftaran, harga, jadwal, manfaat, atau testimoni.
- Contoh nyata dan fakta penting diberi keterangan sumber kecil (akun dan tanggal), dengan tautan ke unggahannya.
- Membicarakan Mahreen sebagai orang ketiga ("Mahreen", "Peduli Mahreen"), menyapa pembaca dengan "kamu". Jangan memakai "kami".
- Tidak memakai bahasa jualan ("naik level", "solusi terbaik", "wujudkan impianmu", dan sejenisnya).
- Kalau informasinya belum ada, tulis apa adanya, jangan diisi asumsi.
- Jangan pernah memakai em dash atau en dash. Pakai koma, titik, atau kata "sampai".
- Jangan menampilkan foto atau nama pribadi orang (mentor, penerima penghargaan, struktur organisasi).

## Tech stack

- **HTML, CSS, dan JavaScript murni.** Tanpa framework, tanpa build tool, tanpa npm. Bisa dibuka dengan klik dua kali `index.html`.
- CSS dengan custom properties sebagai design tokens.
- Semua konten ada di `js/data.js` sebagai `const MAHREEN = { ... };`, dirender oleh `js/main.js`. Setiap halaman memuat kedua file ini, dan `main.js` membaca `document.body.dataset.page` untuk menentukan apa yang dirender. Tidak memakai `fetch()` atau `type="module"` karena keduanya diblokir saat file dibuka langsung tanpa server. Muat dengan `<script defer>`: `data.js` dulu, lalu `main.js`.
- Header, footer, teks hero, dan judul halaman ditulis langsung di HTML setiap halaman (tidak disisipkan lewat JS), supaya navigasi dan isi utama tetap tampil walaupun JavaScript gagal.
- Ikon SVG inline bergaya garis dengan ketebalan sama. Font dari Google Fonts.
- Deploy statis ke Vercel atau GitHub Pages.

```
/
├─ index.html       (Beranda)
├─ karya.html
├─ anak-muda.html
├─ mulai.html
├─ css/ (tokens.css, base.css, components.css)
├─ js/  (data.js, main.js)
├─ assets/
└─ README.md
```

## Struktur situs dan teks

Situs terdiri dari **empat halaman**. Tidak ada tautan anchor ke bagian di halaman yang sama, kecuali skip link untuk aksesibilitas.

### Elemen di semua halaman

- **Header:** logo (wordmark "Mahreen Indonesia" sementara, nanti diganti logo resmi) dan navigasi: Beranda, Karya, Anak Muda, Mulai. Halaman aktif ditandai secara visual dan dengan `aria-current="page"`. Di layar di bawah 480px, navigasi menjadi tombol "Menu" sederhana (disclosure dengan `aria-expanded`).
- **Tautan "Lanjut"** di akhir isi setiap halaman, mengarah ke halaman berikutnya dalam alur cerita: Beranda, lalu Karya, lalu Anak Muda, lalu Mulai. Teksnya menyebut tujuan, misalnya "Lanjut: Cara Mahreen berkarya".
- **Footer** (gaya gelap): tagline "Satu ide. Satu karya. Satu dampak.", daftar lima akun resmi dari `akun` beserta fungsinya, `kontak`, dan catatan: "Prototype oleh Sandhika Hamzah untuk Creative Challenge Mahreen Indonesia Internship Batch 2. Informasi dirangkum dari unggahan publik Mahreen Indonesia, Mei sampai September 2026. Untuk informasi terbaru, cek akun resmi."
- `<title>` dan meta description berbeda di setiap halaman.

### 1. Beranda (`index.html`, `data-page="beranda"`)

- **Hero** (pola baca Z)
  - Judul: "Berkarya untuk Indonesia. Kamu mulai dari mana?"
  - Subjudul: "Mahreen Indonesia adalah ekosistem kreatif, digital, bisnis, dan sosial. Lewat unit-unitnya, Mahreen berkarya di banyak bidang dan membuka ruang bagi anak muda untuk ikut berkarya."
  - Tombol utama: "Cari yang cocok buat kamu" ke `mulai.html`
  - Tombol kedua: "Lihat karya Mahreen" ke `karya.html`
  - Motif bunga empat kelopak sebagai elemen dekoratif.
- **Kenalan dulu sama Mahreen:** `profil.visi`, empat `profil.misi` dalam daftar ringkas, dan tiga `profil.nilai` ditampilkan besar dengan padanan bahasa Indonesia kecil di bawahnya. Keterangan sumber dari `profil.sumber`.
- **Jelajahi:** tiga blok tautan ke halaman Karya, Anak Muda, dan Mulai, masing-masing dengan satu kalimat penjelasan.
- Lanjut: Karya.

### 2. Karya (`karya.html`, `data-page="karya"`)

- Judul: "Cara Mahreen berkarya untuk Indonesia"
- Pengantar: "Mahreen punya beberapa unit, dan masing-masing berkarya di bidang yang berbeda."
- Satu blok per `unit`: nama, bidang, penjelasan (`apa`), contoh nyata (`contoh`, lewati jika `null`), sumber, dan tautan akun.
- Sub-bagian "Juga dari Mahreen Indonesia" berisi `kegiatanBersama`.
- Tata letak blok jangan kartu identik semua. Unit dengan contoh nyata diberi ruang lebih besar.
- Lanjut: Anak Muda.

### 3. Anak Muda (`anak-muda.html`, `data-page="anak-muda"`)

- Judul: "Ruang berkarya untuk anak muda"
- Isi dari `internship`: ringkasan, periode Batch 2, status pendaftaran, benefit, posisi per grup, dan bidang mentoring.
- Sorotan "10 kategori penghargaan Batch 1" dari `penghargaanBatch1`, sebagai gambaran apa yang dikerjakan dan dihargai dari peserta.
- Tombol: `internship.ikuti`. Keterangan sumber.
- Lanjut: Mulai.

### 4. Mulai (`mulai.html`, `data-page="mulai"`), satu-satunya halaman interaktif

- Judul: "Kamu tertarik di bidang apa?"
- Pengantar: "Pilih satu, lalu lihat bagian Mahreen yang berkaitan dengan minatmu."
- Tombol pilihan dari `minat`, berperilaku seperti radio group dan bisa dipakai dengan keyboard.
- Hasil: posisi internship yang berkaitan (jika ada, dengan catatan "posisi di Batch 2"), kalimat `unit`, dan daftar `akun` yang bisa dipantau. Diumumkan dengan `aria-live="polite"`.
- Pilihan disimpan di query URL (misalnya `mulai.html?minat=teknologi`) supaya hasilnya bisa dibagikan dan tetap ada saat halaman dimuat ulang.
- Penutup: tautan "Kembali ke Beranda".

## Arahan desain (prinsip desain grafis dan DKV)

**Identitas visual.** Gaya kampanye Mahreen (magenta, pink, kelopak oranye) sebagai gaya utama. Gaya gelap bertekstur hanya untuk footer. Nilai hex di bawah perkiraan, akan saya ganti dengan hasil color picker dari template Canva resmi.

| Token | Perkiraan | Peran |
|---|---|---|
| `--color-primary` | `#D1227A` | Tombol, aksen, pilihan aktif |
| `--color-secondary` | `#930D3C` | Judul dan teks penting |
| `--color-accent` | `#F2653A` | Motif dekoratif, sorotan kecil |
| `--color-bg` | `#FFF5F9` | Latar utama |
| `--color-ink` | `#2B0B1D` | Teks utama |
| `--color-neutral` | `#6B6470` | Teks sekunder, keterangan sumber |
| `--color-dark` | `#1C1A1D` | Footer |

**Hierarki.** Setiap halaman punya satu judul utama (`h1`) dan satu tujuan. Pembaca harus paham isi halaman hanya dengan membaca judul-judulnya.

**Tipografi.** Poppins untuk judul, Plus Jakarta Sans untuk teks. Skala ukuran kelipatan 1,25. Panjang baris 45 sampai 75 karakter.

**Gestalt.** Proximity untuk mengelompokkan isi satu unit. Similarity untuk header, footer, dan komponen yang konsisten di semua halaman. Continuity lewat tautan "Lanjut" antarhalaman. Common region untuk memisahkan area interaktif.

**Grid dan ruang.** 12 kolom di desktop, 4 kolom di HP, spacing kelipatan 8px, ruang kosong yang cukup.

**Ikon dan motif.** Ikon garis seragam. Motif bunga empat kelopak secukupnya, misalnya di hero dan sebagai penanda bagian.

**Motion.** Hanya untuk merespons aksi pengguna (memilih minat, membuka menu). Hormati `prefers-reduced-motion`.

**Mobile first dan aksesibilitas.** Desain dari layar HP dulu. Kontras minimal 4,5:1. Area sentuh minimal 44px. Fokus keyboard terlihat. HTML semantik. Skip link hanya muncul saat mendapat fokus.

**Hindari tampilan generik.** Jangan pakai label huruf kapital semua di atas setiap judul, jangan tambahkan "→" di setiap tombol, jangan jadikan semua konten kartu identik dengan bayangan yang sama.

## Data

Salin ke `js/data.js` sebagai `const MAHREEN = { ... };` dengan isi objek persis seperti di bawah.

```json
{
  "profil": {
    "ringkas": "Mahreen Indonesia adalah ekosistem kreatif, digital, bisnis, dan sosial.",
    "visi": "Menjadi perusahaan yang inovatif dalam menghadirkan karya, solusi, dan kontribusi positif bagi masyarakat Indonesia, sampai ke tingkat internasional.",
    "misi": [
      "Mengembangkan bidang fashion, digital, kreatif, dan sosial secara profesional dan adaptif.",
      "Menghadirkan layanan, karya, dan solusi yang bermanfaat bagi masyarakat, generasi muda, dan pelaku usaha.",
      "Membangun kolaborasi dan pemberdayaan yang mendorong kreativitas, inovasi, dan perkembangan berkelanjutan.",
      "Menjadikan Mahreen Indonesia ruang untuk bertumbuh, berkarya, dan berbagi manfaat."
    ],
    "nilai": [
      {
        "en": "Innovation",
        "id": "Inovasi"
      },
      {
        "en": "Collaboration",
        "id": "Kolaborasi"
      },
      {
        "en": "Impact",
        "id": "Dampak"
      }
    ],
    "sumber": {
      "label": "@mahreenindonesia, 14 dan 19 Mei 2026",
      "url": "https://www.instagram.com/mahreenindonesia/"
    }
  },
  "unit": [
    {
      "id": "tanya-mahreen",
      "nama": "Tanya Mahreen",
      "bidang": "Academic, Creative, Digital Solution",
      "apa": "Layanan kreatif dan digital untuk UMKM, brand, dan bisnis: website, branding, social media management, dan creative design.",
      "contoh": "Tim magang Batch 1 untuk Digital Marketing Strategy dan Tanya Mahreen Website Development UI/UX mendapat penghargaan Best Team Player.",
      "sumber": {
        "label": "@tanyamahreen, 26 Mei 2026; @mahreenindonesiainternship, 1 September 2026",
        "url": "https://www.instagram.com/tanyamahreen/"
      },
      "akun": "@tanyamahreen",
      "akunUrl": "https://www.instagram.com/tanyamahreen/"
    },
    {
      "id": "peduli-mahreen",
      "nama": "Peduli Mahreen",
      "bidang": "Social & Humanity Movement",
      "apa": "Gerakan sosial dan kemanusiaan dengan empat tujuan: kepedulian, edukasi, bantuan sosial, dan pemberdayaan.",
      "contoh": "Akhir Juni 2026, Peduli Mahreen memperkenalkan diri, membagikan cerita aksi sosialnya, dan mengajak followers menuliskan isu sosial yang menurut mereka paling mendesak.",
      "sumber": {
        "label": "@pedulimahreen, 29 dan 30 Juni 2026",
        "url": "https://www.instagram.com/pedulimahreen/"
      },
      "akun": "@pedulimahreen",
      "akunUrl": "https://www.instagram.com/pedulimahreen/"
    },
    {
      "id": "mahreen-csr",
      "nama": "Mahreen CSR",
      "bidang": "Corporate Social Responsibility",
      "apa": "Unit yang mengumumkan kemitraan resmi Mahreen dengan kampus, organisasi mahasiswa, brand, dan yayasan.",
      "contoh": "Juli sampai Agustus 2026: kerja sama dengan Universitas Teknologi Bandung, Nice To Meet You (NTMY), Yayasan Fauzan Adzima Sukajadi, dan BEM Universitas Teknologi Bandung.",
      "sumber": {
        "label": "@mahreencsr, 7 Juli sampai 20 Agustus 2026",
        "url": "https://www.instagram.com/mahreencsr/"
      },
      "akun": "@mahreencsr",
      "akunUrl": "https://www.instagram.com/mahreencsr/"
    },
    {
      "id": "mahreen-studio",
      "nama": "Mahreen Studio",
      "bidang": "Creative Lifestyle & Fashion",
      "apa": "Unit Mahreen di bidang creative lifestyle dan fashion.",
      "contoh": null,
      "sumber": {
        "label": "@mahreenindonesia, 19 Mei 2026",
        "url": "https://www.instagram.com/mahreenindonesia/"
      },
      "akun": "@mahreenindonesia",
      "akunUrl": "https://www.instagram.com/mahreenindonesia/"
    }
  ],
  "kegiatanBersama": [
    {
      "judul": "Seminar AI for UMKM: Grow Your Business with AI",
      "tanggal": "18 Juli 2026",
      "keterangan": "Seminar gratis tentang pemanfaatan AI untuk UMKM.",
      "sumber": {
        "label": "@mahreenindonesia, 14 Juli 2026",
        "url": "https://www.instagram.com/mahreenindonesia/"
      }
    },
    {
      "judul": "Seminar Nasional: Level Up Your Brand",
      "tanggal": "8 Agustus 2026",
      "keterangan": "Seminar online via Zoom tentang strategi digital marketing untuk UMKM.",
      "sumber": {
        "label": "@mahreenindonesia, 1 Agustus 2026",
        "url": "https://www.instagram.com/mahreenindonesia/"
      }
    }
  ],
  "internship": {
    "ringkas": "Program magang Mahreen Indonesia. Menurut pengumuman Batch 2, sistem kerjanya remote (WFH atau WFA).",
    "periodeBatch2": "1 Oktober 2026 sampai 31 Januari 2027",
    "statusPendaftaran": "Pendaftaran Batch 2 sudah ditutup.",
    "benefit": [
      "Learning dan mentoring",
      "Pengalaman proyek nyata",
      "Portofolio profesional",
      "Peluang fee berbasis proyek",
      "Sertifikat dan jam belajar",
      "Jaringan ekosistem"
    ],
    "posisi": [
      {
        "grup": "Digital Marketing & Branding",
        "daftar": [
          "Graphic Design",
          "Video Editor",
          "Social Media Management"
        ]
      },
      {
        "grup": "Website Development",
        "daftar": [
          "UI/UX",
          "Frontend Development",
          "Backend Development"
        ]
      },
      {
        "grup": "Business Development & Partnership",
        "daftar": []
      }
    ],
    "mentorBatch2": [
      "Website Development",
      "Social Media Management",
      "Graphic Design"
    ],
    "penghargaanBatch1": [
      "Best Intern of the Batch",
      "Most Outstanding Intern",
      "Most Consistent Intern",
      "Most Engaged Intern",
      "Most Creative Designer",
      "Creative Editing Award",
      "Best Content Strategist",
      "Web Innovator Award",
      "Best Team Player",
      "Most Improved Intern"
    ],
    "sumber": {
      "label": "@mahreenindonesiainternship dan Story MI Batch 2, 30 Agustus sampai 14 September 2026",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    },
    "ikuti": {
      "label": "Pantau batch berikutnya di @mahreenindonesiainternship",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    }
  },
  "minat": [
    {
      "id": "visual",
      "label": "Desain dan visual",
      "posisi": [
        "Graphic Design",
        "UI/UX"
      ],
      "unit": "Mahreen Studio bergerak di creative lifestyle dan fashion.",
      "akun": [
        {
          "nama": "@mahreenindonesiainternship",
          "url": "https://www.instagram.com/mahreenindonesiainternship/"
        },
        {
          "nama": "@mahreenindonesia",
          "url": "https://www.instagram.com/mahreenindonesia/"
        }
      ]
    },
    {
      "id": "konten",
      "label": "Konten dan media sosial",
      "posisi": [
        "Social Media Management",
        "Video Editor"
      ],
      "unit": "Social media management juga termasuk layanan Tanya Mahreen.",
      "akun": [
        {
          "nama": "@mahreenindonesiainternship",
          "url": "https://www.instagram.com/mahreenindonesiainternship/"
        },
        {
          "nama": "@tanyamahreen",
          "url": "https://www.instagram.com/tanyamahreen/"
        }
      ]
    },
    {
      "id": "teknologi",
      "label": "Teknologi dan website",
      "posisi": [
        "Frontend Development",
        "Backend Development",
        "UI/UX"
      ],
      "unit": "Website termasuk layanan Tanya Mahreen, dan websitenya pernah dikerjakan tim magang Batch 1.",
      "akun": [
        {
          "nama": "@mahreenindonesiainternship",
          "url": "https://www.instagram.com/mahreenindonesiainternship/"
        },
        {
          "nama": "@tanyamahreen",
          "url": "https://www.instagram.com/tanyamahreen/"
        }
      ]
    },
    {
      "id": "bisnis",
      "label": "Bisnis dan UMKM",
      "posisi": [
        "Business Development & Partnership"
      ],
      "unit": "Tanya Mahreen melayani UMKM dan bisnis, dan Mahreen beberapa kali mengadakan seminar untuk UMKM.",
      "akun": [
        {
          "nama": "@mahreenindonesia",
          "url": "https://www.instagram.com/mahreenindonesia/"
        },
        {
          "nama": "@tanyamahreen",
          "url": "https://www.instagram.com/tanyamahreen/"
        }
      ]
    },
    {
      "id": "sosial",
      "label": "Sosial dan kemanusiaan",
      "posisi": [],
      "unit": "Peduli Mahreen menjalankan gerakan sosial, dan Mahreen CSR mengumumkan kemitraan dengan kampus serta yayasan.",
      "akun": [
        {
          "nama": "@pedulimahreen",
          "url": "https://www.instagram.com/pedulimahreen/"
        },
        {
          "nama": "@mahreencsr",
          "url": "https://www.instagram.com/mahreencsr/"
        }
      ]
    }
  ],
  "akun": [
    {
      "nama": "@mahreenindonesia",
      "fungsi": "Akun utama: profil, seminar, dan pengumuman",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    {
      "nama": "@tanyamahreen",
      "fungsi": "Layanan kreatif dan digital",
      "url": "https://www.instagram.com/tanyamahreen/"
    },
    {
      "nama": "@pedulimahreen",
      "fungsi": "Gerakan sosial dan kemanusiaan",
      "url": "https://www.instagram.com/pedulimahreen/"
    },
    {
      "nama": "@mahreencsr",
      "fungsi": "Kemitraan dan tanggung jawab sosial",
      "url": "https://www.instagram.com/mahreencsr/"
    },
    {
      "nama": "@mahreenindonesiainternship",
      "fungsi": "Program magang",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    }
  ],
  "kontak": {
    "website": "https://mahreenindonesia.com",
    "email": "info@mahreenindonesia.com",
    "whatsapp": "+62 896 5264 7385",
    "whatsappUrl": "https://wa.me/6289652647385",
    "alamat": "Jl. Kebon Kopi No. 153, Kota Cimahi, Jawa Barat 40535"
  }
}
```

Catatan: URL sumber masih mengarah ke halaman akun. Saya akan menggantinya dengan link unggahan asli sebelum deploy.

## Tahapan kerja

1. `refactor`: pecah menjadi empat halaman, hapus sisa konsep lama, ganti `js/data.js`.
2. `feat`: design tokens dan base styles (atau sesuaikan yang sudah ada).
3. `feat`: header dengan navigasi aktif dan menu mobile, footer, dan tautan "Lanjut" di semua halaman.
4. `feat`: halaman Beranda.
5. `feat`: halaman Karya.
6. `feat`: halaman Anak Muda.
7. `feat`: halaman Mulai (interaktif).
8. `fix`: responsif (360px, 768px, 1280px), keyboard, dan kontras di semua halaman.
9. `perf`: Lighthouse 90 ke atas di setiap halaman, meta tag, Open Graph per halaman.
10. `docs`: README berisi tugas, konsep, keputusan desain (termasuk alasan memilih multi-halaman), cara memperbarui `js/data.js`, dan cara menjalankan.

## Definisi selesai

- Semua bagian tampil dari data, tanpa fakta di luar file ini.
- Halaman Mulai berfungsi dengan mouse, sentuhan, dan keyboard.
- Navigasi dan tautan "Lanjut" konsisten di keempat halaman, tanpa tautan anchor selain skip link.
- Tidak ada em dash, en dash, kata "kami", atau bahasa jualan.
- Rapi di HP dan desktop, Lighthouse 90 ke atas.
- Bisa dibuka tanpa server dan sudah ter-deploy publik.
