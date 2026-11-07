// Data Vila (Array Objek)
const dataVila = [
  {
    id: 1,
    nama: "Vila Alpina Puncak",
    tipe: "3 Kamar Tidur",
    fasilitas: "Kolam Renang, WiFi, BBQ, Pemandangan Gunung",
    harga: 1200000,
  },
  {
    id: 2,
    nama: "Vila Pinus Asri",
    tipe: "2 Kamar Tidur",
    fasilitas: "Water Heater, Halaman Luas, TV Kabel, Dapur",
    harga: 850000,
  },
  {
    id: 3,
    nama: "Vila Mawar Lestari",
    tipe: "4 Kamar Tidur",
    fasilitas: "Kolam Renang Privat, Karaoke, Meja Biliar, AC",
    harga: 2000000,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const typewriterTitle = document.getElementById("typewriterTitle");
  const titleText = "Vila Permai";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    typewriterTitle.textContent = titleText;
  } else {
    const characterDelay = 120;
    const movementDuration = 600;

    function createTitleCharacters() {
      typewriterTitle.replaceChildren();

      for (const [index, character] of Array.from(titleText).entries()) {
        const characterElement = document.createElement("span");
        characterElement.className = "typewriter-character";
        characterElement.textContent = character === " " ? "\u00a0" : character;
        characterElement.style.setProperty(
          "--character-delay",
          `${index * characterDelay}ms`,
        );
        typewriterTitle.appendChild(characterElement);
      }
    }

    function runTitleAnimation() {
      createTitleCharacters();
      typewriterTitle.classList.remove("is-leaving");
      typewriterTitle.classList.add("is-entering");

      const characterCount = Array.from(titleText).length;
      const animationDuration =
        movementDuration + (characterCount - 1) * characterDelay;

      window.setTimeout(() => {
        typewriterTitle.classList.remove("is-entering");
        window.setTimeout(() => {
          typewriterTitle.classList.add("is-leaving");

          window.setTimeout(() => {
            typewriterTitle.classList.remove("is-leaving");
            typewriterTitle.replaceChildren();
            window.setTimeout(runTitleAnimation, 5000);
          }, animationDuration);
        }, 10000);
      }, animationDuration);
    }

    window.setTimeout(runTitleAnimation, 180);
  }

  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.textContent = isDark ? "☀ Mode terang" : "☾ Mode gelap";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });

  const vilaList = document.getElementById("vilaList");
  const pilihVilaSelect = document.getElementById("pilihVila");
  const searchInput = document.getElementById("searchInput");
  const bookingForm = document.getElementById("bookingForm");
  const btnCek = document.getElementById("btnCek");
  const infoEstimasi = document.getElementById("infoEstimasi");
  const hasilPesanan = document.getElementById("hasilPesanan");

  // Fungsi Render Katalog menggunakan createElement & appendChild (Manipulasi DOM Dinamis)
  function renderVila(filterKeyword = "") {
    vilaList.innerHTML = "";
    pilihVilaSelect.innerHTML = '<option value="">-- Pilih Vila --</option>';

    const filteredData = dataVila.filter(
      (v) =>
        v.nama.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        v.fasilitas.toLowerCase().includes(filterKeyword.toLowerCase()),
    );

    if (filteredData.length === 0) {
      const p = document.createElement("p");
      p.textContent = "Vila yang dicari tidak ditemukan.";
      vilaList.appendChild(p);
      return;
    }

    filteredData.forEach((vila) => {
      // Buat kartu article
      const article = document.createElement("article");
      article.className = "vila-card";

      const h3 = document.createElement("h3");
      h3.textContent = vila.nama;

      const pTipe = document.createElement("p");
      pTipe.textContent = `Tipe: ${vila.tipe}`;

      const pFasilitas = document.createElement("p");
      pFasilitas.textContent = `Fasilitas: ${vila.fasilitas}`;

      const pHarga = document.createElement("p");
      pHarga.className = "vila-card__price";
      pHarga.textContent = `Rp ${vila.harga.toLocaleString("id-ID")} / malam`;

      article.appendChild(h3);
      article.appendChild(pTipe);
      article.appendChild(pFasilitas);
      article.appendChild(pHarga);
      vilaList.appendChild(article);

      // Masukkan ke dropdown form
      const option = document.createElement("option");
      option.value = vila.id;
      option.textContent = `${vila.nama} - Rp ${vila.harga.toLocaleString("id-ID")}/malam`;
      pilihVilaSelect.appendChild(option);
    });
  }

  renderVila();

  // Event Listener Pencarian Real-time
  searchInput.addEventListener("input", (e) => {
    renderVila(e.target.value);
  });

  // Fungsi Hitung Total Harga & Validasi Tanggal
  function hitungTotal() {
    try {
      const nama = document.getElementById("namaTamu").value.trim();
      const vilaId = pilihVilaSelect.value;
      const checkInVal = document.getElementById("checkIn").value;
      const checkOutVal = document.getElementById("checkOut").value;
      const jumlahTamu = parseInt(document.getElementById("jumlahTamu").value);

      // Validasi Input Bahasa Indonesia
      if (!nama) throw new Error("Nama tamu wajib diisi.");
      if (!vilaId) throw new Error("Silakan pilih salah satu unit vila.");
      if (!checkInVal || !checkOutVal)
        throw new Error("Tanggal check-in dan check-out wajib diisi.");

      const tglCheckIn = new Date(checkInVal);
      const tglCheckOut = new Date(checkOutVal);
      const hariIni = new Date();
      hariIni.setHours(0, 0, 0, 0);

      if (tglCheckIn < hariIni)
        throw new Error("Tanggal check-in tidak boleh di masa lalu.");
      if (tglCheckOut <= tglCheckIn)
        throw new Error("Tanggal check-out harus setelah tanggal check-in.");
      if (isNaN(jumlahTamu) || jumlahTamu < 1 || jumlahTamu > 10)
        throw new Error("Jumlah tamu harus di antara 1 sampai 10 orang.");

      // Perhitungan Otomatis
      const selisihWaktu = tglCheckOut - tglCheckIn;
      const jumlahMalam = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));

      const selectedVila = dataVila.find((v) => v.id == vilaId);
      const totalBiaya = selectedVila.harga * jumlahMalam;

      infoEstimasi.textContent = `Estimasi: ${jumlahMalam} malam | Total Biaya: Rp ${totalBiaya.toLocaleString("id-ID")}`;
      return {
        nama,
        selectedVila,
        jumlahMalam,
        totalBiaya,
        checkInVal,
        checkOutVal,
        jumlahTamu,
      };
    } catch (error) {
      alert(`Peringatan Validasi: ${error.message}`);
      infoEstimasi.textContent = "";
      return null;
    }
  }

  btnCek.addEventListener("click", hitungTotal);

  // Event Submit Form & LocalStorage
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dataPemesanan = hitungTotal();
    if (!dataPemesanan) return;

    // Simpan nama tamu & data ke localStorage
    localStorage.setItem("lastTamu", dataPemesanan.nama);
    localStorage.setItem("lastBooking", JSON.stringify(dataPemesanan));

    // Tampilkan pada area hasil
    tampilkanRiwayatTerakhir();
    alert("Pemesanan berhasil disimpan secara lokal!");
    bookingForm.reset();
    infoEstimasi.textContent = "";
  });

  // Muat data dari localStorage saat halaman dibuka
  function tampilkanRiwayatTerakhir() {
    const savedData = localStorage.getItem("lastBooking");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      hasilPesanan.innerHTML = `
                <p><strong>Nama Tamu:</strong> ${parsed.nama}</p>
                <p><strong>Vila Dipesan:</strong> ${parsed.selectedVila.nama}</p>
                <p><strong>Durasi:</strong> ${parsed.checkInVal} s.d ${parsed.checkOutVal} (${parsed.jumlahMalam} malam)</p>
                <p><strong>Jumlah Tamu:</strong> ${parsed.jumlahTamu} orang</p>
                <p><strong>Total Harga:</strong> Rp ${parsed.totalBiaya.toLocaleString("id-ID")}</p>
            `;
    }
  }

  tampilkanRiwayatTerakhir();
});
