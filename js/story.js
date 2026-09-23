/*
 * Highlight kategori dan story viewer.
 *
 * - Highlight: satu lingkaran per kategori, dibuat dari KEGIATAN (jumlah item selalu sinkron).
 * - Story: satu slide per item, tidak auto-play.
 *   Navigasi: ketuk sisi kiri atau kanan, swipe di HP, tombol panah keyboard,
 *   tombol Sebelumnya dan Berikutnya, Esc atau tombol tutup untuk menutup.
 *
 * Dibungkus IIFE supaya variabel di sini tidak bocor ke global.
 */
(function () {
  const daftarHighlight = document.getElementById("highlight-list");
  const dialog = document.getElementById("story");
  if (!daftarHighlight || !dialog || typeof dialog.showModal !== "function") return;

  const panel = document.getElementById("story-panel");
  const progress = document.getElementById("story-progress");
  const ikonKategori = document.getElementById("story-ikon");
  const labelKategori = document.getElementById("story-kategori");
  const posisi = document.getElementById("story-posisi");
  const slide = document.getElementById("story-slide");
  const tombolTutup = document.getElementById("story-tutup");
  const tombolSebelumnya = document.getElementById("story-sebelumnya");
  const tombolBerikutnya = document.getElementById("story-berikutnya");

  const JARAK_SWIPE = 50; // piksel minimal geser horizontal agar dianggap swipe

  let item = [];      // item kategori yang sedang dibuka, sudah terurut
  let indeks = 0;     // slide yang sedang tampil
  let pemicu = null;  // tombol highlight yang membuka story, untuk mengembalikan fokus

  /* ---------- Highlight kategori ---------- */

  Object.keys(KATEGORI_LABEL).forEach(function (kategori) {
    const jumlah = KEGIATAN.filter(function (k) { return k.kategori === kategori; }).length;
    if (jumlah === 0) return;

    const li = buatElemen("li");
    const tombol = buatElemen("button", "highlight__tombol");
    tombol.type = "button";
    tombol.dataset.kategori = kategori;
    tombol.setAttribute("aria-haspopup", "dialog");

    // Common region: ikon kategori di dalam cincin, motif bunga kecil di tepi cincin
    const cincin = buatElemen("span", "highlight__cincin");
    cincin.appendChild(buatIkon("ikon-" + kategori, "ikon highlight__ikon"));
    cincin.appendChild(buatIkon("motif-bunga", "highlight__bunga"));
    tombol.appendChild(cincin);

    tombol.appendChild(buatElemen("span", "highlight__label", KATEGORI_LABEL[kategori]));
    tombol.appendChild(buatElemen("span", "highlight__jumlah", jumlah + " item"));

    tombol.addEventListener("click", function () { buka(kategori, tombol); });
    li.appendChild(tombol);
    daftarHighlight.appendChild(li);
  });

  /* ---------- Story viewer ---------- */

  function buka(kategori, tombol) {
    item = urutkanKegiatan(KEGIATAN.filter(function (k) { return k.kategori === kategori; }));
    indeks = 0;
    pemicu = tombol;

    labelKategori.textContent = KATEGORI_LABEL[kategori];
    ikonKategori.replaceChildren(buatIkon("ikon-" + kategori));

    // Progress bar: satu segmen per slide
    progress.replaceChildren.apply(progress, item.map(function () {
      return buatElemen("span", "story__segmen");
    }));

    tampilkan();
    dialog.showModal();
    document.documentElement.classList.add("story-terbuka"); // kunci scroll halaman di belakang
    // Fokus awal di tombol Berikutnya, atau tombol tutup kalau hanya ada satu slide
    (tombolBerikutnya.disabled ? tombolTutup : tombolBerikutnya).focus();
  }

  function tutup() {
    if (dialog.open) dialog.close();
  }

  // Event "close" juga terpicu oleh tombol Esc bawaan <dialog>
  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("story-terbuka");
    if (pemicu) pemicu.focus(); // fokus kembali ke highlight yang dibuka
  });

  function tampilkan() {
    const data = item[indeks];

    const isi = [];
    isi.push(buatMeta(data, "story__meta"));
    isi.push(buatElemen("h2", "story__judul", data.judul));
    isi.push(buatElemen("p", "story__ringkasan", data.ringkasan));

    if (data.detail && data.detail.length) {
      const ul = buatElemen("ul", "story__detail");
      data.detail.forEach(function (poin) { ul.appendChild(buatElemen("li", null, poin)); });
      isi.push(ul);
    }

    isi.push(buatKeteranganSumber(data, "story__sumber"));
    isi.push(buatAksi(data, "story__aksi"));

    slide.replaceChildren.apply(slide, isi);
    slide.scrollTop = 0;

    // Animasi masuk dipicu ulang setiap slide berganti (mati kalau reduced motion)
    slide.classList.remove("story__slide--masuk");
    void slide.offsetWidth;
    slide.classList.add("story__slide--masuk");

    Array.from(progress.children).forEach(function (segmen, i) {
      segmen.classList.toggle("story__segmen--terlihat", i <= indeks);
    });

    posisi.textContent = (indeks + 1) + " dari " + item.length;
    tombolSebelumnya.disabled = indeks === 0;
    tombolBerikutnya.disabled = indeks === item.length - 1;

    // Kalau tombol yang sedang difokus jadi nonaktif, pindahkan fokus supaya tidak hilang
    if (document.activeElement && document.activeElement.disabled) {
      (tombolSebelumnya.disabled ? tombolBerikutnya : tombolSebelumnya).focus();
    }
  }

  function geser(arah) {
    const baru = indeks + arah;
    if (baru < 0 || baru >= item.length) return;
    indeks = baru;
    tampilkan();
  }

  tombolTutup.addEventListener("click", tutup);
  tombolSebelumnya.addEventListener("click", function () { geser(-1); });
  tombolBerikutnya.addEventListener("click", function () { geser(1); });

  // Ketuk sepertiga kiri untuk mundur, sisanya untuk maju (seperti story Instagram).
  // Klik pada tautan atau tombol tidak dihitung sebagai ketukan navigasi.
  panel.addEventListener("click", function (event) {
    if (event.target.closest("a, button")) return;
    const kotak = panel.getBoundingClientRect();
    geser(event.clientX - kotak.left < kotak.width / 3 ? -1 : 1);
  });

  // Klik di latar gelap (di luar panel, hanya ada di desktop) menutup story
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) tutup();
  });

  // Swipe di HP
  let awalX = null;
  let awalY = null;
  panel.addEventListener("touchstart", function (event) {
    awalX = event.touches[0].clientX;
    awalY = event.touches[0].clientY;
  }, { passive: true });

  panel.addEventListener("touchend", function (event) {
    if (awalX === null) return;
    const dx = event.changedTouches[0].clientX - awalX;
    const dy = event.changedTouches[0].clientY - awalY;
    awalX = null;
    // Hanya geser horizontal yang cukup jauh, supaya scroll vertikal isi slide tidak terganggu
    if (Math.abs(dx) > JARAK_SWIPE && Math.abs(dx) > Math.abs(dy)) {
      event.preventDefault(); // cegah "click" susulan yang ikut menggeser slide
      geser(dx < 0 ? 1 : -1);
    }
  });

  // Keyboard: panah kiri dan kanan, serta kunci fokus di dalam dialog
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      geser(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      geser(-1);
    } else if (event.key === "Tab") {
      const bisaFokus = Array.from(dialog.querySelectorAll("a[href], button:not([disabled])"));
      const pertama = bisaFokus[0];
      const terakhir = bisaFokus[bisaFokus.length - 1];
      if (event.shiftKey && document.activeElement === pertama) {
        event.preventDefault();
        terakhir.focus();
      } else if (!event.shiftKey && document.activeElement === terakhir) {
        event.preventDefault();
        pertama.focus();
      }
    }
  });
})();
