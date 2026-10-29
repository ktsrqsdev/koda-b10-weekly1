const { tanya, tanyaYaTidak } = require("../lib/input")
const { state } = require("./state")
const { tampilMenu } = require("./tampilan")

async function halamanMenu() {
    while (true) {
        tampilMenu();
        const inputId = await tanya("Pilih ID menu: ");
        const pilih = Number(inputId);

        if (pilih === 0) {
            return;
        }

        const item = state.menu.find(m => m.id === pilih);
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

        const ada = state.keranjang.find(k => k.id === item.id);
        if (ada) {
            ada.qty += qty;
        } else {
            state.keranjang.push({ ...item, qty });
        }
        console.log(`\n✔ ${qty}x ${item.nama} masuk ke checkout.`);

        const lagi = await tanyaYaTidak("Tambah pesanan lain?");
        if (!lagi) {
            return;
        }
    }
}

module.exports = { halamanMenu }