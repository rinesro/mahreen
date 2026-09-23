/*
 * Label dan fungsi bersama.
 * Dipakai oleh js/timeline.js dan js/story.js, jadi file ini
 * harus dimuat sebelum keduanya. KEGIATAN tersedia dari js/data.js.
 */

/* Teks label status. Urutannya juga dipakai untuk mengurutkan item tanpa tanggal. */
const STATUS_LABEL = {
  "sedang-berjalan": "Sedang berjalan",
  "segera-hadir": "Segera hadir",
  "sudah-berlangsung": "Sudah berlangsung",
};

const KATEGORI_LABEL = {
  "program": "Program",
  "kegiatan": "Kegiatan",
  "kolaborasi": "Kolaborasi",
  "segera-hadir": "Segera Hadir",
};

const SVG_NS = "http://www.w3.org/2000/svg";

/*
 * Urutan dari terbaru, dipakai timeline dan story viewer:
 * 1. Item tanpa tanggal (unit yang masih aktif dan yang diumumkan akan hadir) di paling atas,
 *    diurutkan menurut status: sedang berjalan, lalu segera hadir.
 * 2. Item bertanggal, dari tanggal paling baru ke paling lama.
 * Mengembalikan array baru, array aslinya tidak diubah.
 */
function urutkanKegiatan(daftar) {
  const urutanStatus = Object.keys(STATUS_LABEL);
  return daftar.slice().sort(function (a, b) {
    if (!a.tanggal && !b.tanggal) {
      return urutanStatus.indexOf(a.status) - urutanStatus.indexOf(b.status);
    }
    if (!a.tanggal) return -1;
    if (!b.tanggal) return 1;
    return b.tanggal.localeCompare(a.tanggal);
  });
}

/* Membuat elemen HTML. Teks selalu lewat textContent, bukan innerHTML, supaya aman. */
function buatElemen(tag, className, teks) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (teks != null) el.textContent = teks;
  return el;
}

/* Memanggil ikon dari sprite SVG di index.html, misalnya buatIkon("ikon-program"). */
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

/* Label status berbentuk pil. Teksnya selalu ada, warna hanya penguat. */
function buatLabelStatus(status) {
  return buatElemen("span", "status status--" + status, STATUS_LABEL[status] || status);
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
 * Baris meta: label status, lalu tanggal dan keterangan online dalam satu teks
 * supaya patah barisnya wajar. Label tanggal yang sama persis dengan label status
 * (misalnya "Segera hadir") tidak diulang.
 */
function buatMeta(item, className) {
  const meta = buatElemen("p", className);
  meta.appendChild(buatLabelStatus(item.status));

  const keterangan = buatElemen("span");
  if (item.tanggalLabel && item.tanggalLabel !== STATUS_LABEL[item.status]) {
    const waktu = buatElemen(item.tanggal ? "time" : "span", null, item.tanggalLabel);
    if (item.tanggal) waktu.dateTime = item.tanggal;
    keterangan.appendChild(waktu);
  }
  if (item.online) {
    keterangan.appendChild(document.createTextNode(keterangan.childNodes.length ? " \u00B7 Online" : "Online"));
  }
  if (keterangan.childNodes.length) meta.appendChild(keterangan);

  meta.appendChild(buatElemen("span", "visually-hidden", "Kategori: " + KATEGORI_LABEL[item.kategori]));
  return meta;
}

/*
 * Tautan ke unggahan asli, lalu tombol ikuti kalau datanya ada.
 * Dibungkus satu div supaya tata letaknya sama di timeline dan story.
 */
function buatAksi(item, className) {
  const aksi = buatElemen("div", className);
  aksi.appendChild(buatTautanSumber(item));
  const ikuti = buatTombolIkuti(item);
  if (ikuti) aksi.appendChild(ikuti);
  return aksi;
}

/* Keterangan sumber kecil, misalnya "Sumber: @tanyamahreen, 26 Mei 2026". */
function buatKeteranganSumber(item, className) {
  return buatElemen("p", className, "Sumber: " + item.sumber.label);
}

/*
 * Tautan "Lihat unggahan aslinya". Wajib ada di setiap item.
 * Judul item ditambahkan untuk screen reader, supaya belasan tautan
 * dengan teks yang sama tetap bisa dibedakan.
 */
function buatTautanSumber(item) {
  const a = buatTautanLuar(item.sumber.url, "Lihat unggahan aslinya", "tautan-sumber");
  a.insertBefore(buatElemen("span", "visually-hidden", ": " + item.judul), a.lastChild);
  return a;
}

/* Tombol ajakan ikuti akun. Hanya dibuat kalau data "ikuti" ada (bukan null). */
function buatTombolIkuti(item) {
  if (!item.ikuti) return null;
  const tombol = buatTautanLuar(item.ikuti.url, item.ikuti.label, "btn btn--secondary btn--ikon");
  if (item.ikuti.url.includes("instagram.com")) {
    tombol.prepend(buatIkon("ikon-instagram", "ikon ikon--kecil"));
  }
  return tombol;
}
