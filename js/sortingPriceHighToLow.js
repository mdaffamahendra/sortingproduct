// Fungsi untuk mengurutkan array menggunakan algoritma Quick Sort
export function quickSortPriceHighToLow(arr) {
    if (arr.length <= 1) {
        return arr; // Basis rekursi: jika array memiliki 1 atau 0 elemen, sudah terurut
    }

    const pivot = arr[arr.length - 1]; // Mengambil elemen terakhir sebagai pivot
    const left = []; // Array untuk elemen yang lebih kecil dari pivot
    const right = []; // Array untuk elemen yang lebih besar dari pivot

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].product_price > pivot.product_price) {
            left.push(arr[i]); // Jika elemen lebih besar dari pivot, masukkan ke kiri
        } else {
            right.push(arr[i]); // Jika elemen lebih kecil atau sama, masukkan ke kanan
        }
    }

    // Rekursi: mengurutkan array kiri dan kanan, lalu menggabungkannya
    return [...quickSortPriceHighToLow(left), pivot, ...quickSortPriceHighToLow(right)];
}

// Fungsi untuk mengurutkan array menggunakan algoritma Bubble Sort
export function bubbleSortPriceHighToLow(arr) {
    let len = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i].product_price < arr[i + 1].product_price) {
                // Tukar elemen jika elemen pertama lebih kecil dari yang berikutnya
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
export function selectionSortPriceHighToLow(arr) {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        let maxIndex = i; // Anggap elemen i sebagai elemen terbesar

        for (let j = i + 1; j < len; j++) {
            if (arr[j].product_price > arr[maxIndex].product_price) {
                maxIndex = j; // Temukan elemen terbesar
            }
        }

        if (maxIndex !== i) {
            // Tukar elemen terbesar dengan elemen i
            let temp = arr[i];
            arr[i] = arr[maxIndex];
            arr[maxIndex] = temp;
        }
    }

    return arr;
}

// Fungsi untuk mengurutkan array menggunakan algoritma Insertion Sort
export function insertionSortPriceHighToLow(arr) {
    let len = arr.length;

    for (let i = 1; i < len; i++) {
        let key = arr[i]; // Ambil elemen yang akan disisipkan
        let j = i - 1;

        // Geser elemen yang lebih kecil dari key ke satu posisi di depan
        while (j >= 0 && arr[j].product_price < key.product_price) {
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

// // Mengukur waktu eksekusi Quick Sort
// const startTimeQuick = performance.now();
// const sortedDataQuick = quickSortPriceHighToLow([...data]);
// const endTimeQuick = performance.now();
// console.log("Setelah diurutkan (Quick Sort - Tertinggi ke Terendah):", sortedDataQuick);
// console.log("Waktu eksekusi Quick Sort: " + (endTimeQuick - startTimeQuick).toFixed(2) + " ms");

// // Mengukur waktu eksekusi Bubble Sort
// const startTimeBubble = performance.now();
// const sortedDataBubble = bubbleSortPriceHighToLow([...data]);
// const endTimeBubble = performance.now();
// console.log("Setelah diurutkan (Bubble Sort - Tertinggi ke Terendah):", sortedDataBubble);
// console.log("Waktu eksekusi Bubble Sort: " + (endTimeBubble - startTimeBubble).toFixed(2) + " ms");

// // Mengukur waktu eksekusi Selection Sort
// const startTimeSelection = performance.now();
// const sortedDataSelection = selectionSortPriceHighToLow([...data]);
// const endTimeSelection = performance.now();
// console.log("Setelah diurutkan (Selection Sort - Tertinggi ke Terendah):", sortedDataSelection);
// console.log("Waktu eksekusi Selection Sort: " + (endTimeSelection - startTimeSelection).toFixed(2) + " ms");

// // Mengukur waktu eksekusi Insertion Sort
// const startTimeInsertion = performance.now();
// const sortedDataInsertion = insertionSortPriceHighToLow([...data]);
// const endTimeInsertion = performance.now();
// console.log("Setelah diurutkan (Insertion Sort - Tertinggi ke Terendah):", sortedDataInsertion);
// console.log("Waktu eksekusi Insertion Sort: " + (endTimeInsertion - startTimeInsertion).toFixed(2) + " ms");
