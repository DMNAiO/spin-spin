# Pembagian Tim & Live Chat

Aplikasi ini adalah halaman statis. Live chat memakai Supabase Auth, PostgreSQL, dan Supabase Realtime.

## Konfigurasi lokal

1. Salin `.env.example` menjadi `.env`.
2. Isi nilai dari **Supabase Dashboard → Project Settings → API**:

```env
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_ANON_KEY=sb_publishable_atau_anon_key
```

3. Jalankan generator konfigurasi:

```bash
npm run build
```

Perintah tersebut membuat `supabase-config.js` untuk browser. File `.env` dan `supabase-config.js` sudah masuk `.gitignore`.

## Setup Supabase

1. Buat project di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka **SQL Editor**.
3. Jalankan seluruh isi `supabase-schema.sql`.
4. Buka **Authentication → Sign In / Providers**.
5. Pastikan provider **Email** aktif.
6. Matikan **Confirm Email** karena login memakai username tanpa alamat email yang nyata.
7. Pastikan **Allow new users to sign up** aktif.
8. Atur **Authentication → URL Configuration** dengan URL aplikasi lokal/produksi.

Tidak diperlukan SMTP, Google OAuth, atau Anonymous Sign-Ins untuk mode akun persisten ini.

## Login username persisten

Pengguna membuat akun dengan:

- Username 2-30 karakter: huruf, angka, titik, garis bawah, atau tanda hubung.
- Password minimal 6 karakter.

Di balik layar, username dipetakan ke identifier internal Supabase. Pengguna tetap hanya melihat dan memasukkan username/password.

Akun dapat digunakan kembali dari perangkat/browser lain dengan username dan password yang sama. Karena tidak ada email pemulihan, password yang lupa tidak dapat di-reset melalui email.

## Menjadikan akun sebagai admin

1. Daftarkan username admin melalui aplikasi. Untuk akun utama, gunakan `admin` dengan password `admin123` hanya saat pembuatan akun.
2. Buka **Supabase → Authentication → Users**.
3. Salin UUID akun admin tersebut.
4. Jalankan SQL berikut di SQL Editor:

```sql
insert into public.admin_users (user_id)
values ('UUID_AKUN_ADMIN')
on conflict (user_id) do nothing;
```

5. Logout dan login kembali sebagai akun admin.

Panel **Pengaturan Kelompok** akan muncul hanya untuk akun yang ada di `admin_users`. Akun admin dapat:

- Menambahkan maksimal 10 kolom kelompok tetap.
- Memilih nomor kelompok 1-10 pada setiap kolom.
- Mengisi nama anggota satu nama per baris.
- Menghapus kolom sebelum menyimpan.
- Menyimpan semua aturan sekaligus.
- Membiarkan anggota lain tetap diacak otomatis.

Sistem menolak nomor kelompok duplikat dan nama anggota yang dimasukkan ke dua kelompok berbeda. RLS Supabase membatasi insert, update, dan delete aturan hanya untuk admin.

## Retensi chat

Pesan chat tersimpan realtime dan tidak langsung hilang. Supabase Cron menjalankan pembersihan setiap hari pukul 03:00 UTC:

- Pesan yang lebih tua dari tiga bulan dihapus.
- Percakapan yang sudah tidak memiliki pesan ikut dihapus.

Jika `pg_cron` belum aktif, aktifkan extension tersebut melalui **Database → Extensions**, lalu jalankan ulang bagian retensi di `supabase-schema.sql`.

## Deploy otomatis ke GitHub Pages

Workflow `.github/workflows/deploy.yml` membangun konfigurasi dari GitHub Actions Secrets setiap kali ada push ke branch `main`.

Tambahkan repository secrets berikut di **GitHub → Settings → Secrets and variables → Actions**:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Lalu aktifkan GitHub Pages dengan source **GitHub Actions**. Setiap `git push` ke `main` akan menjalankan build dan deploy otomatis.

## Deploy ke Vercel

1. Import repository GitHub ke Vercel.
2. Set **Build Command** menjadi:

```bash
npm run build
```

3. Tambahkan Environment Variables:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
```

4. Deploy ulang setiap kali ada push ke branch yang terhubung.

Vercel memberi domain bawaan `*.vercel.app`. Domain `.com` harus dibeli terpisah, lalu ditambahkan melalui **Project Settings → Domains**. Setelah domain custom aktif, masukkan URL tersebut ke **Supabase → Authentication → URL Configuration**.

## Fitur antarmuka

- Mode terang/gelap tersimpan di browser.
- Draft daftar anggota dan opsi pembagian tersimpan otomatis di `localStorage`.
- `Ctrl + Enter` menjalankan pembagian dari kolom nama.
- `Escape` mereset input jika tidak sedang mengetik password atau chat.
- Hasil menampilkan ringkasan jumlah anggota, kelompok, dan perwakilan.
- Hasil dapat disalin, diunduh sebagai TXT, atau dicetak.
- Daftar anggota chat dapat difilter dengan pencarian.

Tema gelap bawaan memakai visual midnight navy, glass panel, dan aksen electric blue bergaya konsol modern. Mode terang tetap tersedia melalui tombol tema di header.

## Perilaku chat

- Pengguna login dengan username/password.
- Setiap orang memiliki akun yang dapat dipakai di perangkat lain.
- Daftar username tampil di panel anggota.
- Pilih anggota untuk membuka percakapan pribadi.
- Pesan tersinkron realtime melalui Supabase Realtime.
- Maksimum satu pesan: 2.000 karakter.
- Row Level Security membatasi percakapan dan pesan hanya kepada pesertanya.
