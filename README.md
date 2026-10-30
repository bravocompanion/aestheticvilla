# Aesthetic Villa — Website Perkenalan

Website statis satu halaman untuk **aestheticvilla.my.id**, dengan konsep editorial, minimalis, dan hangat. Dibuat dengan HTML + CSS; tanpa database, framework, pembayaran, sistem pemesanan, atau tombol reservasi.

## Struktur website

- `index.html`: konten website, navigasi, teks, dan foto.
- `style.css`: tampilan desktop dan mobile.
- `favicon.svg`: ikon browser.
- `robots.txt` dan `sitemap.xml`: petunjuk mesin pencari.

## Penting: ganti foto ilustrasi dengan foto villa sebenarnya

Foto yang digunakan sekarang adalah *referensi suasana* dari Unsplash, **bukan foto atau representasi dari properti Aesthetic Villa**. Sebelum dijadikan website resmi, ganti URL foto pada `index.html` dengan foto yang benar-benar dimiliki atau berlisensi. Lokasi, alamat, jumlah kamar, fasilitas, dan harga sengaja tidak dicantumkan karena belum tersedia data resmi.

Anda dapat menambahkan foto ke folder `assets/` lalu mengubah `src` pada elemen `<img>` di `index.html`, misalnya `assets/hero-villa.webp`.

## Mengakses website

Buka `index.html` pada browser. Font dan foto contoh menggunakan jaringan eksternal.

## Publikasi

Commit ke GitHub tidak selalu membuat domain aktif. Perlu layanan hosting atau GitHub Pages dan DNS domain yang tepat. Jika memakai GitHub Pages, set repository **Settings → Pages → Deploy from a branch → main → /(root)**. Untuk domain khusus `aestheticvilla.my.id`, konfigurasi DNS harus dilakukan di pengelola domain terlebih dahulu.