/*
 * Data kegiatan Sorotan Mahreen (sorotan Mei sampai September 2026).
 *
 * Menambah kegiatan baru cukup dengan menambah satu objek ke array ini.
 * Nilai status: "bisa-diikuti", "sedang-berjalan", "sudah-berlangsung", "segera-hadir".
 * Nilai kategori: "program", "kegiatan", "kolaborasi", "segera-hadir".
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
];
