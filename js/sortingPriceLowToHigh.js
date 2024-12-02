// Fungsi untuk mengurutkan array menggunakan algoritma Quick Sort
export function quickSortPriceLowToHigh(arr) {
    if (arr.length <= 1) {
        return arr; // Basis rekursi: jika array memiliki 1 atau 0 elemen, sudah terurut
    }

    const pivot = arr[arr.length - 1]; // Mengambil elemen terakhir sebagai pivot
    const left = []; // Array untuk elemen yang lebih kecil dari pivot
    const right = []; // Array untuk elemen yang lebih besar dari pivot

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].product_price < pivot.product_price) {
            left.push(arr[i]); // Jika elemen lebih kecil dari pivot, masukkan ke kiri
        } else {
            right.push(arr[i]); // Jika elemen lebih besar atau sama, masukkan ke kanan
        }
    }

    // Rekursi: mengurutkan array kiri dan kanan, lalu menggabungkannya
    return [...quickSortPriceLowToHigh(left), pivot, ...quickSortPriceLowToHigh(right)];
}

// Fungsi untuk mengurutkan array menggunakan algoritma Bubble Sort
export function bubbleSortPriceLowToHigh(arr) {
    let len = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i].product_price > arr[i + 1].product_price) {
                // Tukar elemen jika elemen pertama lebih besar dari yang berikutnya
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}

// Fungsi untuk mengurutkan array menggunakan algoritma Selection Sort
export function selectionSortPriceLowToHigh(arr) {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i; // Anggap elemen i sebagai elemen terkecil

        for (let j = i + 1; j < len; j++) {
            if (arr[j].product_price < arr[minIndex].product_price) {
                minIndex = j; // Temukan elemen terkecil
            }
        }

        if (minIndex !== i) {
            // Tukar elemen terkecil dengan elemen i
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return arr;
}

// Fungsi untuk mengurutkan array menggunakan algoritma Insertion Sort
export function insertionSortPriceLowToHigh(arr) {
    let len = arr.length;

    for (let i = 1; i < len; i++) {
        let key = arr[i]; // Ambil elemen yang akan disisipkan
        let j = i - 1;

        // Geser elemen yang lebih besar dari key ke satu posisi di depan
        while (j >= 0 && arr[j].product_price > key.product_price) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key; // Sisipkan key di posisi yang tepat
    }

    return arr;
}

// Contoh data produk
// const data = [
//     { name: "Produk A", price: 20000 },
//     { name: "Produk B", price: 15000 },
//     { name: "Produk C", price: 30000 },
//     { name: "Produk D", price: 25000 },
//     { name: "Produk E", price: 10000 }
// ];

// Mengukur waktu eksekusi Quick Sort
// const startTimeQuick = performance.now();
// const sortedDataQuick = quickSortPriceLowToHigh([...data]);
// const endTimeQuick = performance.now();
// console.log("Setelah diurutkan (Quick Sort - Terendah ke Tertinggi):", sortedDataQuick);
// console.log("Waktu eksekusi Quick Sort: " + (endTimeQuick - startTimeQuick).toFixed(2) + " ms");

// // Mengukur waktu eksekusi Bubble Sort
// const startTimeBubble = performance.now();
// const sortedDataBubble = bubbleSortPriceLowToHigh([...data]);
// const endTimeBubble = performance.now();
// console.log("Setelah diurutkan (Bubble Sort - Terendah ke Tertinggi):", sortedDataBubble);
// console.log("Waktu eksekusi Bubble Sort: " + (endTimeBubble - startTimeBubble).toFixed(2) + " ms");

// // Mengukur waktu eksekusi Selection Sort
// const startTimeSelection = performance.now();
// const sortedDataSelection = selectionSortPriceLowToHigh([...data]);
// const endTimeSelection = performance.now();
// console.log("Setelah diurutkan (Selection Sort - Terendah ke Tertinggi):", sortedDataSelection);
// console.log("Waktu eksekusi Selection Sort: " + (endTimeSelection - startTimeSelection).toFixed(2) + " ms");

// // Mengukur waktu eksekusi Insertion Sort
// const startTimeInsertion = performance.now();
// const sortedDataInsertion = insertionSortPriceLowToHigh([...data]);
// const endTimeInsertion = performance.now();
// console.log("Setelah diurutkan (Insertion Sort - Terendah ke Tertinggi):", sortedDataInsertion);
// console.log("Waktu eksekusi Insertion Sort: " + (endTimeInsertion - startTimeInsertion).toFixed(2) + " ms");
