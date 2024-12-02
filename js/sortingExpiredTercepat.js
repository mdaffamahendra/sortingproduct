// Fungsi untuk mengurutkan array menggunakan algoritma Quick Sort berdasarkan tanggal expired
function quickSortExpiry(arr) {
  if (arr.length <= 1) {
    return arr; // Basis rekursi: jika array memiliki 1 atau 0 elemen, sudah terurut
  }

  const pivot = arr[arr.length - 1].expiry; // Mengambil tanggal expired terakhir sebagai pivot
  const left = []; // Array untuk elemen yang lebih awal dari pivot
  const right = []; // Array untuk elemen yang lebih lambat dari pivot

  for (let i = 0; i < arr.length - 1; i++) {
    if (new Date(arr[i].expiry) < new Date(pivot)) {
      left.push(arr[i]); // Jika elemen lebih awal dari pivot, masukkan ke kiri
    } else {
      right.push(arr[i]); // Jika elemen lebih lambat atau sama, masukkan ke kanan
    }
  }

  // Rekursi: mengurutkan array kiri dan kanan, lalu menggabungkannya
  return [...quickSortExpiry(left), pivot, ...quickSortExpiry(right)];
}

// Contoh data produk dengan tanggal expired
const products = [
  { name: "Produk A", expiry: "2024-12-01" },
  { name: "Produk B", expiry: "2024-10-15" },
  { name: "Produk C", expiry: "2024-11-30" },
  { name: "Produk D", expiry: "2024-09-20" },
  { name: "Produk E", expiry: "2024-10-01" },
];

// Mengukur waktu eksekusi Quick Sort
const startTimeQuick = performance.now();
const sortedProducts = quickSortExpiry([...products]);
const endTimeQuick = performance.now();

console.log("Setelah diurutkan berdasarkan tanggal expired:", sortedProducts);
console.log(
  "Waktu eksekusi Quick Sort: " +
    (endTimeQuick - startTimeQuick).toFixed(2) +
    " ms"
);

// Menampilkan produk dengan tanggal expired tercepat
const earliestExpiry = sortedProducts[0];
console.log("Produk dengan tanggal expired tercepat:", earliestExpiry);
