/*
 * Merender isi halaman dari objek MAHREEN (js/data.js).
 * File ini dimuat setelah data.js, keduanya dengan <script defer>.
 *
 * Isi tiap bagian ditambahkan bertahap:
 * Kenalan dan Karya (Tahap 4), Anak Muda (Tahap 5), Mulai (Tahap 6).
 * Setiap fungsi render berhenti diam-diam kalau wadahnya tidak ada di HTML.
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
    info.appendChild(buatElemen("h3", "unit__nama", unit.nama));
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

  wadah.appendChild(buatElemen("h3", "bersama__judul", "Juga dari Mahreen Indonesia"));

  const list = buatElemen("ul", "bersama__list");
  list.setAttribute("role", "list");
  daftar.forEach(function (k) {
    const li = buatElemen("li", "bersama__item");
    li.appendChild(buatElemen("p", "bersama__tanggal", k.tanggal));
    li.appendChild(buatElemen("h4", "bersama__nama", k.judul));
    li.appendChild(buatElemen("p", "bersama__keterangan", k.keterangan));
    li.appendChild(buatSumber(k.sumber));
    list.appendChild(li);
  });
  wadah.appendChild(list);
}

/* ---------- Jalankan ---------- */
if (typeof MAHREEN !== "undefined") {
  renderKenalan(MAHREEN.profil);
  renderUnit(MAHREEN.unit);
  renderKegiatanBersama(MAHREEN.kegiatanBersama);
}
