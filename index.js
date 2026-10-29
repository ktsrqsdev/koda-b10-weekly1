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
