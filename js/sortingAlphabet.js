// Fungsi untuk mengurutkan array menggunakan algoritma Quick Sort
export function quickSortAlphabet(arr) {
    if (arr.length <= 1) {
      return arr; // Basis rekursi: jika array memiliki 1 atau 0 elemen, sudah terurut
    }
  
    const pivot = arr[arr.length - 1]; // Mengambil elemen terakhir sebagai pivot
    const left = []; // Array untuk elemen yang lebih kecil dari pivot
    const right = []; // Array untuk elemen yang lebih besar dari pivot
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].product_name.localeCompare(pivot.product_name) < 0) {
        left.push(arr[i]); // Jika elemen lebih kecil dari pivot, masukkan ke kiri
      } else {
        right.push(arr[i]); // Jika elemen lebih besar dari pivot, masukkan ke kanan
      }
    }
  
    // Rekursi: mengurutkan array kiri dan kanan, lalu menggabungkannya
    return [...quickSortAlphabet(left), pivot, ...quickSortAlphabet(right)];
  }
  
  // Fungsi untuk mengurutkan array menggunakan algoritma Bubble Sort
  export function bubbleSortAlphabet(arr) {
    let len = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (arr[i].product_name.localeCompare(arr[i + 1].product_name) > 0) {
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
  export function selectionSortAlphabet(arr) {
    let len = arr.length;
  
    for (let i = 0; i < len; i++) {
      let minIndex = i; // Anggap elemen i sebagai elemen terkecil
  
      for (let j = i + 1; j < len; j++) {
        if (arr[j].product_name.localeCompare(arr[minIndex].product_name) < 0) {
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
  export function insertionSortAlphabet(arr) {
    let len = arr.length;
  
    for (let i = 1; i < len; i++) {
      let key = arr[i]; // Ambil elemen yang akan disisipkan
      let j = i - 1;
  
      // Geser elemen yang lebih besar dari key ke satu posisi di depan
      while (j >= 0 && arr[j].product_name.localeCompare(key.product_name) > 0) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key; // Sisipkan key di posisi yang tepat
    }
  
    return arr;
  }
  
  // // Contoh penggunaan
  // const data = ["banana", "apple", "grape", "orange", "mango", "cherry"];
  
  // // Mengukur waktu eksekusi Quick Sort secara manual
  // const startTimeQuick = performance.now();
  // const sortedDataQuick = quickSortAlphabet([...data]); // Menggunakan copy array agar hasil tidak bercampur
  // const endTimeQuick = performance.now();
  
  // const timeTakenQuick = endTimeQuick - startTimeQuick;
  // console.log("Setelah diurutkan (Quick Sort):", sortedDataQuick);
  // console.log("Waktu eksekusi Quick Sort: " + timeTakenQuick.toFixed(2) + " ms");
  
  // // Mengukur waktu eksekusi Bubble Sort
  // const startTimeBubble = performance.now();
  // const sortedDataBubble = bubbleSortAlphabet([...data]); // Menggunakan copy array agar hasil tidak bercampur
  // const endTimeBubble = performance.now();
  
  // const timeTakenBubble = endTimeBubble - startTimeBubble;
  // console.log("Setelah diurutkan (Bubble Sort):", sortedDataBubble);
  // console.log("Waktu eksekusi Bubble Sort: " + timeTakenBubble.toFixed(2) + " ms");
  
  // // Mengukur waktu eksekusi Selection Sort
  // const startTimeSelection = performance.now();
  // const sortedDataSelection = selectionSortAlphabet([...data]); // Menggunakan copy array agar hasil tidak bercampur
  // const endTimeSelection = performance.now();
  
  // const timeTakenSelection = endTimeSelection - startTimeSelection;
  // console.log("Setelah diurutkan (Selection Sort):", sortedDataSelection);
  // console.log("Waktu eksekusi Selection Sort: " + timeTakenSelection.toFixed(2) + " ms");
  
  // // Mengukur waktu eksekusi Insertion Sort
  // const startTimeInsertion = performance.now();
  // const sortedDataInsertion = insertionSortAlphabet([...data]); // Menggunakan copy array agar hasil tidak bercampur
  // const endTimeInsertion = performance.now();
  
  // const timeTakenInsertion = endTimeInsertion - startTimeInsertion;
  // console.log("Setelah diurutkan (Insertion Sort):", sortedDataInsertion);
  // console.log("Waktu eksekusi Insertion Sort: " + timeTakenInsertion.toFixed(2) + " ms");
  