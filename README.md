# Support

Halaman donasi statis pribadi dengan tema brutalism, tanpa payment gateway. Pengunjung bisa mendukung lewat QRIS atau transfer manual, lalu mengirim pesan dukungan.

Demo: https://403support-eta.vercel.app

## Fitur

- Donasi lewat QRIS dan transfer manual (e-wallet / rekening)
- Form pesan dukungan, dengan unggah bukti transfer yang bersifat opsional
- Bagian profil dengan tautan sosial
- Desain brutalism, ikon SVG, tanpa emoji
- Ringan dan siap deploy di Vercel

## Tech

Vite + TypeScript. Dibuat di Google AI Studio dan di-deploy di Vercel.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env
npm run dev
```

Isi variabel di `.env` sesuai kebutuhan. Jangan commit file `.env`.

## Sebelum dipakai: GANTI DATA PRIBADI

Repo ini berisi data milik pembuat aslinya. Kalau kamu mem-fork atau memakai kodenya, ganti semua hal berikut dengan milikmu sendiri, supaya donasi tidak masuk ke akun orang lain:

- [ ] QRIS di `public/qris-merchant.png`
- [ ] Nomor e-wallet dan rekening (DANA, GoPay, BCA, SeaBank, dst)
- [ ] Nama, bio, dan foto profil di `public/`
- [ ] Link sosial (GitHub, WhatsApp, dst)
- [ ] Alamat email penerima pesan dukungan
- [ ] Judul halaman, `metadata.json`, dan teks lain yang menyebut pemilik asli

## Deploy

1. Fork repo ini.
2. Import ke [Vercel](https://vercel.com), lalu deploy.
3. Tambahkan environment variable yang dibutuhkan (lihat `.env.example`) di Project Settings > Environment Variables, lalu redeploy.

## Lisensi

Kode dilisensikan di bawah [MIT License](LICENSE).

Lisensi MIT hanya berlaku untuk kode. QRIS, foto, nama, logo, dan identitas pribadi pembuat asli tidak termasuk dan tidak boleh dipakai ulang tanpa izin.

## Kontribusi

Issue dan pull request dipersilakan. Untuk perubahan besar, buka issue dulu supaya bisa didiskusikan.
