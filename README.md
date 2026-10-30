# Ayam Melepar
 
Aplikasi kasir sederhana untuk restoran Ayam Melepar, jalan di terminal (CLI). Dibuat pakai Node.js tanpa library tambahan, hanya modul bawaan seperti `readline`, `fs`, dan `path`.
 
Kita bisa lihat daftar menu, pilih pesanan, bayar, lalu lihat riwayat pesanan.
 
## Fitur
 
- Lihat daftar menu beserta harganya
- Tambah pesanan ke keranjang (checkout), kalau menu yang sama dipilih lagi jumlahnya ditambah
- Bayar dan hitung kembalian otomatis
- Batalkan pembelian
- Lihat history pesanan
- Menu dibaca dari file `data/menu.json`
## Cara menjalankan
 
Butuh Node.js yang sudah terpasang.
 
```bash
npm install
npm start
```

## Alur program
 
Saat program jalan, muncul halaman utama:
 
```
1. Menu
2. Checkout
3. History
4. Exit
```
 
**1. Menu**
- Daftar menu tampil, lalu masukkan ID menu.
- Masukkan jumlah yang mau dibeli.
- Pesanan masuk ke keranjang, lalu ditanya mau tambah pesanan lain atau tidak (y/n).
- Ketik `0` di pilihan ID untuk kembali ke halaman utama.

**2. Checkout**
- Kalau keranjang kosong, muncul pesan dan langsung kembali.
- Kalau ada isinya, tampil daftar pesanan dan total. Pilihannya: bayar, batalkan pembelian, atau kembali.
- Kalau pilih bayar, masukkan uang. Kalau uang kurang, diminta ulang. Ketik `0` untuk batal bayar.
- Kalau uang cukup, muncul kembalian, pesanan masuk ke history, dan keranjang dikosongkan.

**3. History**

Menampilkan semua pesanan yang sudah dibayar: waktu, isi pesanan, total, bayar, dan kembalian. Tekan Enter untuk kembali.
 
**4. Exit**
 
Keluar dari program.