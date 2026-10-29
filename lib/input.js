const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

function tutupInput(){
    rl.close();
}

module.exports = { tanya, tanyaYaTidak, tutupInput };
