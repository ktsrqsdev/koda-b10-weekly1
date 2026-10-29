



let keranjang = [];
let history = [];




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
            console.log("  " + `${qty}x ${nama}`.padEnd(34) + rupiah(harga * qty).padStart(18));
        });

        console.log("Total".padEnd(12) + ": " + rupiah(total));
        console.log("Bayar".padEnd(12) + ": " + rupiah(bayar));
        console.log("Kembalian".padEnd(12) + ": " + rupiah(kembali));
        console.log(garis("-") + "\n");
    }
}

async function main() {
    try {
        while (true) {
            let labelItem = "";
            if (keranjang.length > 0) {
                labelItem = ` (${keranjang.length} item)`;
            }
            judul("AYAM MELEPAR");
            console.log("1. Menu");
            console.log("2. Checkout" + labelItem);
            console.log("3. History");
            console.log("4. Exit");
            console.log(garis("="));

            const pilih = await tanya("Pilih menu (1-4): ");

            if (pilih === "1") {
                await halamanMenu();
            } else if (pilih === "2") {
                await halamanCheckout();
            } else if (pilih === "3") {
                halamanHistory();
                await tanya("Tekan Enter untuk kembali...");
            } else if (pilih === "4") {
                console.log("\nTerima kasih sudah berkunjung ke Ayam Melepar!");
                return;
            } else {
                console.log("Pilihan tidak valid!");
            }
        }
    } catch (error) {
        console.log("Terjadi kesalahan:", error.message);
    } finally {
        
    }
}

main();
