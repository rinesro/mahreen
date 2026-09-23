/*
 * Merender isi halaman dari objek MAHREEN (js/data.js).
 * File ini dimuat setelah data.js, keduanya dengan <script defer>.
 *
 * Isi tiap bagian ditambahkan bertahap:
 * Kenalan dan Karya (Tahap 4), Anak Muda (Tahap 5), Mulai (Tahap 6).
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
