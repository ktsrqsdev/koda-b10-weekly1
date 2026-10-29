const { tanya } = require("../lib/input");
const { rupiah } = require("../lib/format");
const { simpanHistory } = require("../lib/storage");
const { state, totalKeranjang } = require("./state");
const { tampilKeranjang } = require("./tampilan");

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

        state.history.push({
            no: state.history.length + 1,
            waktu: new Date().toLocaleString("id-ID"),
            items: state.keranjang.map(k => ({ ...k })),
            total,
            bayar,
            kembali,
        });

        state.keranjang = [];
        return true;
    }
}

async function halamanCheckout() {
    if (state.keranjang.length === 0) {
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
            state.keranjang = [];
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

module.exports = { halamanCheckout }