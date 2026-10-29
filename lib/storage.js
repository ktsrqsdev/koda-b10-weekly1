const fs = require("fs");
const path = require("path");
const folderData = path.join(__dirname, "..", "data");
const fileMenu = path.join(folderData, "menu.json");
function bacaMenu() {
    if (!fs.existsSync(fileMenu)) {
        throw new Error("menu.json tidak ditemukan");
    }
    const isi = fs.readFileSync(fileMenu, "utf-8");
    return JSON.parse(isi);
}

module.exports = { bacaMenu };
