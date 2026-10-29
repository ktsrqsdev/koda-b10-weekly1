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

module.exports = { garis, rupiah, judul };