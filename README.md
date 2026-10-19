# Modesy Multi-Vendor Marketplace — Dokumentasi Lengkap & Arsitektur

Dokumentasi ini merangkum **struktur folder proyek, alur kerja (web flow), sistem autentikasi multi-role, integrasi database Supabase, dan manajemen aset produk** pada aplikasi Modesy Marketplace Clone berbasis Next.js 15 (App Router), Tailwind CSS, TypeScript, dan Supabase.

---

## 📌 1. Daftar Perbaikan Bug & Fitur Terkini

1. **Header Keranjang Tamu (Guest Cart Header Fixed)**:
   - Pada saat pengguna bertatus *guest* (belum login) mengakses halaman keranjang belanja (`/cart`), header tidak lagi berubah secara otomatis menjadi akun vendor "Trendshop".
   - Header tamu tetap konsisten menampilkan tombol **Login** dan **Register**, serta keranjang mencerminkan status belanja sebenarnya dari tamu.
2. **Redirect Login Terpadu (Unified Post-Login Redirect)**:
   - Apapun role akun yang melakukan login (**Admin**, **Vendor**, **Moderator**, maupun **Member/Buyer**), setelah proses autentikasi berhasil, sistem secara konsisten melakukan `router.push("/")` langsung ke **Landing Page utama**.
   - Dari landing page, user dapat menjelajah produk dan mengakses panel kontrol masing-masing melalui dropdown profil di header.
3. **Produk & Aset Gambar Database (Database Product Display & Local Assets)**:
   - Semua aset gambar fisik di `public/images/products/` telah didaftarkan dan diintegrasikan ke database Supabase (`products` & `product_images`) serta katalog lokal (`CATEGORY_PRODUCTS`).
   - Komponen katalog kategori (`CategoryPageView.tsx`) kini aktif mengambil data produk secara langsung dari Supabase via `getProducts()`, dengan mekanisme *graceful fallback* ke registry lokal jika database offline atau kosong.

---

## 📁 2. Struktur Folder Lengkap Proyek

Berikut adalah rincian hierarki direktori proyek beserta peran masing-masing modul:

```text
modesy-dupl/
├── public/                                      # Aset statis publik (dapat diakses langsung via URL browser)
│   ├── images/
│   │   ├── products/                            # Aset gambar produk jualan lokal
│   │   │   ├── puma-shoes.jpg                   # Sepatu olahraga Puma (kategori Shoes)
│   │   │   ├── shoes-streetwear.jpg             # Sepatu streetwear pria
│   │   │   ├── white-slides.jpg                 # Sandal santai putih
│   │   │   ├── black-cap.jpg                    # Topi pelindung matahari (Jewelry & Accessories)
│   │   │   ├── draft-breakfast-plate.jpg        # Piring keramik handmade (Home & Living)
│   │   │   ├── draft-vintage-lock.jpg           # Gembok dekoratif antik & jam meja
│   │   │   ├── draft-red-art.jpg                # Lukisan seni geometris merah (Graphics & Photos)
│   │   │   ├── vacation-spots.jpg               # Cetak seni pemandangan tropis
│   │   │   ├── grey-boots.webp & hover          # Sepatu boots abu-abu wanita
│   │   │   ├── brown-bootie.webp & hover        # Sepatu boots cokelat kulit
│   │   │   ├── midi-skirt.webp                  # Rok midi hitam bermotif bunga (Clothing)
│   │   │   ├── floral-sundress.webp & hover     # Gaun floral musim panas
│   │   │   ├── light-blue-shirt.webp & hover    # Kemeja biru muda wanita
│   │   │   ├── women-lace-blouse.webp & hover   # Blus renda aneka warna
│   │   │   ├── elegant-white-lace.webp          # Kain renda putih elegan
│   │   │   ├── polka-dress.webp & hover         # Gaun polkadot navy
│   │   │   ├── summer-top-lace.webp & hover     # Atasan musim panas
│   │   │   ├── men-outerwear.webp               # Pakaian luaran pria
│   │   │   ├── cobalt-man-tshirt.webp & hover   # Kaos pria cobalt
│   │   │   ├── grey-couch.webp                  # Sofa abu-abu modern
│   │   │   ├── pillow.webp & hover              # Bantal sofa dekoratif
│   │   │   ├── kipling-bag.webp & hover         # Tas selempang wanita Kipling
│   │   │   ├── black-backpack.webp & hover      # Ransel wanita hitam
│   │   │   ├── scarves.webp & hover             # Syal wanita warna-warni
│   │   │   ├── ship-art.webp                    # Ilustrasi kapal laut
│   │   │   └── cat-art.webp & hover             # Koleksi seni ilustrasi kucing
│   │   ├── logo.png, logo-dark.png              # Logo brand Modesy
│   │   └── sliders/                             # Banner carousel landing page
│   └── favicon.ico                              # Favicon web
│
├── supabase/                                    # Skrip migrasi dan konfigurasi database Supabase
│   ├── schema.sql                               # Skema tabel (profiles, categories, products, product_images, dll.)
│   └── seed.sql                                 # Data bibit (demo users, kategori 3-tingkat, katalog produk)
│
├── src/
│   ├── app/                                     # Next.js 15 App Router (Routing halaman & layouts)
│   │   ├── layout.tsx                           # Root layout (Membungkus AuthProvider, CartProvider, WishlistProvider)
│   │   ├── globals.css                          # Konfigurasi Tailwind CSS dan token warna
│   │   ├── page.tsx                             # Landing page utama Modesy
│   │   │
│   │   ├── (auth)/                              # Rute autentikasi mandiri
│   │   │   └── admin/login/page.tsx             # Halaman login khusus panel admin
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/page.tsx                  # Halaman produk dinamis berdasarkan slug kategori
│   │   │
│   │   ├── products/
│   │   │   └── jewelry-accessories/page.tsx     # Alias rute produk kategori perhiasan & aksesori
│   │   │
│   │   ├── product/
│   │   │   └── [id]/page.tsx                    # Halaman detail produk (spesifikasi, ulasan, varian)
│   │   │
│   │   ├── cart/page.tsx                        # Halaman keranjang belanja
│   │   ├── wishlist/page.tsx                    # Halaman daftar barang favorit
│   │   │
│   │   ├── admin/                               # Panel Kontrol Admin (/admin)
│   │   │   ├── layout.tsx                       # Layout admin (AdminSidebar + AdminHeader)
│   │   │   ├── page.tsx                         # Dashboard ringkasan metrik & data widget
│   │   │   ├── products/                        # Manajemen produk & persetujuan
│   │   │   ├── orders/                          # Manajemen pesanan & transaksi
│   │   │   ├── categories/                      # Pengaturan kategori produk
│   │   │   └── users/                           # Manajemen akun & hak akses
│   │   │
│   │   ├── vendor/                              # Portal Khusus Toko / Penjual (/vendor)
│   │   │   ├── layout.tsx                       # Layout dashboard vendor
│   │   │   ├── page.tsx                         # Ringkasan penjualan vendor
│   │   │   ├── products/                        # Produk jualan milik vendor
│   │   │   └── profile/                         # Halaman profil toko publik vendor
│   │   │
│   │   ├── moderator/                           # Portal Moderator (/moderator)
│   │   ├── member/                              # Area Pelanggan / Buyer (/member)
│   │   └── guest/                               # Area Pratinjau Guest (/guest)
│   │
│   ├── components/                              # Komponen UI Reusable
│   │   ├── layout/                              # Komponen layout global
│   │   │   ├── guest/
│   │   │   │   ├── ModesyHeader.tsx             # Header utama responsif (SearchBar, Cart, Wishlist, Auth)
│   │   │   │   ├── header.tsx                   # Sub-komponen baris atas header tamu
│   │   │   │   └── ModesyFooter.tsx             # Footer informatif (Newsletter, Link bantuan, Hak cipta)
│   │   │   └── admin/
│   │   │       ├── AdminHeader.tsx              # Topbar navigasi admin
│   │   │       ├── AdminSidebar.tsx             # Sidebar gelap dengan menu bertingkat
│   │   │       ├── StatCard.tsx                 # Kartu angka statistik
│   │   │       └── DataTable.tsx                # Tabel data pesanan/transaksi
│   │   │
│   │   ├── home/                                # Komponen halaman landing page
│   │   │   ├── HeroSlider.tsx                   # Banner slider promosi
│   │   │   ├── FeaturedCategories.tsx           # Grid kategori unggulan
│   │   │   ├── NewArrivals.tsx                  # Tab produk terbaru
│   │   │   ├── SpecialOffers.tsx                # Seksi penawaran diskon terbatas
│   │   │   ├── ClothingSection.tsx              # Seksi produk busana
│   │   │   └── BlogSection.tsx                  # Artikel berita & tips
│   │   │
│   │   ├── category/
│   │   │   └── CategoryPageView.tsx             # View katalog: Fetch database, filter harga, brand, sort
│   │   │
│   │   ├── product/
│   │   │   ├── ProductDetailView.tsx            # View produk lengkap (Gallery, Varian ukuran/warna, Ulasan)
│   │   │   ├── ProductCard.tsx                  # Kartu produk individual
│   │   │   └── ProductGrid.tsx                  # Grid responsif kartu produk
│   │   │
│   │   ├── cart/
│   │   │   └── CartView.tsx                     # Tabel keranjang, kuantitas item, subtotal & checkout
│   │   │
│   │   ├── wishlist/
│   │   │   └── WishlistView.tsx                 # Tampilan daftar produk tersimpan di wishlist
│   │   │
│   │   └── auth/
│   │       ├── LoginModal.tsx                   # Modal pop-up login cepat dengan akun demo
│   │       ├── LoginForm.tsx                    # Form input email & password
│   │       └── AuthModal.tsx                    # Modal pendaftaran akun baru
│   │
│   ├── context/                                 # State Management React Context
│   │   ├── AuthContext.tsx                      # Autentikasi multi-role (login/logout, redirect ke landing page)
│   │   ├── CartContext.tsx                      # Manajemen keranjang (tambah, hapus, update qty, persistensi)
│   │   └── WishlistContext.tsx                  # Manajemen favorit/wishlist
│   │
│   ├── data/                                    # Dataset Lokal & Registry Fallback
│   │   ├── categories.ts                        # Daftar kategori, subkategori, dan slug URL
│   │   ├── categoryProducts.ts                  # Koleksi produk kategori dengan referensi gambar lokal
│   │   ├── productsRegistry.ts                  # Registry data detail produk untuk `/product/[id]`
│   │   └── specialOffers.ts                     # Data produk diskon khusus
│   │
│   └── lib/                                     # Utilitas Eksternal & Integrasi API
│       └── supabase/
│           ├── client.ts                        # Inisialisasi Supabase Client (Browser/Server)
│           ├── products.ts                      # Fungsi CRUD produk (`getProducts`, `getProductBySlugOrId`)
│           ├── reviews.ts                       # Manajemen rating ulasan & komentar
│           ├── wishlist.ts                      # Operasi wishlist di Supabase
│           └── types.ts                         # Tipe data TypeScript skema tabel database
│
├── .env.local                                   # Konfigurasi Environment Variables (URL & Anon Key Supabase)
├── next.config.ts                               # Konfigurasi Next.js
├── tailwind.config.ts                           # Konfigurasi styling Tailwind CSS
├── tsconfig.json                                # Konfigurasi kompilasi TypeScript
└── package.json                                 # Dependensi proyek (React 19, Next.js 15, Supabase, Lucide)
```

---

## 🔄 3. Urutan dan Alur Kerja Web (Web Flow & Sequence)

### A. Alur Kunjungan Tamu (Guest Journey)
1. **Membuka Halaman Utama (`/`)**:
   - Pengguna disambut oleh `ModesyHeader` yang menampilkan status **Guest** (Tersedia tombol **Login** dan **Register**).
   - Menampilkan banner promosi, kategori unggulan, dan etalase produk terbaru.
2. **Menjelajah Katalog Kategori (`/category/[slug]`)**:
   - URL kategori diakses (contoh: `/category/shoes`, `/category/jewelry-accessories`).
   - Komponen `CategoryPageView` secara otomatis memanggil `getProducts({ categorySlug: slug })` ke database **Supabase**.
   - Sistem mencocokkan kategori dan subkategori, lalu menampilkan produk lengkap dengan gambar lokal dari `/images/products/`.
   - Tamu dapat memfilter berdasarkan subkategori, rentang harga, nama brand, atau melakukan sorting (termurah, termahal, rating tertinggi).
3. **Melihat Detail Produk (`/product/[id]`)**:
   - Tamu mengklik produk, lalu diarahkan ke halaman detail produk.
   - Mengambil data produk dari Supabase (berdasarkan UUID produk) atau registry lokal.
   - Tamu dapat memilih varian ukuran/warna dan melihat ulasan pembeli.
4. **Menambahkan ke Keranjang (`Add to Cart`)**:
   - Tamu menekan tombol keranjang di kartu produk atau tombol `Add to Cart` di halaman detail.
   - `CartContext` menyimpan item belanja ke *state* & *local storage*.
   - Badge keranjang di header bertambah secara reaktif.
5. **Mengakses Halaman Keranjang (`/cart`)**:
   - Tamu mengklik ikon keranjang di header.
   - **Header tetap berstatus Guest**: Tidak ada pergantian akun ke vendor Trendshop.
   - Halaman `CartView` menampilkan rincian barang yang dimasukkan oleh tamu dengan kalkulasi subtotal dan total harga yang akurat.

---

### B. Alur Autentikasi & Routing Pasca-Login (Auth Flow)
1. **Memicu Modal / Halaman Login**:
   - Pengguna menekan tombol **Login** di header atau mengakses `/admin/login`.
   - Tersedia akun demo bawaan untuk pengujian instan:
     - 👑 **Admin**: `admin@modesy.com` / `admin123`
     - 🏪 **Vendor**: `vendor@modesy.com` / `vendor123`
     - 🛡️ **Moderator**: `moderator@modesy.com` / `moderator123`
     - 👤 **Member / Buyer**: `member@modesy.com` / `member123`
2. **Proses Autentikasi (`AuthContext`)**:
   - Sistem memverifikasi kredensial ke Supabase Auth (atau mekanisme local session fallback).
   - Informasi profil pengguna dan role tersimpan di session state.
3. **Pengalihan Terpadu ke Landing Page (`router.push("/")`)**:
   - **Semua role tanpa terkecuali** secara konsisten dialihkan ke **Landing Page (`/`)** setelah berhasil login.
4. **Header Interaktif Pasca-Login**:
   - Header kini menampilkan avatar dan nama pengguna yang login.
   - Terdapat tombol dropdown menu dengan tautan cepat menuju panel kerja masing-masing role:
     - Akun Admin: Menu **Admin Panel** (`/admin`)
     - Akun Vendor: Menu **Dashboard Vendor** (`/vendor`) & **Kelola Produk**
     - Akun Member: Menu **Pesanan Saya** & **Pengaturan Akun**

---

### C. Alur Integrasi Database & Gambar Produk (Database & Image Pipeline)
```
+------------------------------------+       +------------------------------------+
|  Folder public/images/products/    |       |       Database Supabase            |
|  - puma-shoes.jpg                  | <---> |  Tabel 'products'                  |
|  - white-slides.jpg                |       |  Tabel 'product_images'            |
|  - draft-breakfast-plate.jpg       |       |  (image_url: /images/products/...) |
|  - draft-vintage-lock.jpg, dll.    |       +-----------------+------------------+
+------------------------------------+                         |
                                                               v
                                             +------------------------------------+
                                             |  lib/supabase/products.ts          |
                                             |  getProducts({ categorySlug })     |
                                             +-----------------+------------------+
                                                               |
                                                               v
                                             +------------------------------------+
                                             |  CategoryPageView.tsx              |
                                             |  - Render gambar produk lokal      |
                                             |  - Filter subkategori & brand      |
                                             |  - Fallback ke CATEGORY_PRODUCTS   |
                                             +------------------------------------+
```

1. **Penyimpanan Aset Fisik**:
   File gambar disimpan di `public/images/products/` sehingga dilayani langsung oleh server Next.js tanpa dependensi pihak ketiga atau risiko link eksternal rusak.
2. **Pencatatan di Supabase**:
   Tabel `product_images` menyimpan kolom `image_url` yang menunjuk ke path relatif `/images/products/<nama-file>`.
3. **Konsumsi di Komponen Frontend**:
   Komponen `CategoryPageView` memanggil `getProducts()`. Produk yang diterima langsung dimetakan ke format tampilan kartu produk, menghasilkan etalase katalog yang aktif, cepat, dan responsif.

---

## 🚀 4. Panduan Menjalankan Proyek Secara Lokal

### Prasyarat
- **Node.js**: Versi 18.18 atau lebih baru (disarankan Node.js v20/v22).
- **Package Manager**: npm atau yarn.

### Langkah Instalasi

1. **Clone / Buka Direktori Proyek**:
   ```bash
   cd "d:\Next JS\modesy-dupl"
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Periksa Konfigurasi Lingkungan (`.env.local`)**:
   Pastikan file `.env.local` di root proyek memiliki konfigurasi Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://ertnuoujouuochwqpwdh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Jalankan Server Pengembangan**:
   ```bash
   npm run dev
   ```

5. **Akses Aplikasi di Browser**:
   Buka [http://localhost:3000](http://localhost:3000) untuk mulai menggunakan Modesy Marketplace.

---

## 🛠️ 5. Skrip yang Tersedia

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan Next.js development server di port 3000 |
| `npm run build` | Membuat bundel produksi aplikasi untuk *deployment* |
| `npm run start` | Menjalankan server aplikasi Next.js dalam mode produksi |
| `npm run lint` | Memeriksa kepatuhan kode dan deteksi *code smell* |
| `npx tsc --noEmit` | Memverifikasi kepatuhan tipe data TypeScript di seluruh proyek |
