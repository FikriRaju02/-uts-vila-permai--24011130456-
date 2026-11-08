# Ujian Tengah Semester - Teknologi Web: Aplikasi Pemesanan Vila ("Vila Permai")

## Identitas Mahasiswa

- Nama : Fikri Raju Duaziz
- NIM : 24011130456
- kelas : D3/MI/5/AM
- Nama Repository: uts-vila-permai-24011130456
- Mata Kuliah:Teknologi Web (Studi Kasus Vila Permai)

## Deskripsi Singkat Fitur

Aplikasi web statis interaktif untuk pemesanan vila di Puncak, Bogor. Dibangun tanpa _back-end_ atau basis data server, di mana seluruh data vila dikelola menggunakan array objek JavaScript dan disimpan secara lokal menggunakan `localStorage`[cite: 1, 3].

## Cara Menjalankan Halaman

1. Unduh (_clone_) repository ini ke komputer lokal Anda[cite: 3].
2. Buka folder proyek menggunakan _code editor_ (seperti Visual Studio Code)[cite: 3].
3. Buka file **`index.html`** dengan cara mengkliknya dua kali atau membukanya melalui _browser_ web pilihan Anda (Chrome, Firefox, Edge, dll)[cite: 3].

## Daftar Fitur yang Sudah Selesai

- **Struktur HTML5 Semantik:** Menggunakan elemen valid seperti `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`[cite: 2].
- **Desain CSS Responsif:** Menggunakan _external stylesheet_ (`style.css`), _box-model_, serta _breakpoint media query_ (`max-width: 768px`) agar nyaman diakses lewat ponsel maupun laptop[cite: 2].
- **Katalog & Pencarian Dinamis:** Menampilkan data vila dari array objek JavaScript menggunakan manipulasi DOM (`createElement` & `appendChild`) serta fitur pencarian _real-time_[cite: 2, 3].
- **Formulir & Validasi Berbahasa Indonesia:** Validasi input lengkap (nama tamu, pilihan vila, tanggal tidak boleh di masa lalu, durasi inap, dan jumlah tamu 1–10 orang) dengan pesan peringatan berbahasa Indonesia[cite: 2, 3].
- **Perhitungan Otomatis & Penyimpanan Lokal:** Menghitung total biaya otomatis (harga per malam × jumlah malam) dan menyimpan riwayat pesanan terakhir menggunakan `localStorage`[cite: 2, 3].

## Daftar Fitur yang Belum Selesai

- Integrasi _payment gateway_ pihak ketiga untuk pembayaran online otomatis (karena keterbatasan arsitektur statis klien murni).

## Tangkapan Layar (Screenshot) Halaman Web

_(Silakan letakkan file gambar screenshot halaman web kamu ke dalam folder proyek, lalu tautkan di sini dengan format markdown di bawah ini)_:

![![alt text](image.png)](hasil_website.png)
