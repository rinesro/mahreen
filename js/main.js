/*
 * Merender isi halaman dari objek MAHREEN (js/data.js).
 * File ini dimuat setelah data.js, keduanya dengan <script defer>.
 *
 * Situs terdiri dari empat halaman yang memuat file yang sama. Bagian yang dirender
 * ditentukan oleh atribut data-page pada <body> (lihat bagian "Jalankan" di bawah).
 * Setiap fungsi render juga berhenti diam-diam kalau wadahnya tidak ada di HTML.
 */

const SVG_NS = "http://www.w3.org/2000/svg";

/* Membuat elemen HTML. Teks selalu lewat textContent, bukan innerHTML, supaya aman. */
function buatElemen(tag, className, teks) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (teks != null) el.textContent = teks;
  return el;
}

/* Memanggil ikon dari sprite SVG di index.html, misalnya buatIkon("ikon-instagram"). */
function buatIkon(id, className) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", className || "ikon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", "#" + id);
  svg.appendChild(use);
  return svg;
}

/* Tautan ke luar halaman, dibuka di tab baru dengan keterangan untuk screen reader. */
function buatTautanLuar(url, teks, className) {
  const a = buatElemen("a", className);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  a.appendChild(document.createTextNode(teks));
  a.appendChild(buatElemen("span", "visually-hidden", " (buka di tab baru)"));
  return a;
}

/*
 * Keterangan sumber kecil, misalnya "Sumber: @tanyamahreen, 26 Mei 2026".
 * Hanya nama akun yang menjadi tautan, tanggal tetap teks biasa. Akun pertama
 * memakai sumber.url (nanti diganti tautan unggahan aslinya), akun berikutnya
 * memakai alamat akun dari MAHREEN.akun. Dipakai di semua bagian yang memuat fakta.
 */
function buatSumber(sumber, className) {
  const p = buatElemen("p", className || "sumber");
  p.appendChild(document.createTextNode("Sumber: "));

  const pola = /@[A-Za-z0-9._]*[A-Za-z0-9_]/g;
  let akhir = 0;
  let pertama = true;
  let cocok;
  while ((cocok = pola.exec(sumber.label)) !== null) {
    const nama = cocok[0];
    const akun = MAHREEN.akun.find(function (a) { return a.nama === nama; });
    const url = pertama ? sumber.url : akun && akun.url;
    p.appendChild(document.createTextNode(sumber.label.slice(akhir, cocok.index)));
    p.appendChild(url ? buatTautanLuar(url, nama) : document.createTextNode(nama));
    akhir = cocok.index + nama.length;
    pertama = false;
  }
  p.appendChild(document.createTextNode(sumber.label.slice(akhir)));
  return p;
}

/*
 * Logo unit versi crimson (untuk latar terang), misalnya assets/logo/tanya-mahreen-crimson.png.
 * Kotaknya berukuran tetap di CSS, jadi teks di sebelahnya tidak bergeser saat gambar dimuat.
 */
function buatLogo(src, nama, className) {
  const img = new Image();
  img.className = "logo" + (className ? " " + className : "");
  img.alt = "Logo " + nama;
  img.decoding = "async";
  img.src = src;
  return img;
}

/* Tautan ke akun Instagram, dengan ikon di depan nama akun. */
function buatTautanAkun(nama, url, className) {
  const a = buatTautanLuar(url, nama, className || "tautan-akun");
  a.prepend(buatIkon("ikon-instagram", "ikon ikon--kecil"));
  return a;
}

/* ---------- Kenalan: visi, misi, dan ekosistem ---------- */
/*
 * Visi, misi, kalimat ekosistem, dan tiga kata ditulis persis seperti di postingan
 * Mahreen (lihat CLAUDE.md). Visi dan misi punya sumber sendiri (14 Mei 2026),
 * ekosistem dan tiga kata punya sumber sendiri (postingan Our Ecosystem, 19 Mei 2026).
 */
function renderKenalan(profil) {
  const wadah = document.getElementById("kenalan-isi");
  if (!wadah) return;

  // Visi dan misi berdampingan di desktop, bertumpuk di HP
  const visiMisi = buatElemen("div", "kenalan__visi-misi");

  const visi = buatElemen("div", "kenalan__visi");
  visi.appendChild(buatElemen("h3", "kenalan__label", "Visi"));
  visi.appendChild(buatElemen("p", "kenalan__visi-teks", profil.visi));
  visiMisi.appendChild(visi);

  const misi = buatElemen("div", "kenalan__misi");
  misi.appendChild(buatElemen("h3", "kenalan__label", "Misi"));
  const daftarMisi = buatElemen("ol", "kenalan__misi-list");
  profil.misi.forEach(function (teks) { daftarMisi.appendChild(buatElemen("li", null, teks)); });
  misi.appendChild(daftarMisi);
  visiMisi.appendChild(misi);

  wadah.appendChild(visiMisi);
  wadah.appendChild(buatSumber(profil.sumber, "sumber kenalan__sumber"));

  // Ekosistem: kalimat asli, baris kecil bidang, lalu tiga kata besar seperti di postingan
  const ekosistem = buatElemen("div", "kenalan__ekosistem");
  ekosistem.appendChild(buatElemen("p", "ekosistem__kalimat", profil.ekosistem));
  const bidang = buatElemen("p", "ekosistem__bidang", profil.ekosistemBidang);
  bidang.lang = "en";
  ekosistem.appendChild(bidang);
  const daftarKata = buatElemen("ul", "tiga-kata");
  daftarKata.setAttribute("role", "list");
  daftarKata.lang = "en";
  profil.tigaKata.forEach(function (kata) {
    daftarKata.appendChild(buatElemen("li", "tiga-kata__item", kata));
  });
  ekosistem.appendChild(daftarKata);
  ekosistem.appendChild(buatSumber(profil.sumberEkosistem, "sumber kenalan__sumber"));
  wadah.appendChild(ekosistem);
}

/* ---------- Karya: blok per unit ---------- */
/*
 * Unit yang punya contoh nyata diberi ruang lebih besar: di desktop blok dibagi dua,
 * keterangan unit di kiri dan kotak contoh di kanan. Kalau suatu unit belum punya
 * contoh (contoh: null), kotak contoh dilewati dan sumber tampil di bawah keterangan.
 */
function renderUnit(daftarUnit) {
  const wadah = document.getElementById("karya-unit");
  if (!wadah) return;

  const list = buatElemen("ul", "unit-list");
  list.setAttribute("role", "list");

  daftarUnit.forEach(function (unit) {
    const li = buatElemen("li", "unit" + (unit.contoh ? " unit--dengan-contoh" : ""));
    li.id = "unit-" + unit.id;

    // Proximity: logo, nama, bidang, penjelasan, dan akun dikelompokkan rapat
    const info = buatElemen("div", "unit__info");
    const kepala = buatElemen("div", "unit__kepala");
    kepala.appendChild(buatLogo("assets/logo/" + unit.id + "-crimson.png", unit.nama, "unit__logo"));
    const namaBidang = buatElemen("div");
    namaBidang.appendChild(buatElemen("h2", "unit__nama", unit.nama));
    const bidang = buatElemen("p", "unit__bidang", unit.bidang);
    bidang.lang = "en";
    namaBidang.appendChild(bidang);
    kepala.appendChild(namaBidang);
    info.appendChild(kepala);
    info.appendChild(buatElemen("p", "unit__apa", unit.apa));
    info.appendChild(buatTautanAkun(unit.akun, unit.akunUrl, "tautan-akun unit__akun"));
    li.appendChild(info);

    if (unit.contoh) {
      const contoh = buatElemen("div", "unit__contoh");
      contoh.appendChild(buatElemen("p", "unit__contoh-label", "Contoh nyata"));
      contoh.appendChild(buatElemen("p", "unit__contoh-teks", unit.contoh));
      contoh.appendChild(buatSumber(unit.sumber, "sumber unit__sumber"));
      li.appendChild(contoh);
    } else {
      // Tanpa contoh, sumber tetap ditampilkan di bawah keterangan unit
      info.appendChild(buatSumber(unit.sumber, "sumber unit__sumber"));
    }

    list.appendChild(li);
  });

  wadah.appendChild(list);
}

/* ---------- Karya: "Juga dari Mahreen Indonesia" ---------- */
function renderKegiatanBersama(daftar) {
  const wadah = document.getElementById("karya-bersama");
  if (!wadah || !daftar.length) return;

  wadah.appendChild(buatElemen("h2", "bersama__judul", "Juga dari Mahreen Indonesia"));

  const list = buatElemen("ul", "bersama__list");
  list.setAttribute("role", "list");
  daftar.forEach(function (k) {
    const li = buatElemen("li", "bersama__item");
    li.appendChild(buatElemen("p", "bersama__tanggal", k.tanggal));
    li.appendChild(buatElemen("h3", "bersama__nama", k.judul));
    li.appendChild(buatElemen("p", "bersama__keterangan", k.keterangan));
    li.appendChild(buatSumber(k.sumber));
    list.appendChild(li);
  });
  wadah.appendChild(list);
}

/* ---------- Anak Muda: program magang ---------- */
/* Daftar pendek sebagai label (misalnya posisi atau bidang mentoring). */
function buatDaftarLabel(daftar, bahasaInggris, varian) {
  const ul = buatElemen("ul", "label-list");
  ul.setAttribute("role", "list");
  daftar.forEach(function (teks) {
    const li = buatElemen("li", "label" + (varian ? " label--" + varian : ""), teks);
    if (bahasaInggris) li.lang = "en";
    ul.appendChild(li);
  });
  return ul;
}

/*
 * Kiri (desktop): ringkasan, periode, status, dan tombol pantau.
 * Kanan: benefit, posisi per grup, dan bidang mentoring.
 * Bawah: sorotan kategori penghargaan Batch 1, lalu sumber.
 */
function renderAnakMuda(data) {
  const wadah = document.getElementById("anak-muda-isi");
  if (!wadah) return;

  const tataLetak = buatElemen("div", "anak-muda__tata");

  // --- Kolom kiri ---
  const kiri = buatElemen("div", "anak-muda__kiri");
  const kepala = buatElemen("div", "anak-muda__kepala");
  kepala.appendChild(buatLogo("assets/logo/internship-crimson.png", "Mahreen Indonesia Internship", "anak-muda__logo"));
  kepala.appendChild(buatElemen("h2", "anak-muda__program", "Mahreen Indonesia Internship"));
  kiri.appendChild(kepala);
  kiri.appendChild(buatElemen("p", "anak-muda__ringkas", data.ringkas));

  const fakta = buatElemen("dl", "fakta");
  [["Periode Batch 2", data.periodeBatch2], ["Status pendaftaran", data.statusPendaftaran]].forEach(function (baris) {
    const grup = buatElemen("div", "fakta__baris");
    grup.appendChild(buatElemen("dt", "fakta__label", baris[0]));
    grup.appendChild(buatElemen("dd", "fakta__isi", baris[1]));
    fakta.appendChild(grup);
  });
  kiri.appendChild(fakta);

  /*
   * Tombol dengan label pendek, lalu nama akun sebagai keterangan kecil di bawahnya.
   * Keterangan dihubungkan ke tombol lewat aria-describedby, jadi pembaca layar
   * tetap mendengar ke akun mana tombol ini mengarah.
   */
  if (data.ikuti) {
    const aksi = buatElemen("div", "anak-muda__aksi");
    const tombol = buatTautanLuar(data.ikuti.url, data.ikuti.label, "btn btn--primary btn--ikon anak-muda__ikuti");
    tombol.prepend(buatIkon("ikon-instagram", "ikon ikon--kecil"));
    aksi.appendChild(tombol);
    if (data.ikuti.akun) {
      const keterangan = buatElemen("p", "anak-muda__ikuti-akun", "di Instagram " + data.ikuti.akun);
      keterangan.id = "ikuti-akun";
      tombol.setAttribute("aria-describedby", keterangan.id);
      aksi.appendChild(keterangan);
    }
    kiri.appendChild(aksi);
  }
  tataLetak.appendChild(kiri);

  // --- Kolom kanan ---
  const kanan = buatElemen("div", "anak-muda__kanan");

  const benefit = buatElemen("div", "anak-muda__blok");
  benefit.appendChild(buatElemen("h3", "anak-muda__subjudul", "Benefit program"));
  const daftarBenefit = buatElemen("ul", "benefit-list");
  data.benefit.forEach(function (teks) { daftarBenefit.appendChild(buatElemen("li", null, teks)); });
  benefit.appendChild(daftarBenefit);
  kanan.appendChild(benefit);

  const posisi = buatElemen("div", "anak-muda__blok");
  posisi.appendChild(buatElemen("h3", "anak-muda__subjudul", "Posisi di Batch 2"));
  data.posisi.forEach(function (grup) {
    const g = buatElemen("div", "posisi__grup");
    if (grup.daftar.length) {
      const nama = buatElemen("h4", "posisi__nama", grup.grup);
      nama.lang = "en";
      g.appendChild(nama);
      g.appendChild(buatDaftarLabel(grup.daftar, true));
    } else {
      // Grup tanpa rincian posisi (misalnya Business Development & Partnership) adalah posisinya sendiri
      g.appendChild(buatDaftarLabel([grup.grup], true));
    }
    posisi.appendChild(g);
  });
  kanan.appendChild(posisi);

  const mentor = buatElemen("div", "anak-muda__blok");
  mentor.appendChild(buatElemen("h3", "anak-muda__subjudul", "Bidang mentoring Batch 2"));
  // Bergaris tepi saja, supaya tidak tertukar dengan chip posisi yang berisi warna
  mentor.appendChild(buatDaftarLabel(data.mentorBatch2, true, "garis"));
  kanan.appendChild(mentor);

  tataLetak.appendChild(kanan);
  wadah.appendChild(tataLetak);

  // --- Sorotan kategori penghargaan ---
  const sorotan = buatElemen("div", "penghargaan");
  sorotan.appendChild(buatElemen("h2", "penghargaan__judul", data.penghargaanBatch1.length + " kategori penghargaan Batch 1"));
  sorotan.appendChild(buatElemen("p", "penghargaan__pengantar", "Gambaran hal yang dikerjakan dan dihargai dari peserta magang."));
  const daftar = buatElemen("ol", "penghargaan__list");
  daftar.setAttribute("role", "list");
  data.penghargaanBatch1.forEach(function (nama, i) {
    const li = buatElemen("li", "penghargaan__item");
    li.appendChild(buatElemen("span", "penghargaan__nomor", String(i + 1).padStart(2, "0")));
    const teks = buatElemen("span", "penghargaan__nama", nama);
    teks.lang = "en";
    li.appendChild(teks);
    daftar.appendChild(li);
  });
  sorotan.appendChild(daftar);
  wadah.appendChild(sorotan);

  wadah.appendChild(buatSumber(data.sumber, "sumber anak-muda__sumber"));
}

/* ---------- Mulai: pilih minat ---------- */
/*
 * Satu radio button per minat. Radio bawaan HTML dipakai karena perilaku radio group
 * (satu pilihan aktif, panah untuk berpindah, dibaca "1 dari 5" oleh pembaca layar)
 * sudah disediakan browser tanpa kode tambahan.
 *
 * Pilihan disimpan di query URL, misalnya anak-muda.html?minat=teknologi, supaya hasilnya
 * bisa dibagikan dan tetap ada saat halaman dimuat ulang. Dipakai replaceState (bukan
 * pushState) supaya setiap ganti pilihan tidak menambah riwayat browser.
 */
function renderMinat(daftarMinat, internship) {
  const fieldset = document.getElementById("minat-pilihan");
  const hasil = document.getElementById("minat-hasil");
  if (!fieldset || !hasil) return;

  const daftar = buatElemen("div", "minat__daftar");
  daftarMinat.forEach(function (minat) {
    const pilihan = buatElemen("div", "minat__pilihan");
    const input = buatElemen("input", "minat__input");
    input.type = "radio";
    input.name = "minat";
    input.id = "minat-" + minat.id;
    input.value = minat.id;
    const label = buatElemen("label", "minat__label", minat.label);
    label.htmlFor = input.id;
    pilihan.appendChild(input);
    pilihan.appendChild(label);
    daftar.appendChild(pilihan);

    input.addEventListener("change", function () {
      if (!input.checked) return;
      tampilkanHasil(minat);
      simpanDiUrl(minat.id);
    });
  });
  fieldset.appendChild(daftar);

  function simpanDiUrl(id) {
    const url = new URL(location.href);
    url.searchParams.set("minat", id);
    try {
      history.replaceState(null, "", url);
    } catch (e) {
      // Sebagian browser menolak mengubah alamat file lokal. Pilihan tetap tampil, hanya tidak tersimpan di URL.
    }
  }

  // Saat halaman dibuka dengan ?minat=..., langsung pilih dan tampilkan hasilnya.
  // Nilai yang tidak dikenal diabaikan.
  const dariUrl = new URLSearchParams(location.search).get("minat");
  const minatAwal = daftarMinat.find(function (m) { return m.id === dariUrl; });
  if (minatAwal) {
    document.getElementById("minat-" + minatAwal.id).checked = true;
    tampilkanHasil(minatAwal);
  }

  function tampilkanHasil(minat) {
    // Petunjuk awal tidak diperlukan lagi setelah ada pilihan
    const petunjuk = document.getElementById("minat-petunjuk");
    if (petunjuk) petunjuk.hidden = true;

    // Panel hasil baru dibuat di sini, jadi sebelum memilih tidak ada panel kosong
    const panel = buatElemen("div", "minat-hasil__panel");
    panel.appendChild(buatElemen("h3", "minat-hasil__judul", minat.label));

    const isi = buatElemen("div", "minat-hasil__isi");

    // Posisi magang yang berkaitan (chip), hanya kalau ada
    if (minat.posisi.length) {
      const blok = buatElemen("div", "minat-hasil__blok");
      blok.appendChild(buatElemen("h4", "minat-hasil__subjudul", "Posisi magang yang berkaitan"));
      blok.appendChild(buatDaftarLabel(minat.posisi, true));
      blok.appendChild(buatElemen("p", "minat-hasil__catatan", "Posisi di Batch 2. " + internship.statusPendaftaran));
      if (minat.mentorBatch2) {
        const mentor = buatElemen("p", "minat-hasil__mentor");
        mentor.appendChild(buatElemen("strong", null, "Ada mentor di Batch 2"));
        if (minat.mentorBidang) {
          mentor.appendChild(document.createTextNode(", untuk bidang "));
          const bidang = buatElemen("span", null, minat.mentorBidang);
          bidang.lang = "en";
          mentor.appendChild(bidang);
        }
        mentor.appendChild(document.createTextNode("."));
        blok.appendChild(mentor);
      }
      isi.appendChild(blok);
    }

    // Penghargaan Batch 1 yang diraih peserta di posisi ini (tanpa nama orang)
    if (minat.penghargaanBatch1.length) {
      const blok = buatElemen("div", "minat-hasil__blok");
      blok.appendChild(buatElemen("h4", "minat-hasil__subjudul", "Penghargaan Batch 1 untuk posisi ini"));
      const list = buatElemen("ul", "minat-hasil__penghargaan");
      list.setAttribute("role", "list");
      minat.penghargaanBatch1.forEach(function (p) {
        const li = buatElemen("li");
        const nama = buatElemen("span", "minat-hasil__penghargaan-nama", p.nama);
        nama.lang = "en";
        li.appendChild(nama);
        const oleh = buatElemen("span", "minat-hasil__penghargaan-oleh", "diraih peserta " + p.posisi);
        li.appendChild(oleh);
        list.appendChild(li);
      });
      blok.appendChild(list);
      isi.appendChild(blok);
    }

    // Catatan dan tombol, kalau ada
    if (minat.catatan || minat.tombol) {
      const blok = buatElemen("div", "minat-hasil__blok");
      if (minat.catatan) blok.appendChild(buatElemen("p", "minat-hasil__keterangan", minat.catatan));
      if (minat.tombol) {
        const tombol = buatElemen("a", "btn btn--secondary minat-hasil__tombol", minat.tombol.label);
        tombol.href = minat.tombol.url;
        blok.appendChild(tombol);
      }
      isi.appendChild(blok);
    }

    panel.appendChild(isi);
    panel.appendChild(buatSumber(minat.sumber, "sumber minat-hasil__sumber"));
    hasil.replaceChildren(panel);

    // Animasi muncul dipicu ulang setiap pilihan berganti (mati kalau reduced motion)
    panel.classList.add("minat-hasil--muncul");
  }
}

/* ---------- Program Aktif: program yang sedang berjalan ---------- */
/*
 * Satu baris per program: nama, label status, dan ringkasan di kiri;
 * cara ikut atau memantau, catatan, tautan akun, tombol detail (kalau ada), dan sumber di kanan.
 * Label status selalu ditulis sebagai teks, tidak hanya dibedakan lewat warna.
 */
function renderProgram(daftar) {
  const list = document.getElementById("program-list");
  if (!list) return;

  daftar.forEach(function (program) {
    const li = buatElemen("li", "program");

    const kepala = buatElemen("div", "program__kepala");
    kepala.appendChild(buatElemen("h2", "program__nama", program.nama));
    const status = buatElemen("p", "program__status");
    status.appendChild(buatElemen("span", "program__status-label", "Status"));
    status.appendChild(buatElemen("span", "visually-hidden", ": "));
    status.appendChild(buatElemen("span", "program__status-teks", program.statusLabel));
    kepala.appendChild(status);
    kepala.appendChild(buatElemen("p", "program__ringkas", program.ringkas));
    li.appendChild(kepala);

    const ikut = buatElemen("div", "program__ikut");
    ikut.appendChild(buatElemen("h3", "program__subjudul", "Cara ikut atau memantau"));
    const cara = buatElemen("ul", "program__cara");
    program.caraIkut.forEach(function (teks) { cara.appendChild(buatElemen("li", null, teks)); });
    ikut.appendChild(cara);
    if (program.catatan) ikut.appendChild(buatElemen("p", "program__catatan", program.catatan));

    const aksi = buatElemen("div", "program__aksi");
    aksi.appendChild(buatTautanAkun(program.tautan.label, program.tautan.url, "tautan-akun program__akun"));
    if (program.detailUrl) {
      const detail = buatElemen("a", "btn btn--secondary program__detail", program.detailLabel || "Lihat detail");
      detail.href = program.detailUrl;
      aksi.appendChild(detail);
    }
    ikut.appendChild(aksi);
    ikut.appendChild(buatSumber(program.sumber, "sumber program__sumber"));
    li.appendChild(ikut);

    list.appendChild(li);
  });
}

/* ---------- Satu Mahreen, lima akun ---------- */
function renderAkun(daftarAkun) {
  const list = document.getElementById("akun-list");
  if (!list) return;

  daftarAkun.forEach(function (akun) {
    const li = buatElemen("li", "akun__item");
    li.appendChild(buatTautanAkun(akun.nama, akun.url, "akun__tautan"));
    li.appendChild(buatElemen("p", "akun__fungsi", akun.fungsi));
    list.appendChild(li);
  });
}

/* ---------- Footer: kontak resmi ---------- */
function renderKontak(kontak) {
  const wadah = document.getElementById("kontak");
  if (!wadah) return;

  wadah.appendChild(buatElemen("p", null, kontak.alamat));

  const list = buatElemen("ul", "site-footer__list");
  list.setAttribute("role", "list");

  // Alamat website ditampilkan tanpa "https://" supaya ringkas
  const website = buatElemen("li");
  website.appendChild(buatTautanLuar(kontak.website, kontak.website.replace(/^https?:\/\//, "")));
  list.appendChild(website);

  const email = buatElemen("li");
  const tautanEmail = buatElemen("a", null, kontak.email);
  tautanEmail.href = "mailto:" + kontak.email;
  email.appendChild(tautanEmail);
  list.appendChild(email);

  const wa = buatElemen("li");
  wa.appendChild(buatTautanLuar(kontak.whatsappUrl, "WhatsApp " + kontak.whatsapp));
  list.appendChild(wa);

  wadah.appendChild(list);
}

/* ---------- Menu navigasi di HP ---------- */
/*
 * Di bawah 544px navigasi dilipat di balik tombol "Menu" (disclosure).
 * Tombolnya hidden di HTML dan baru ditampilkan di sini, jadi tanpa JavaScript
 * navigasi tetap tampil lengkap. aria-expanded memberi tahu pembaca layar
 * apakah menu sedang terbuka. Tombol Esc menutup menu dan mengembalikan fokus ke tombol.
 */
function pasangMenu() {
  const tombol = document.querySelector(".menu-tombol");
  const nav = document.getElementById("navigasi-utama");
  if (!tombol || !nav) return;

  tombol.hidden = false;

  function atur(terbuka) {
    tombol.setAttribute("aria-expanded", String(terbuka));
    nav.classList.toggle("site-nav--terbuka", terbuka);
  }

  tombol.addEventListener("click", function () {
    atur(tombol.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && tombol.getAttribute("aria-expanded") === "true") {
      atur(false);
      tombol.focus();
    }
  });
}

/* ---------- Header sticky ---------- */
/*
 * 1. Bayangan tipis setelah halaman di-scroll lebih dari 8px.
 * 2. Di bawah 768px: header sembunyi saat scroll ke bawah dan muncul saat scroll ke atas.
 *    Tidak disembunyikan kalau menu HP terbuka, posisi di paling atas halaman,
 *    atau ada elemen di dalam header yang sedang fokus.
 * 3. Tinggi header sebenarnya disimpan di --tinggi-header untuk scroll-padding-top.
 */
function pasangHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const layarKecil = window.matchMedia("(max-width: 47.99em)");
  const tombolMenu = header.querySelector(".menu-tombol");
  const AMBANG_BAYANGAN = 8;
  const AMBANG_GERAK = 4; // abaikan gerak scroll sangat kecil supaya header tidak berkedip
  let posisiTerakhir = window.scrollY;
  let menunggu = false;

  function bolehSembunyi(y) {
    if (!layarKecil.matches) return false;
    if (y <= header.offsetHeight) return false; // dekat paling atas halaman
    if (tombolMenu && tombolMenu.getAttribute("aria-expanded") === "true") return false;
    if (header.contains(document.activeElement)) return false;
    return true;
  }

  function perbarui() {
    menunggu = false;
    const y = window.scrollY;
    header.classList.toggle("site-header--bergulir", y > AMBANG_BAYANGAN);

    const selisih = y - posisiTerakhir;
    if (Math.abs(selisih) < AMBANG_GERAK) return;
    if (selisih > 0 && bolehSembunyi(y)) {
      header.classList.add("site-header--sembunyi");
    } else if (selisih < 0 || !bolehSembunyi(y)) {
      header.classList.remove("site-header--sembunyi");
    }
    posisiTerakhir = y;
  }

  window.addEventListener("scroll", function () {
    if (!menunggu) {
      menunggu = true;
      window.requestAnimationFrame(perbarui);
    }
  }, { passive: true });

  // Fokus keyboard masuk ke header (misalnya Shift+Tab): tampilkan lagi
  header.addEventListener("focusin", function () {
    header.classList.remove("site-header--sembunyi");
  });

  // Kembali ke layar lebar: header tidak pernah disembunyikan
  layarKecil.addEventListener("change", function () {
    header.classList.remove("site-header--sembunyi");
  });

  // Tinggi header berubah saat navigasi turun ke baris kedua (480 sampai 767px)
  function simpanTinggi() {
    document.documentElement.style.setProperty("--tinggi-header", header.offsetHeight + "px");
  }
  simpanTinggi();
  if ("ResizeObserver" in window) {
    new ResizeObserver(simpanTinggi).observe(header);
  }

  perbarui();
}

/* ---------- Jalankan ---------- */
/*
 * Setiap halaman hanya merender bagiannya sendiri, berdasarkan data-page pada <body>:
 * beranda, karya, anak-muda, atau program-aktif. Menu, akun, dan kontak di footer ada di semua halaman.
 */
const RENDER_HALAMAN = {
  "beranda": function () {
    renderKenalan(MAHREEN.profil);
  },
  "karya": function () {
    renderUnit(MAHREEN.unit);
    renderKegiatanBersama(MAHREEN.kegiatanBersama);
  },
  "anak-muda": function () {
    renderAnakMuda(MAHREEN.internship);
    renderMinat(MAHREEN.minat, MAHREEN.internship);
  },
  "program-aktif": function () {
    renderProgram(MAHREEN.programBerjalan);
  },
};

pasangMenu();
pasangHeader();

if (typeof MAHREEN !== "undefined") {
  const halaman = document.body.dataset.page;
  if (RENDER_HALAMAN[halaman]) RENDER_HALAMAN[halaman]();
  renderAkun(MAHREEN.akun);
  renderKontak(MAHREEN.kontak);
}

// Isi sudah lengkap: tautan Lanjut dan footer boleh tampil (lihat base.css)
document.body.classList.add("siap");
