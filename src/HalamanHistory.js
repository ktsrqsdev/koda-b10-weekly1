const { garis, rupiah, judul } = require("../lib/format");
const { state } = require("./state");

function halamanHistory() {
  judul("HISTORY PESANAN");

  for (const { no, waktu, items, total, bayar, kembali } of state.history) {
    console.log(`Pesanan ke-${no}`);
    console.log(garis("-"));
    console.log(`${"Waktu".padEnd(12)  }: ${  waktu}`);
    console.log(`${"Pesanan".padEnd(12)  }:`);

    items.forEach(({ qty, nama, harga }) => {
      console.log(`  ${  `${qty}x ${nama}`.padEnd(34)  }${rupiah(harga * qty).padStart(18)}`);
    });

    console.log(`${"Total".padEnd(12)  }: ${  rupiah(total)}`);
    console.log(`${"Bayar".padEnd(12)  }: ${  rupiah(bayar)}`);
    console.log(`${"Kembalian".padEnd(12)  }: ${  rupiah(kembali)}`);
    console.log(`${garis("-")  }\n`);
  }
}

module.exports = { halamanHistory };
