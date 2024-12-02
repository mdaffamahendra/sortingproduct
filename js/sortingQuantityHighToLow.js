// Quick Sort
  export function quickSortQuantityHighToLow(arr) {
    if (arr.length <= 1) return arr;
  
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].product_quantity > pivot.product_quantity) { // Ubah tanda untuk descending order
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  
  // Bubble Sort
  export function bubbleSortQuantityHighToLow(arr) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].product_quantity < arr[i + 1].product_quantity) { // Ubah tanda untuk descending order
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    } while (swapped);
  
    return arr;
  }
  
  // Insertion Sort
  export function insertionSortQuantityHighToLow(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].product_quantity < key.product_quantity) { // Ubah tanda untuk descending order
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  
    return arr;
  }
  
  // Selection Sort
  export function selectionSortQuantityHighToLow(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let maxIndex = i; // Cari nilai terbesar
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].product_quantity > arr[maxIndex].product_quantity) { // Ubah tanda untuk descending order
          maxIndex = j;
        }
      }
      if (maxIndex !== i) {
        [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
      }
    }
  
    return arr;
  }
  
  