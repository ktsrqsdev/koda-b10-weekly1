const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = [
    {id: 1, nama:"Induk Meleparrr", harga: 50000},
    {id: 2, nama:"Induk Original", harga: 50000},
    {id: 3, nama:"Paket Meleparrr Honey Spicy", harga: 26500},
    {id: 4, nama:"Paket Meleparrr Korean Sauce", harga: 26500},
    {id: 5, nama:"Paket Meleparrr Kari", harga: 26500},
    {id: 6, nama:"Meleparrr Jumbo", harga: 41000},
    {id: 7, nama:"Ayam Meleparrr 1", harga: 20500},
    {id: 8, nama:"Ayam Meleparrr 2", harga: 22500},
    {id: 9, nama:"Ayam Turbo", harga: 34500},
    {id: 10, nama:"Meleparrr Doang", harga: 17500},
    {id: 11, nama:"Cah Tauge", harga: 8500},
    {id: 12, nama:"Cah Kangkung", harga: 8500},
    {id: 13, nama:"Kulit Krispy", harga: 11500},
    {id: 14, nama:"Tempe Goreng", harga: 3000},
    {id: 15, nama:"Tahu Goreng", harga: 3000},
    {id: 16, nama:"Kol Goreng", harga: 8500},
    {id: 17, nama:"Telur Dadar", harga: 8000},
    {id: 18, nama:"Jamur Krispy", harga: 13000},
    {id: 19, nama:"Nasi Doang", harga: 7000},
    {id: 20, nama:"Sambal Meleparrr (150 ml)", harga: 27000},
    {id: 21, nama:"Sambal Asam Manis (150 ml)", harga: 27000},
    {id: 22, nama:"Air Mineral", harga: 6000},
    {id: 23, nama:"Es Teh", harga: 5500},
    {id: 24, nama:"Es Kosong", harga: 1500},
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