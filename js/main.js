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
 * Keterangan sumber kecil dengan tautan ke unggahannya, misalnya
 * "Sumber: @tanyamahreen, 26 Mei 2026". Dipakai di semua bagian yang memuat fakta.
 */
function buatSumber(sumber, className) {
  const p = buatElemen("p", className || "sumber");
  p.appendChild(document.createTextNode("Sumber: "));
  p.appendChild(buatTautanLuar(sumber.url, sumber.label));
  return p;
}

/* Tautan ke akun Instagram, dengan ikon di depan nama akun. */
function buatTautanAkun(nama, url, className) {
  const a = buatTautanLuar(url, nama, className || "tautan-akun");
  a.prepend(buatIkon("ikon-instagram", "ikon ikon--kecil"));
  return a;
}

/* ---------- Kenalan: visi, misi, tiga nilai ---------- */
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

  // Tiga nilai ditampilkan besar, istilah Inggrisnya diberi padanan bahasa Indonesia
  const nilai = buatElemen("div", "kenalan__nilai");
  nilai.appendChild(buatElemen("h3", "kenalan__label", "Tiga nilai Mahreen"));
  const daftarNilai = buatElemen("ul", "nilai");
  daftarNilai.setAttribute("role", "list");
  profil.nilai.forEach(function (n) {
    const li = buatElemen("li", "nilai__item");
    const en = buatElemen("span", "nilai__en", n.en);
    en.lang = "en";
    li.appendChild(en);
    li.appendChild(buatElemen("span", "nilai__id", n.id));
    daftarNilai.appendChild(li);
  });
  nilai.appendChild(daftarNilai);
  wadah.appendChild(nilai);

  wadah.appendChild(buatSumber(profil.sumber, "sumber kenalan__sumber"));
}

/* ---------- Karya: blok per unit ---------- */
/*
 * Unit yang punya contoh nyata diberi ruang lebih besar: di desktop blok dibagi dua,
 * keterangan unit di kiri dan kotak contoh di kanan. Unit tanpa contoh (contoh: null)
 * tampil ringkas tanpa kotak itu, sesuai brief.
 */
function renderUnit(daftarUnit) {
  const wadah = document.getElementById("karya-unit");
  if (!wadah) return;

  const list = buatElemen("ul", "unit-list");
  list.setAttribute("role", "list");

  daftarUnit.forEach(function (unit) {
    const li = buatElemen("li", "unit" + (unit.contoh ? " unit--dengan-contoh" : " unit--ringkas"));
    li.id = "unit-" + unit.id;

    // Proximity: nama, bidang, penjelasan, dan akun dikelompokkan rapat
    const info = buatElemen("div", "unit__info");
    info.appendChild(buatElemen("h2", "unit__nama", unit.nama));
    const bidang = buatElemen("p", "unit__bidang", unit.bidang);
    bidang.lang = "en";
    info.appendChild(bidang);
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
function buatDaftarLabel(daftar, bahasaInggris) {
  const ul = buatElemen("ul", "label-list");
  ul.setAttribute("role", "list");
  daftar.forEach(function (teks) {
    const li = buatElemen("li", "label", teks);
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
  kiri.appendChild(buatElemen("h2", "anak-muda__program", "Mahreen Indonesia Internship"));
  kiri.appendChild(buatElemen("p", "anak-muda__ringkas", data.ringkas));

  const fakta = buatElemen("dl", "fakta");
  [["Periode Batch 2", data.periodeBatch2], ["Status pendaftaran", data.statusPendaftaran]].forEach(function (baris) {
    const grup = buatElemen("div", "fakta__baris");
    grup.appendChild(buatElemen("dt", "fakta__label", baris[0]));
    grup.appendChild(buatElemen("dd", "fakta__isi", baris[1]));
    fakta.appendChild(grup);
  });
  kiri.appendChild(fakta);

  if (data.ikuti) {
    const tombol = buatTautanLuar(data.ikuti.url, data.ikuti.label, "btn btn--primary btn--ikon anak-muda__ikuti");
    tombol.prepend(buatIkon("ikon-instagram", "ikon ikon--kecil"));
    kiri.appendChild(tombol);
  }
  tataLetak.appendChild(kiri);

  // --- Kolom kanan ---
  const kanan = buatElemen("div", "anak-muda__kanan");

  const benefit = buatElemen("div", "anak-muda__blok");
  benefit.appendChild(buatElemen("h3", "anak-muda__subjudul", "Benefit yang disebutkan"));
  const daftarBenefit = buatElemen("ul", "benefit-list");
  data.benefit.forEach(function (teks) { daftarBenefit.appendChild(buatElemen("li", null, teks)); });
  benefit.appendChild(daftarBenefit);
  kanan.appendChild(benefit);

  const posisi = buatElemen("div", "anak-muda__blok");
  posisi.appendChild(buatElemen("h3", "anak-muda__subjudul", "Posisi di Batch 2"));
  data.posisi.forEach(function (grup) {
    const g = buatElemen("div", "posisi__grup");
    const nama = buatElemen("h4", "posisi__nama", grup.grup);
    nama.lang = "en";
    g.appendChild(nama);
    // Grup tanpa rincian (daftar kosong) cukup ditampilkan namanya
    if (grup.daftar.length) g.appendChild(buatDaftarLabel(grup.daftar, true));
    posisi.appendChild(g);
  });
  kanan.appendChild(posisi);

  const mentor = buatElemen("div", "anak-muda__blok");
  mentor.appendChild(buatElemen("h3", "anak-muda__subjudul", "Bidang mentoring Batch 2"));
  mentor.appendChild(buatDaftarLabel(data.mentorBatch2, true));
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
      if (input.checked) tampilkanHasil(minat);
    });
  });
  fieldset.appendChild(daftar);

  function tampilkanHasil(minat) {
    const isi = [];
    isi.push(buatElemen("h3", "minat-hasil__judul", minat.label));

    // Posisi internship yang berkaitan, hanya kalau ada
    if (minat.posisi.length) {
      const blok = buatElemen("div", "minat-hasil__blok");
      blok.appendChild(buatElemen("h4", "minat-hasil__subjudul", "Posisi internship yang berkaitan"));
      blok.appendChild(buatDaftarLabel(minat.posisi, true));
      blok.appendChild(buatElemen("p", "minat-hasil__catatan", "Posisi di Batch 2. " + internship.statusPendaftaran));
      isi.push(blok);
    }

    // Unit Mahreen yang berkaitan
    const unit = buatElemen("div", "minat-hasil__blok");
    unit.appendChild(buatElemen("h4", "minat-hasil__subjudul", "Di Mahreen"));
    unit.appendChild(buatElemen("p", "minat-hasil__unit", minat.unit));
    isi.push(unit);

    // Akun yang bisa dipantau
    const akun = buatElemen("div", "minat-hasil__blok");
    akun.appendChild(buatElemen("h4", "minat-hasil__subjudul", "Akun yang bisa kamu pantau"));
    const list = buatElemen("ul", "minat-hasil__akun");
    list.setAttribute("role", "list");
    minat.akun.forEach(function (a) {
      const li = buatElemen("li");
      li.appendChild(buatTautanAkun(a.nama, a.url));
      list.appendChild(li);
    });
    akun.appendChild(list);
    isi.push(akun);

    hasil.replaceChildren.apply(hasil, isi);

    // Animasi muncul dipicu ulang setiap pilihan berganti (mati kalau reduced motion)
    hasil.classList.remove("minat-hasil--muncul");
    void hasil.offsetWidth;
    hasil.classList.add("minat-hasil--muncul");
  }
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
 * Di bawah 480px navigasi dilipat di balik tombol "Menu" (disclosure).
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

/* ---------- Jalankan ---------- */
/*
 * Setiap halaman hanya merender bagiannya sendiri, berdasarkan data-page pada <body>:
 * beranda, karya, anak-muda, atau mulai. Menu, akun, dan kontak di footer ada di semua halaman.
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
  },
  "mulai": function () {
    renderMinat(MAHREEN.minat, MAHREEN.internship);
  },
};

pasangMenu();

if (typeof MAHREEN !== "undefined") {
  const halaman = document.body.dataset.page;
  if (RENDER_HALAMAN[halaman]) RENDER_HALAMAN[halaman]();
  renderAkun(MAHREEN.akun);
  renderKontak(MAHREEN.kontak);
}
