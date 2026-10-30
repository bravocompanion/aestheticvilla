# Aesthetic Villa — Website Landing Page

Website statis, cepat, dan responsif untuk **aestheticvilla.my.id**. Tidak perlu database, framework, atau biaya server khusus. HTML, CSS, dan JavaScript murni.

## Cara melihat website

Buka `index.html` di Chrome/Edge atau gunakan server lokal. Foto dan font menggunakan layanan eksternal sehingga butuh koneksi internet.

## PENTING: data demo

**Foto, fasilitas, dan deskripsi adalah contoh tampilan, BUKAN data properti yang telah diverifikasi.** Jangan publikasikan sebagai representasi resmi villa sebelum menggantinya dengan foto dan informasi yang benar.

## Ubah data properti (WAJIB)

Edit file `site.config.js`:

1. `whatsapp`: nomor admin, contoh `6281234567890` (tanpa `+`). Jika kosong, tombol reservasi hanya menyusun pesan yang dapat disalin, **tidak mengirim pesan**.
2. `locationLabel`: nama area/alamat villa sebenarnya.
3. `locationDescription`: alamat lengkap, informasi akses, dan patokan lokasi.
4. `mapsUrl`: tautan Google Maps asli, mis. `https://maps.google.com/...`.
5. `instagram`: tautan Instagram resmi, opsional.
6. `email`: email resmi, opsional.
7. `amenities`: ganti dengan fasilitas yang benar-benar tersedia.
8. `photos`: ganti setiap `src` dengan URL **foto villa Anda sendiri** (boleh juga mengganti dengan path lokal seperti `assets/foto-villa-1.webp`).

Edit juga URL foto latar pada `style.css`: cari `images.unsplash.com` (3 lokasi: hero desktop/mobile, feature, CTA) dan ganti dengan foto lokal sendiri. Jika ingin mengubah seluruh konten teks, edit `index.html`.

## Cara mengganti ke foto lokal agar website tidak bergantung ke Unsplash

Buat folder `assets`, simpan foto yang sudah dioptimalkan dalam format `.webp` (target 100–400 KB per foto). Ubah path CSS dan konfigurasi sesuai nama file foto. Gunakan ukuran lebar 1600–2000px untuk foto hero, 900–1400px untuk galeri. Favicon (`favicon.svg`) sudah lokal.

## Cara deploy

**Netlify Drop:** masuk `https://app.netlify.com/drop` lalu tarik folder `aesthetic-villa` berisi semua file. Hubungkan domain lewat pengaturan custom domain, lalu pasang DNS di registrar domain berdasarkan petunjuk Netlify.

**Cloudflare Pages (jika domain kompatibel dan bisa dikonfigurasi):** upload seluruh file sebagai static website, atur custom domain di Pages.

**Citrahost / cPanel / hosting biasa:** upload isi folder ini (bukan folder induknya) ke direktori `public_html` domain.

Domain `aestheticvilla.my.id` tidak otomatis aktif hanya karena file dibuat. Hosting dan DNS harus dihubungkan oleh pemilik domain.

## Yang sudah tersedia

- Landing page premium bernuansa tropis-minimalis, mobile & desktop
- Menu responsif dan tombol reservasi
- Pemilihan tanggal / jumlah tamu, validasi tanggal
- Pesan WhatsApp siap kirim **hanya setelah nomor WA pengelola diisi**
- Galeri lightbox, navigasi keyboard, dan aksesibilitas dasar
- Bagian fasilitas, lokasi, FAQ, dan CTA
- Metadata SEO, canonical URL, robots.txt, sitemap.xml, favicon SVG
- CSS dan JS tanpa build tools

## Yang belum tersedia

- Kalender ketersediaan real-time
- Pembayaran online / konfirmasi otomatis
- Dashboard admin / CMS
- Sistem pemesanan dan penyimpanan data tamu
- Publikasi pada domain (memerlukan akses hosting / DNS)

## Catatan teknis

File ini tidak mengirim atau menyimpan data pelanggan ke server. Pemilik bertanggung jawab atas keakuratan informasi properti dan hak menggunakan foto. Teks dan elemen desain adalah contoh awal yang bebas disesuaikan.