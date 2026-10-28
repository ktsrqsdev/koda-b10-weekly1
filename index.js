const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const menu = [
    { id: 1, nama: "Induk Meleparrr", harga: 50000 },
    { id: 2, nama: "Induk Original", harga: 50000 },
    { id: 3, nama: "Paket Meleparrr Honey Spicy", harga: 26500 },
    { id: 4, nama: "Paket Meleparrr Korean Sauce", harga: 26500 },
    { id: 5, nama: "Paket Meleparrr Kari", harga: 26500 },
    { id: 6, nama: "Meleparrr Jumbo", harga: 41000 },
    { id: 7, nama: "Ayam Meleparrr 1", harga: 20500 },
    { id: 8, nama: "Ayam Meleparrr 2", harga: 22500 },
    { id: 9, nama: "Ayam Turbo", harga: 34500 },
    { id: 10, nama: "Meleparrr Doang", harga: 17500 },
    { id: 11, nama: "Cah Tauge", harga: 8500 },
    { id: 12, nama: "Cah Kangkung", harga: 8500 },
    { id: 13, nama: "Kulit Krispy", harga: 11500 },
    { id: 14, nama: "Tempe Goreng", harga: 3000 },
    { id: 15, nama: "Tahu Goreng", harga: 3000 },
    { id: 16, nama: "Kol Goreng", harga: 8500 },
    { id: 17, nama: "Telur Dadar", harga: 8000 },
    { id: 18, nama: "Jamur Krispy", harga: 13000 },
    { id: 19, nama: "Nasi Doang", harga: 7000 },
    { id: 20, nama: "Sambal Meleparrr (150 ml)", harga: 27000 },
    { id: 21, nama: "Sambal Asam Manis (150 ml)", harga: 27000 },
    { id: 22, nama: "Air Mineral", harga: 6000 },
    { id: 23, nama: "Es Teh", harga: 5500 },
    { id: 24, nama: "Es Kosong", harga: 1500 },
];

let keranjang = [];
let history = [];

async function tanya(pertanyaan) {
    const jawaban = await rl.question(pertanyaan);
    return jawaban.trim();
}

async function tanyaYaTidak(pertanyaan) {
    while (true) {
        const jawaban = await tanya(`${pertanyaan} (y/n): `);
        const jawab = jawaban.toLowerCase();

        if (jawab === "y") {
            return true;
        }
        if (jawab === "n") {
            return false;
        }
        console.log("Masukkan 'y' atau 'n'.");
    }
}

const LEBAR = 56;

function garis(karakter) {
    return karakter.repeat(LEBAR);
}

function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function judul(teks) {
    console.log("\n" + garis("="));
    console.log(teks.padStart(Math.floor((LEBAR + teks.length) / 2)));
    console.log(garis("="));
}

function totalKeranjang() {
    return keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);
}

function tampilMenu() {
    judul("DAFTAR MENU");
    console.log("ID".padEnd(6) + "Nama Menu".padEnd(32) + "Harga".padStart(18));
    console.log(garis("-"));

    for (const { id, nama, harga } of menu) {
        console.log(String(id).padEnd(6) + nama.padEnd(32) + rupiah(harga).padStart(18));
    }

    console.log(garis("-"));
    console.log("0".padEnd(6) + "Kembali ke Halaman Utama");
    console.log(garis("="));
}

function tampilKeranjang() {
    judul("CHECKOUT");
    console.log("No".padEnd(5) + "Menu".padEnd(32) + "Qty".padStart(5) + "Subtotal".padStart(14));
    console.log(garis("-"));

    keranjang.forEach(({ nama, harga, qty }, i) => {
        console.log(
            String(i + 1).padEnd(5) + nama.padEnd(32) + String(qty).padStart(5) + rupiah(harga * qty).padStart(14),
        );
    });

    console.log(garis("-"));
    console.log("TOTAL".padEnd(42) + rupiah(totalKeranjang()).padStart(14));
    console.log(garis("="));
}

async function halamanMenu() {
    while (true) {
        tampilMenu();
        const inputId = await tanya("Pilih ID menu: ");
        const pilih = Number(inputId);

        if (pilih === 0) {
            return;
        }

        const item = menu.find(m => m.id === pilih);
        if (!item) {
            console.log("ID menu tidak ditemukan!");
            continue;
        }

        const inputQty = await tanya(`Berapa banyak ${item.nama} yang ingin dibeli? `);
        const qty = Number(inputQty);

        if (!Number.isInteger(qty) || qty <= 0) {
            console.log("Jumlah tidak valid!");
            continue;
        }

        const ada = keranjang.find(k => k.id === item.id);
        if (ada) {
            ada.qty += qty;
        } else {
            keranjang.push({ ...item, qty });
        }
        console.log(`\n✔ ${qty}x ${item.nama} masuk ke checkout.`);

        const lagi = await tanyaYaTidak("Tambah pesanan lain?");
        if (!lagi) {
            return;
        }
    }
}

async function prosesBayar() {
    const total = totalKeranjang();

    while (true) {
        const inputBayar = await tanya(`Total ${rupiah(total)}. Masukkan uang bayar (0 untuk batal): `);
        const bayar = Number(inputBayar);

        if (Number.isNaN(bayar) || bayar < 0) {
            console.log("Nominal tidak valid!");
            continue;
        }
        if (bayar === 0) {
            return false;
        }
        if (bayar < total) {
            console.log(`Uang kurang ${rupiah(total - bayar)}. Silakan ulangi.`);
            continue;
        }

        const kembali = bayar - total;
        if (kembali === 0) {
            console.log("\nUang pas. Terima kasih sudah membeli!");
        } else {
            console.log("\nTerima kasih sudah membeli!");
            console.log(`Kembalian Anda: ${rupiah(kembali)}`);
        }

        history.push({
            no: history.length + 1,
            waktu: new Date().toLocaleString("id-ID"),
            items: keranjang.map(k => ({ ...k })),
            total,
            bayar,
            kembali,
        });

        keranjang = [];
        return true;
    }
}

async function halamanCheckout() {
    if (keranjang.length === 0) {
        console.log("\nBelum ada pesanan. Silakan pesan dulu di menu 1.");
        return;
    }

    while (true) {
        tampilKeranjang();
        console.log("1. Bayar");
        console.log("2. Batalkan Pembelian");
        console.log("0. Kembali ke Halaman Utama");
        const pilih = await tanya("Pilih: ");

        if (pilih === "0") {
            return;
        }

        if (pilih === "2") {
            keranjang = [];
            console.log("\nPembelian dibatalkan.");
            return;
        }

        if (pilih === "1") {
            const berhasil = await prosesBayar();
            if (berhasil) {
                return;
            }
            continue;
        }

        console.log("Pilihan tidak valid!");
    }
}

function halamanHistory() {
  judul("HISTORY PESANAN");


  for (const { no, waktu, items, total, bayar, kembali } of history) {
    console.log(`Pesanan ke-${no}`);
    console.log(garis("-"));
    console.log("Waktu".padEnd(12) + ": " + waktu);
    console.log("Pesanan".padEnd(12) + ":");

    items.forEach(({ qty, nama, harga }) => {
      console.log(
        "  " + `${qty}x ${nama}`.padEnd(34) + rupiah(harga * qty).padStart(18)
      );
    });

    console.log("Total".padEnd(12) + ": " + rupiah(total));
    console.log("Bayar".padEnd(12) + ": " + rupiah(bayar));
    console.log("Kembalian".padEnd(12) + ": " + rupiah(kembali));
    console.log(garis("-") + "\n");
  }
}

async function tes() {
  halamanHistory();
  await halamanMenu();
  await halamanCheckout();
  await halamanMenu();
  await halamanCheckout();
  halamanHistory();
  rl.close();
}
tes();