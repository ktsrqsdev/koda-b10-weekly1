const state = {
  menu: [],
  keranjang: [],
  history:[],
};

function totalKeranjang() {
  return state.keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);
}

module.exports = {state, totalKeranjang};
