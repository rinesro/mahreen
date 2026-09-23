/*
 * Data kegiatan Sorotan Mahreen (sorotan Mei sampai September 2026).
 * Dirangkum dari unggahan Instagram publik Mahreen Indonesia dan unit-unitnya.
 *
 * Menambah kegiatan baru cukup dengan menambah satu objek ke array ini.
 * Nilai status: "sedang-berjalan", "sudah-berlangsung", "segera-hadir".
 * Nilai kategori: "program", "kegiatan", "kolaborasi", "segera-hadir".
 * sumber: wajib, berisi label (akun dan tanggal unggahan) dan url unggahan aslinya.
 * ikuti: opsional. Kalau null, tombol ajakan tidak ditampilkan.
 * online: opsional. Kalau true, tampil label kecil "Online".
 *
 * Sengaja memakai file .js (bukan .json + fetch) supaya halaman tetap jalan
 * saat index.html dibuka langsung tanpa server.
 */
const KEGIATAN = [
  {
    "id": "tanya-mahreen",
    "kategori": "program",
    "judul": "Tanya Mahreen",
    "tanggal": null,
    "tanggalLabel": "Unit aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Menurut unggahan @tanyamahreen, unit ini adalah layanan kreatif dan digital untuk UMKM, brand, dan bisnis.",
    "detail": [
      "Layanan yang disebutkan: website, branding, social media management, dan creative design."
    ],
    "sumber": {
      "label": "@tanyamahreen, 26 Mei 2026",
      "url": "https://www.instagram.com/tanyamahreen/"
    },
    "ikuti": {
      "label": "Ikuti @tanyamahreen",
      "url": "https://www.instagram.com/tanyamahreen/"
    }
  },
  {
    "id": "peduli-mahreen",
    "kategori": "program",
    "judul": "Peduli Mahreen",
    "tanggal": null,
    "tanggalLabel": "Unit aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Unit gerakan sosial dan kemanusiaan Mahreen Indonesia. Unggahan \"Our Purpose\" mereka menyebut empat tujuan.",
    "detail": [
      "Kepedulian: menumbuhkan rasa peduli dan empati.",
      "Edukasi: memberi edukasi dan inspirasi untuk generasi yang berpengetahuan dan berkarakter.",
      "Bantuan sosial: menyalurkan bantuan secara tepat dan berkelanjutan.",
      "Pemberdayaan: mendorong masyarakat berkembang, mandiri, dan bermanfaat bagi sekitarnya.",
      "Cara bergabung sebagai relawan belum dijelaskan di unggahan yang dirangkum."
    ],
    "sumber": {
      "label": "@pedulimahreen, unggahan Our Purpose",
      "url": "https://www.instagram.com/pedulimahreen/"
    },
    "ikuti": {
      "label": "Ikuti @pedulimahreen",
      "url": "https://www.instagram.com/pedulimahreen/"
    }
  },
  {
    "id": "mahreen-studio",
    "kategori": "program",
    "judul": "Mahreen Studio",
    "tanggal": null,
    "tanggalLabel": "Unit aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Disebut dalam unggahan Our Ecosystem sebagai unit creative lifestyle dan fashion.",
    "detail": [
      "Detailnya belum dijelaskan di unggahan yang dirangkum."
    ],
    "sumber": {
      "label": "@mahreenindonesia, 19 Mei 2026",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    "ikuti": null
  },
  {
    "id": "mahreen-csr",
    "kategori": "program",
    "judul": "Mahreen CSR",
    "tanggal": null,
    "tanggalLabel": "Unit aktif",
    "status": "sedang-berjalan",
    "ringkasan": "Disebut dalam unggahan Our Ecosystem sebagai unit Corporate Social Responsibility. Pengumuman kemitraan resmi Mahreen dibagikan lewat akun ini.",
    "detail": [],
    "sumber": {
      "label": "@mahreenindonesia, 19 Mei 2026",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    "ikuti": {
      "label": "Ikuti @mahreencsr",
      "url": "https://www.instagram.com/mahreencsr/"
    }
  },
  {
    "id": "mahreen-internship",
    "kategori": "program",
    "judul": "Mahreen Indonesia Internship",
    "tanggal": "2026-10-01",
    "tanggalLabel": "Batch 2: 1 Oktober 2026 sampai 31 Januari 2027",
    "status": "sedang-berjalan",
    "online": true,
    "ringkasan": "Program magang Mahreen Indonesia. Menurut pengumuman Batch 2, sistem kerjanya remote (WFH atau WFA).",
    "detail": [
      "Benefit yang disebutkan: learning dan mentoring, pengalaman proyek nyata, portofolio profesional, peluang fee berbasis proyek, sertifikat dan jam belajar, serta jaringan ekosistem.",
      "Posisi Batch 2: Graphic Design, Video Editor, Social Media Management, UI/UX, Frontend Development, Backend Development, serta Business Development dan Partnership.",
      "Pendaftaran Batch 2 sudah ditutup."
    ],
    "sumber": {
      "label": "Story MI Batch 2, 14 September 2026",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    },
    "ikuti": {
      "label": "Pantau batch berikutnya",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    }
  },
  {
    "id": "peduli-mahreen-kenalan",
    "kategori": "kegiatan",
    "judul": "Peduli Mahreen memperkenalkan diri",
    "tanggal": "2026-06-29",
    "tanggalLabel": "29 Juni 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "@pedulimahreen membagikan cerita awal perjalanan, visi misi, dan aksi sosial yang sedang dijalankan.",
    "detail": [
      "Unggahan berikutnya (30 Juni) mengajak followers menuliskan isu sosial yang menurut mereka paling mendesak."
    ],
    "sumber": {
      "label": "@pedulimahreen, 29 Juni 2026",
      "url": "https://www.instagram.com/pedulimahreen/"
    },
    "ikuti": null
  },
  {
    "id": "kolab-utb",
    "kategori": "kolaborasi",
    "judul": "Kerja sama dengan Universitas Teknologi Bandung",
    "tanggal": "2026-07-07",
    "tanggalLabel": "7 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Diumumkan sebagai kolaborasi di bidang pendidikan dan pengembangan sumber daya manusia.",
    "detail": [],
    "sumber": {
      "label": "@mahreencsr, 7 Juli 2026",
      "url": "https://www.instagram.com/mahreencsr/"
    },
    "ikuti": null
  },
  {
    "id": "kolab-ntmy",
    "kategori": "kolaborasi",
    "judul": "Kemitraan dengan Nice To Meet You (NTMY)",
    "tanggal": "2026-07-12",
    "tanggalLabel": "12 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Diumumkan sebagai kemitraan resmi yang berkaitan dengan identitas merek dan Mahreen Indonesia Internship Program.",
    "detail": [
      "Unggahan menyebut pengembangan identitas merek, perencanaan logo, penguatan visual branding, dan pengembangan talenta kreatif."
    ],
    "sumber": {
      "label": "@mahreencsr, 12 Juli 2026",
      "url": "https://www.instagram.com/mahreencsr/"
    },
    "ikuti": null
  },
  {
    "id": "seminar-ai-umkm",
    "kategori": "kegiatan",
    "judul": "Seminar AI for UMKM: Grow Your Business with AI",
    "tanggal": "2026-07-18",
    "tanggalLabel": "18 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Seminar gratis bertema pemanfaatan AI untuk UMKM.",
    "detail": [
      "Benefit yang disebutkan di poster: e-certificate dan materi dari pembicara profesional."
    ],
    "sumber": {
      "label": "@mahreenindonesia, 14 Juli 2026",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    "ikuti": null
  },
  {
    "id": "kolab-yayasan-fas",
    "kategori": "kolaborasi",
    "judul": "Kolaborasi dengan Yayasan Fauzan Adzima Sukajadi",
    "tanggal": "2026-07-24",
    "tanggalLabel": "24 Juli 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Diumumkan sebagai kemitraan untuk mendukung gerakan kebaikan di bidang pendidikan dan sosial.",
    "detail": [],
    "sumber": {
      "label": "@mahreencsr, 24 Juli 2026",
      "url": "https://www.instagram.com/mahreencsr/"
    },
    "ikuti": null
  },
  {
    "id": "seminar-nasional-level-up",
    "kategori": "kegiatan",
    "judul": "Seminar Nasional: Level Up Your Brand",
    "tanggal": "2026-08-08",
    "tanggalLabel": "8 Agustus 2026",
    "status": "sudah-berlangsung",
    "online": true,
    "ringkasan": "Seminar online via Zoom bertema strategi digital marketing untuk UMKM.",
    "detail": [
      "Dua sesi menurut poster: Digital Marketing Strategy dan Digital Financial Solutions."
    ],
    "sumber": {
      "label": "@mahreenindonesia, 1 Agustus 2026",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    "ikuti": null
  },
  {
    "id": "kolab-bem-utb",
    "kategori": "kolaborasi",
    "judul": "Official Partner BEM Universitas Teknologi Bandung",
    "tanggal": "2026-08-20",
    "tanggalLabel": "20 Agustus 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Diumumkan sebagai awal dari program dan ruang belajar bersama mahasiswa.",
    "detail": [],
    "sumber": {
      "label": "@mahreencsr, 20 Agustus 2026",
      "url": "https://www.instagram.com/mahreencsr/"
    },
    "ikuti": null
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
    "sumber": {
      "label": "@mahreenindonesiainternship, 30 Agustus 2026",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    },
    "ikuti": null
  },
  {
    "id": "mentor-batch-2",
    "kategori": "kegiatan",
    "judul": "Perkenalan mentor Internship Batch 2",
    "tanggal": "2026-09-12",
    "tanggalLabel": "12 September 2026",
    "status": "sudah-berlangsung",
    "ringkasan": "Tiga mentor diperkenalkan untuk Batch 2.",
    "detail": [
      "Bidang mentoring: Website Development, Social Media Management, dan Graphic Design."
    ],
    "sumber": {
      "label": "@mahreenindonesia, 12 September 2026",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    "ikuti": null
  },
  {
    "id": "open-recruitment-batch-2",
    "kategori": "kegiatan",
    "judul": "Open recruitment Internship Batch 2",
    "tanggal": "2026-09-14",
    "tanggalLabel": "14 September 2026",
    "status": "sudah-berlangsung",
    "online": true,
    "ringkasan": "Pengumuman pembukaan pendaftaran magang Batch 2 dengan sistem kerja remote.",
    "detail": [
      "Pendaftaran sudah ditutup."
    ],
    "sumber": {
      "label": "Story MI Batch 2, 14 September 2026",
      "url": "https://www.instagram.com/mahreenindonesiainternship/"
    },
    "ikuti": null
  },
  {
    "id": "segera-hadir",
    "kategori": "segera-hadir",
    "judul": "Yang diumumkan akan hadir",
    "tanggal": null,
    "tanggalLabel": "Segera hadir",
    "status": "segera-hadir",
    "ringkasan": "Dalam unggahan What's Next, Mahreen menyebut beberapa hal yang sedang disiapkan.",
    "detail": [
      "Signature Collection",
      "Creative Collaboration",
      "Digital Services",
      "Social Programs",
      "Community Development",
      "Future Expansion",
      "Waktu dan detailnya belum diumumkan."
    ],
    "sumber": {
      "label": "@mahreenindonesia, unggahan What's Next",
      "url": "https://www.instagram.com/mahreenindonesia/"
    },
    "ikuti": {
      "label": "Ikuti @mahreenindonesia",
      "url": "https://www.instagram.com/mahreenindonesia/"
    }
  }
];
