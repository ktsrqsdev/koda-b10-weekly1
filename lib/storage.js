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

function bacaHistory() {
    if (!fs.existsSync(folderData)) {
        fs.mkdirSync(fileMenu, { recursive: true });
        fs.writeFileSync(folderData, "[]");
    }
    const isi = fs.readFileSync(folderData, "utf-8");
    return JSON.parse(isi);
}

function simpanHistory(history) {
    fs.writeFileSync(folderData, JSON.stringify(history, null, 2));
}

module.exports = { bacaMenu, bacaHistory, simpanHistory };
