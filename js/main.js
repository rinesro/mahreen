/*
 * Label dan fungsi bersama.
 * Dipakai oleh js/timeline.js (dan nanti story viewer), jadi file ini
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
