const fs = require("fs");
const path = require("path");
const folderData = path.join(__dirname, "..", "data");
const fileMenu = path.join(folderData, "menu.json");
const fileHistory = path.join(folderData, "history.json");

function bacaMenu() {
  if (!fs.existsSync(fileMenu)) {
    throw new Error("menu.json tidak ditemukan");
  }
  const isi = fs.readFileSync(fileMenu, "utf-8");
  return JSON.parse(isi);
}

function bacaHistory() {
  if (!fs.existsSync(fileHistory)) {
    fs.mkdirSync(folderData, { recursive: true });
    fs.writeFileSync(fileHistory, "[]");
  }
  const isi = fs.readFileSync(fileHistory, "utf-8");
  return JSON.parse(isi);
}

function simpanHistory(history) {
  fs.writeFileSync(fileHistory, JSON.stringify(history, null, 2));
}

module.exports = { bacaMenu, bacaHistory, simpanHistory };
