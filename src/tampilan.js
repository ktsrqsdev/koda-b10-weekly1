const {garis, rupiah, judul} = require("../lib/format");
const {state, totalKeranjang} = require ("../src/state.js");

function tampilMenu() {
  judul("DAFTAR MENU");
  console.log("ID".padEnd(6) + "Nama Menu".padEnd(32) + "Harga".padStart(18));
  console.log(garis("-"));

  for (const { id, nama, harga } of state.menu) {
    console.log(String(id).padEnd(6) + nama.padEnd(32) + rupiah(harga).padStart(18));
  }

  console.log(garis("-"));
  console.log(`${"0".padEnd(6)  }Kembali ke Halaman Utama`);
  console.log(garis("="));
}

function tampilKeranjang() {
  judul("CHECKOUT");
  console.log("No".padEnd(5) + "Menu".padEnd(32) + "Qty".padStart(5) + "Subtotal".padStart(14));
  console.log(garis("-"));

  state.keranjang.forEach(({ nama, harga, qty }, i) => {
    console.log(
      String(i + 1).padEnd(5) + nama.padEnd(32) + String(qty).padStart(5) + rupiah(harga * qty).padStart(14),
    );
  });

  console.log(garis("-"));
  console.log("TOTAL".padEnd(42) + rupiah(totalKeranjang()).padStart(14));
  console.log(garis("="));
}

module.exports = { tampilKeranjang, tampilMenu };
