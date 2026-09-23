/*
 * Timeline kegiatan: render dari KEGIATAN, filter status, dan sinkron ke URL hash.
 * Format hash: #timeline (semua) atau #timeline?status=sedang-berjalan
 *
 * Dibungkus IIFE supaya variabel di sini tidak bocor ke global.
 */
(function () {
  const list = document.getElementById("timeline-list");
  const hasil = document.getElementById("timeline-hasil");
  const judul = document.getElementById("timeline-judul");
  const section = document.getElementById("timeline");
  const chips = Array.from(document.querySelectorAll(".filter__chip"));
  if (!list || !section) return;

  const terurut = urutkanKegiatan(KEGIATAN);

  function buatItem(item) {
    const li = buatElemen("li", "timeline__item timeline__item--" + item.status);

    // Penanda di garis timeline: ikon kategori (sama untuk semua item sekategori)
    const penanda = buatElemen("span", "timeline__penanda");
    penanda.appendChild(buatIkon("ikon-" + item.kategori));
    li.appendChild(penanda);

    const isi = buatElemen("article", "timeline__konten");

    // Tingkat 1: meta (status dan tanggal), kecil
    isi.appendChild(buatMeta(item, "timeline__meta"));

    // Tingkat 2: judul, besar dan tebal
    isi.appendChild(buatElemen("h3", "timeline__judul-item", item.judul));

    // Tingkat 3: ringkasan, ukuran baca normal
    isi.appendChild(buatElemen("p", "timeline__ringkasan", item.ringkasan));

    // Sumber unggahan, wajib di setiap item
    isi.appendChild(buatKeteranganSumber(item, "timeline__sumber"));

    // Tautan ke unggahan asli, lalu tombol ikuti kalau datanya ada
    isi.appendChild(buatAksi(item, "timeline__aksi"));

    li.appendChild(isi);
    return li;
  }

  function render(status) {
    const data = status === "semua"
      ? terurut
      : terurut.filter(function (item) { return item.status === status; });

    list.replaceChildren.apply(list, data.map(buatItem));

    if (data.length === 0) {
      list.appendChild(buatElemen("li", "timeline__kosong", "Belum ada kegiatan dengan status ini."));
    }

    hasil.textContent = status === "semua"
      ? "Menampilkan semua " + data.length + " kegiatan."
      : "Menampilkan " + data.length + " kegiatan dengan status " + STATUS_LABEL[status].toLowerCase() + ".";

    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.status === status));
    });
  }

  /* Membaca status dari hash. Nilai yang tidak dikenal dianggap "semua". */
  function statusDariHash() {
    const bagian = location.hash.split("?");
    if (bagian[0] !== "#timeline") return null; // hash bukan milik timeline
    const status = new URLSearchParams(bagian[1] || "").get("status");
    return STATUS_LABEL[status] ? status : "semua";
  }

  function hashUntuk(status) {
    return status === "semua" ? "#timeline" : "#timeline?status=" + status;
  }

  /*
   * Browser tidak bisa menggulir ke "#timeline?status=..." sendiri,
   * karena tidak ada elemen dengan id seperti itu. Jadi digulir manual.
   * Fokus dipindah ke judul timeline supaya pengguna keyboard ikut pindah.
   */
  function tujuTimeline(pindahFokus) {
    section.scrollIntoView(); // halus atau langsung mengikuti scroll-behavior di base.css
    if (pindahFokus) judul.focus({ preventScroll: true });
  }

  // Klik chip: ganti filter dan perbarui hash tanpa menggulir halaman
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      const status = chip.dataset.status;
      list.classList.add("sudah-difilter");
      render(status);
      history.replaceState(null, "", hashUntuk(status));
    });
  });

  /*
   * Semua tautan ke "#timeline..." (tombol hero, navigasi) ditangani di sini.
   * Tanpa ini, klik kedua pada tombol yang sama tidak memicu apa-apa
   * karena hash-nya tidak berubah.
   */
  document.addEventListener("click", function (event) {
    const tautan = event.target.closest('a[href^="#timeline"]');
    if (!tautan) return;
    event.preventDefault();
    history.pushState(null, "", tautan.getAttribute("href"));
    render(statusDariHash());
    tujuTimeline(true);
  });

  /*
   * Tombol back dan forward browser, atau hash yang diketik manual.
   * Hash yang bukan milik timeline (misalnya kembali ke awal) berarti filter "Semua".
   */
  window.addEventListener("popstate", function () {
    const status = statusDariHash();
    render(status || "semua");
    if (status) tujuTimeline(false);
  });

  // Saat halaman pertama dibuka
  const statusAwal = statusDariHash();
  render(statusAwal || "semua");
  if (statusAwal) tujuTimeline(false);
})();
