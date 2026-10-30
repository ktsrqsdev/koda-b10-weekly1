const { tanya, tutupInput } = require("./lib/input");
const { garis, judul } = require("./lib/format");
const { bacaMenu, bacaHistory } = require("./lib/storage");
const { state } = require("./src/state");
const { halamanMenu } = require("./src/halamanMenu");
const { halamanCheckout } = require("./src/halamanCheckout");
const { halamanHistory } = require("./src/HalamanHistory");

async function main() {
  try {
    state.menu = bacaMenu();
    state.history = bacaHistory();
    while (true) {
      let labelItem = "";
      if (state.keranjang.length > 0) {
        labelItem = ` (${state.keranjang.length} item)`;
      }
      judul("AYAM MELEPAR");
      console.log("1. Menu");
      console.log(`2. Checkout${  labelItem}`);
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
    tutupInput();
  }
}

main();
