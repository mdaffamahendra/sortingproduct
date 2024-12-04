// Quick Sort
  export function quickSortQuantityLowToHigh(arr) {
    if (arr.length <= 1) return arr;
  
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].product_quantity < pivot.product_quantity) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSortQuantityLowToHigh(left), pivot, ...quickSortQuantityLowToHigh(right)];
  }
  
  // Bubble Sort
  export function bubbleSortQuantityLowToHigh(arr) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].product_quantity > arr[i + 1].product_quantity) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    } while (swapped);
  
    return arr;
  }
  
  // Insertion Sort
  export function insertionSortQuantityLowToHigh(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].product_quantity > key.product_quantity) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  
    return arr;
  }
  
  // Selection Sort
  export function selectionSortQuantityLowToHigh(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].product_quantity < arr[minIndex].product_quantity) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
  
    return arr;
  }
  








