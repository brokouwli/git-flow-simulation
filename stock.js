// stock.js
// Program sederhana simulasi sistem stock barang.
// Dijalankan langsung via Node.js: node stock.js

// Data barang disimpan di array (in-memory, reset tiap program dijalankan ulang)
let stockBarang = [
  { id: 1, nama: "Keyboard", jumlah: 20, harga: 150000 },
  { id: 2, nama: "Mouse", jumlah: 35, harga: 75000 },
  { id: 3, nama: "Monitor", jumlah: 8, harga: 1200000 },
];

// Fungsi menampilkan semua stock barang
function tampilkanStock() {
  console.log("\n=== DAFTAR STOCK BARANG ===");
  stockBarang.forEach((barang) => {
    console.log(
      `ID: ${barang.id} | ${barang.nama} | Jumlah: ${barang.jumlah} | Harga: Rp${barang.harga.toLocaleString("id-ID")}`
    );
  });
  console.log("============================\n");
}

// Fungsi menambah stock barang yang sudah ada
function tambahStock(id, jumlahTambahan) {
  const barang = stockBarang.find((b) => b.id === id);
  if (!barang) {
    console.log(`Barang dengan ID ${id} tidak ditemukan.`);
    return;
  }
  barang.jumlah += jumlahTambahan;
  console.log(`Stock ${barang.nama} bertambah ${jumlahTambahan}, sekarang jadi ${barang.jumlah}.`);
}

// Fungsi mengurangi stock barang (misalnya ada penjualan)
function kurangiStock(id, jumlahKurang) {
  const barang = stockBarang.find((b) => b.id === id);
  if (!barang) {
    console.log(`Barang dengan ID ${id} tidak ditemukan.`);
    return;
  }
  if (barang.jumlah < jumlahKurang) {
    console.log(`Stock ${barang.nama} tidak cukup. Sisa stock: ${barang.jumlah}.`);
    return;
  }
  barang.jumlah -= jumlahKurang;
  console.log(`Stock ${barang.nama} berkurang ${jumlahKurang}, sekarang jadi ${barang.jumlah}.`);
}

// Fungsi menambah barang baru ke daftar stock
function tambahBarangBaru(nama, jumlah, harga) {
  const idBaru = stockBarang.length > 0 ? stockBarang[stockBarang.length - 1].id + 1 : 1;
  const barangBaru = { id: idBaru, nama, jumlah, harga };
  stockBarang.push(barangBaru);
  console.log(`Barang baru "${nama}" ditambahkan dengan ID ${idBaru}.`);
}

// Fungsi menghitung total nilai seluruh stock (jumlah x harga)
function totalNilaiStock() {
  const total = stockBarang.reduce((sum, barang) => sum + barang.jumlah * barang.harga, 0);
  console.log(`Total nilai seluruh stock: Rp${total.toLocaleString("id-ID")}`);
  return total;
}

// ==== Simulasi penggunaan program ====
tampilkanStock();
tambahStock(1, 10);        // tambah stock Keyboard sebanyak 10
kurangiStock(2,
