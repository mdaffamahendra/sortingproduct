import {
  bubbleSortAlphabet,
  insertionSortAlphabet,
  quickSortAlphabet,
  selectionSortAlphabet,
} from "./sortingAlphabet.js";

import {
  quickSortPriceHighToLow,
  bubbleSortPriceHighToLow,
  insertionSortPriceHighToLow,
  selectionSortPriceHighToLow,
} from "./sortingPriceHighToLow.js";

import {
  quickSortPriceLowToHigh,
  bubbleSortPriceLowToHigh,
  insertionSortPriceLowToHigh,
  selectionSortPriceLowToHigh,
} from "./sortingPriceLowToHigh.js";

import {
  quickSortQuantityLowToHigh,
  bubbleSortQuantityLowToHigh,
  insertionSortQuantityLowToHigh,
  selectionSortQuantityLowToHigh,
} from "./sortingQuantityLowToHigh.js";

import {
  quickSortQuantityHighToLow,
  bubbleSortQuantityHighToLow,
  insertionSortQuantityHighToLow,
  selectionSortQuantityHighToLow,
} from "./sortingQuantityHighToLow.js";

document.addEventListener("DOMContentLoaded", () => {
  // Base URL for the API
  const BASE_URL = "https://call-api.lanzzstore.com";
  let products = [];

  const getProduk = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer FadhlanGanteng",
        },
      });
      let data = await response.json();
      data =
        data.status === 200
          ? { error: false, message: data?.message, data: data.data }
          : { error: true, message: data?.message, data: null };
      return data;
    } catch (e) {
      return { error: true, message: e?.message, errorInfo: e };
    }
  };

  (async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer FadhlanGanteng",
        },
      });

      const { data } = await response.json();

      // Remove _id property and use product_id
      products = data.map(({ _id, ...rest }) => rest);
      document.getElementById("totalProduct").textContent = products.length;
    } catch (e) {
      products = [
        {
          product_id: 1,
          product_name: "Laptop XYZss",
          product_category: "Electronics",
          product_quantity: 333,
          product_price: 12000003330,
          product_exp: "2025-12-31T00:00:00.000Z",
        },
      ];
      console.error(e);
    }

    // Display products after data is fetched or fallback to dummy data
    populateCategoryFilter();
    applyFiltersAndSort();
  })();

  // Format date to DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  }

  function displayProducts(productsToDisplay) {
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = ""; // Kosongkan tabel sebelum menampilkan produk

    productsToDisplay.forEach((product) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", product.product_id);

      row.innerHTML = `
            <td>${product.product_id}</td>
            <td>${product.product_name}</td>
            <td>${product.product_category}</td>
            <td>${product.product_quantity}</td>
            <td>${new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.product_price)}</td>
            <td>${formatDate(product.product_exp)}</td>
            <td>
                <button class="btn btn-sm btn-warning mb-2 edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger mb-2 delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

      // Append row ke table body
      tableBody.appendChild(row);

      // Tambahkan event listener untuk tombol edit
      const editButton = row.querySelector(".edit-btn");
      editButton.addEventListener("click", function () {
        editProducts(product.product_id);
      });

      // Tambahkan event listener untuk tombol delete
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", function () {
        deleteProduct(product.product_id);
      });
    });
  }

  // Search products by name or category
  function searchProducts() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchTerm) ||
        product.product_category.toLowerCase().includes(searchTerm)
    );
    applyFiltersAndSort(filteredProducts);
  }

  // Sort products
  function sortProducts(productsToSort) {
    const selectSort = document.getElementById("selectSort").value;
    const sortBy = document.getElementById("sortSelect").value;
    switch (selectSort) {
      case "Quick Sort":
        switch (sortBy) {
          case "alphabet":
            const startTimeQuickAlphabet = performance.now();
            const sortedDataQuickAlphabet = quickSortAlphabet([
              ...productsToSort,
            ]); 
            const endTimeQuickAlphabet = performance.now();

            document.getElementById("timeSort").textContent =
              (endTimeQuickAlphabet - startTimeQuickAlphabet).toFixed(2) + "ms";
            return quickSortAlphabet(productsToSort);
          case "quantity_asc":
            const startTimeQuickQLTH = performance.now();
            const sortedDataQuickQLTH = quickSortQuantityLowToHigh([
              ...productsToSort,
            ]);
            const endTimeQuickQLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeQuickQLTH - startTimeQuickQLTH).toFixed(2) + "ms";
            return quickSortQuantityLowToHigh(productsToSort);
          case "quantity_desc":
            const startTimeQuickQHTL = performance.now();
            const sortedDataQuickQHTL = quickSortQuantityHighToLow([
              ...productsToSort,
            ]);
            const endTimeQuickQHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeQuickQHTL - startTimeQuickQHTL).toFixed(2) + "ms";
            return quickSortQuantityHighToLow(productsToSort);
          case "price_asc":
            const startTimeQuickPLTH = performance.now();
            const sortedDataQuickPLTH = quickSortPriceLowToHigh([
              ...productsToSort,
            ]);
            const endTimeQuickPLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeQuickPLTH - startTimeQuickPLTH).toFixed(2) + "ms";
            return quickSortPriceLowToHigh(productsToSort);
          case "price_desc":
            const startTimeQuickPHTL = performance.now();
            const sortedDataQuickPHTL = quickSortPriceHighToLow([
              ...productsToSort,
            ]);
            const endTimeQuickPHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeQuickPHTL - startTimeQuickPHTL).toFixed(2) + "ms";
            return quickSortPriceHighToLow(productsToSort);
          default:
            return productsToSort;
        }
      case "Insertion Sort":
        switch (sortBy) {
          case "alphabet":
            const startTimeinsertionAlphabet = performance.now();
            const sortedDatainsertionAlphabet = insertionSortAlphabet([
              ...productsToSort,
            ]); // Menggunakan copy array agar hasil tidak bercampur
            const endTimeinsertionAlphabet = performance.now();

            document.getElementById("timeSort").textContent =
              (endTimeinsertionAlphabet - startTimeinsertionAlphabet).toFixed(
                2
              ) + "ms";
            return insertionSortAlphabet(productsToSort);
          case "quantity_asc":
            const startTimeinsertionQLTH = performance.now();
            const sortedDatainsertionQLTH = insertionSortQuantityLowToHigh([
              ...productsToSort,
            ]);
            const endTimeinsertionQLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeinsertionQLTH - startTimeinsertionQLTH).toFixed(2) + "ms";
            return insertionSortQuantityLowToHigh(productsToSort);
          case "quantity_desc":
            const startTimeinsertionQHTL = performance.now();
            const sortedDatainsertionQHTL = insertionSortQuantityHighToLow([
              ...productsToSort,
            ]);
            const endTimeinsertionQHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeinsertionQHTL - startTimeinsertionQHTL).toFixed(2) + "ms";
            return insertionSortQuantityHighToLow(productsToSort);
          case "price_asc":
            const startTimeinsertionPLTH = performance.now();
            const sortedDatainsertionPLTH = insertionSortPriceLowToHigh([
              ...productsToSort,
            ]);
            const endTimeinsertionPLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeinsertionPLTH - startTimeinsertionPLTH).toFixed(2) + "ms";
            return insertionSortPriceLowToHigh(productsToSort);
          case "price_desc":
            const startTimeInsertionPHTL = performance.now();
            const sortedDataInsertionPHTL = insertionSortPriceHighToLow([
              ...productsToSort,
            ]);
            const endTimeInsertionPHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeInsertionPHTL - startTimeInsertionPHTL).toFixed(2) + "ms";
            return insertionSortPriceHighToLow(productsToSort);
          default:
            return productsToSort;
        }
      case "Selection Sort":
        switch (sortBy) {
          case "alphabet":
            const startTimeselectionAlphabet = performance.now();
            const sortedDataselectionAlphabet = selectionSortAlphabet([
              ...productsToSort,
            ]); // Menggunakan copy array agar hasil tidak bercampur
            const endTimeselectionAlphabet = performance.now();

            document.getElementById("timeSort").textContent =
              (endTimeselectionAlphabet - startTimeselectionAlphabet).toFixed(
                2
              ) + "ms";
            return selectionSortAlphabet(productsToSort);
          case "quantity_asc":
            const startTimeselectionQLTH = performance.now();
            const sortedDataselectionQLTH = selectionSortQuantityLowToHigh([
              ...productsToSort,
            ]);
            const endTimeselectionQLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeselectionQLTH - startTimeselectionQLTH).toFixed(2) + "ms";
            return selectionSortQuantityLowToHigh(productsToSort);
          case "quantity_desc":
            const startTimeselectionQHTL = performance.now();
            const sortedDataselectionQHTL = selectionSortQuantityHighToLow([
              ...productsToSort,
            ]);
            const endTimeselectionQHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeselectionQHTL - startTimeselectionQHTL).toFixed(2) + "ms";
            return selectionSortQuantityHighToLow(productsToSort);
          case "price_asc":
            const startTimeselectionPLTH = performance.now();
            const sortedDataselectionPLTH = selectionSortPriceLowToHigh([
              ...productsToSort,
            ]);
            const endTimeselectionPLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeselectionPLTH - startTimeselectionPLTH).toFixed(2) + "ms";
            return selectionSortPriceLowToHigh(productsToSort);
          case "price_desc":
            const startTimeselectionPHTL = performance.now();
            const sortedDataselectionPHTL = selectionSortPriceHighToLow([
              ...productsToSort,
            ]);
            const endTimeselectionPHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeselectionPHTL - startTimeselectionPHTL).toFixed(2) + "ms";
            return selectionSortPriceHighToLow(productsToSort);
          default:
            return productsToSort;
        }
      default:
        switch (sortBy) {
          case "alphabet":
            const startTimeBubbleAlphabet = performance.now();
            const sortedDataBubbleAlphabet = bubbleSortAlphabet([
              ...productsToSort,
            ]); // Menggunakan copy array agar hasil tidak bercampur
            const endTimeBubbleAlphabet = performance.now();

            document.getElementById("timeSort").textContent =
              (endTimeBubbleAlphabet - startTimeBubbleAlphabet).toFixed(2) +
              "ms";
            return bubbleSortAlphabet(productsToSort);
          case "quantity_asc":
            const startTimebubbleQLTH = performance.now();
            const sortedDatabubbleQLTH = bubbleSortQuantityLowToHigh([
              ...productsToSort,
            ]);
            const endTimebubbleQLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimebubbleQLTH - startTimebubbleQLTH).toFixed(2) + "ms";
            return bubbleSortQuantityLowToHigh(productsToSort);
          case "quantity_desc":
            const startTimebubbleQHTL = performance.now();
            const sortedDatabubbleQHTL = bubbleSortQuantityHighToLow([
              ...productsToSort,
            ]);
            const endTimebubbleQHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimebubbleQHTL - startTimebubbleQHTL).toFixed(2) + "ms";
            return bubbleSortQuantityHighToLow(productsToSort);
          case "price_asc":
            const startTimebubblePLTH = performance.now();
            const sortedDatabubblePLTH = bubbleSortPriceLowToHigh([
              ...productsToSort,
            ]);
            const endTimebubblePLTH = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimebubblePLTH - startTimebubblePLTH).toFixed(2) + "ms";
            return bubbleSortPriceLowToHigh(productsToSort);
          case "price_desc":
            const startTimeBubblePHTL = performance.now();
            const sortedDataQuickPHTL = bubbleSortPriceHighToLow([
              ...productsToSort,
            ]);
            const endTimeBubblePHTL = performance.now();
            document.getElementById("timeSort").textContent =
              (endTimeBubblePHTL - startTimeBubblePHTL).toFixed(2) + "ms";
            return bubbleSortPriceHighToLow(productsToSort);
          default:
            return productsToSort;
        }
    }
  }

  // Filter products by category
  function filterByCategory(productsToFilter) {
    const category = document.getElementById("categoryFilter").value;
    if (category) {
      return productsToFilter.filter(
        (product) => product.product_category === category
      );
    }
    return productsToFilter;
  }

  // Apply filters and sort to products
  function applyFiltersAndSort(productsToProcess = products) {
    let filteredAndSortedProducts = filterByCategory(productsToProcess);
    filteredAndSortedProducts = sortProducts(filteredAndSortedProducts);
    displayProducts(filteredAndSortedProducts);
  }

  // Populate category filter
  function populateCategoryFilter() {
    const categoryFilter = document.getElementById("categoryFilter");

    const categories = [
      ...new Set(products.map((product) => product.product_category)),
    ];

    // Jika Anda ingin juga menambahkan kategori ke categoryFilter, buat elemen option baru
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category; // Nilai yang akan dikirim saat filter diubah
      option.textContent = category; // Teks yang akan ditampilkan di filter
      categoryFilter.appendChild(option); // Tambahkan ke elemen filter
    });
  }

  // Add new product
  async function addProduct(product) {
    const idManual = document.getElementById("productid").value;
    let newDataFetch = await getProduk();
    newDataFetch = newDataFetch.error
      ? products.length + 1
      : generateUniqueId(newDataFetch.data);
    if (idManual == "")
      alert(
        `Disarankan Untuk Menginput Manual ID nya tuk menghindari kesalahan yang terjadi.`
      );
    product.product_id = idManual !== "" ? idManual : newDataFetch; // products.length + 1 Assign new product_id
    await fetch(`${BASE_URL}/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer FadhlanGanteng",
      },
      body: JSON.stringify(product),
    })
      .then((res) => alert(`Sukses menambahkan data!`))
      .catch((e) => alert(`Gagal menambahkan data!`));
    products.push(product);
    document.getElementById("totalProduct").textContent = products.length;
    applyFiltersAndSort();
    document.getElementById("productForm").reset();
    populateCategoryFilter();
  }

  function generateUniqueId(existingIds) {
    let newId;
    let isUnique = false;
    // Konversi array ke Set untuk pencarian lebih cepat
    const existingIdsSet = new Set(existingIds);
    while (!isUnique) {
      newId = Math.floor(Math.random() * 10000) + 1;
      if (!existingIdsSet.has(newId)) {
        isUnique = true;
      }
    }
    return newId;
  }

  function editProducts(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const product = products.find((p) => p.product_id === id);

    row.classList.add("edit-mode");
    row.innerHTML = `
          <td>${product.product_id}</td>
          <td><input type="text" value="${
            product.product_name
          }" name="product_name"></td>
          <td><select class="form-select" id="categoryEdit">
          <option selected>${product.product_category}</option>
          <option>Bahan Pokok</option>
          <option>Makanan Instan</option>
          <option>Minuman</option>
          <option>Bumbu Dapur</option>
          <option>Kebutuhan Rumah Tangga</option>
          <option>Makanan Ringan</option>
          <option>Kebutuhan Bayi</option>
        </select></td>
          <td><input type="number" value="${
            product.product_quantity
          }" name="product_quantity"></td>
          <td><input type="number" value="${
            product.product_price
          }" name="product_price"></td>
          <td><input type="date" value="${
            product.product_exp.split("T")[0]
          }" name="product_exp"></td>
          <td>
              <button class="btn btn-sm btn-success mb-2 save-btn">
                  <i class="fas fa-save"></i>
              </button>
              <button class="btn btn-sm btn-secondary mb-2 cancel-btn">
                  <i class="fas fa-times"></i>
              </button>
          </td>
      `;

    // Tambahkan event listener untuk tombol Save
    const saveButton = row.querySelector(".save-btn");
    saveButton.addEventListener("click", function () {
      saveProduct(id);
    });

    // Tambahkan event listener untuk tombol Cancel
    const cancelButton = row.querySelector(".cancel-btn");
    cancelButton.addEventListener("click", function () {
      cancelEdit(id);
    });
  }

  // Save edited product
  async function saveProduct(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const updatedProduct = {
      product_id: id,
      product_name: row.querySelector('input[name="product_name"]').value,
      product_category: row.querySelector('#categoryEdit')
        .value,
      product_quantity: parseInt(
        row.querySelector('input[name="product_quantity"]').value
      ),
      product_price: parseFloat(
        row.querySelector('input[name="product_price"]').value
      ),
      product_exp: row.querySelector('input[name="product_exp"]').value,
    };
    fetch(`${BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer FadhlanGanteng",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => alert(`Sukses mengedit data!`))
      .catch((e) => alert(`Gagal mengedit data`));
    const index = products.findIndex((p) => p.product_id === id);
    products[index] = updatedProduct;
    row.classList.remove("edit-mode");
    applyFiltersAndSort();
  }

  // Cancel edit
  function cancelEdit(id) {
    applyFiltersAndSort();
  }

  // Delete product
  async function deleteProduct(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        products = products.filter((product) => product.product_id !== id);
        document.getElementById("totalProduct").textContent = products.length;
        fetch(`${BASE_URL}/api/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer FadhlanGanteng",
          },
        });
        applyFiltersAndSort();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  }

  // Event listener for product form
  document
    .getElementById("productForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const product = {
        product_name: document.getElementById("productName").value,
        product_category: document.getElementById("productCategory").value,
        product_quantity: parseInt(
          document.getElementById("productQuantity").value
        ),
        product_price: parseFloat(
          document.getElementById("productPrice").value
        ),
        product_exp: document.getElementById("productExp").value,
      };
      await addProduct(product);
    });

  // Event listeners for search, sort, and filter
  document
    .getElementById("searchInput")
    .addEventListener("input", searchProducts);
  document
    .getElementById("sortSelect")
    .addEventListener("change", () => applyFiltersAndSort());
  document
    .getElementById("categoryFilter")
    .addEventListener("change", () => applyFiltersAndSort());

  document.getElementById("btnAddProduct").addEventListener("click", () => {
    document.getElementById("contentContainer").style.display = "none";
    document.getElementById("selectSort").style.display = "none";
    document.getElementById("formContainer").classList.remove("d-none");
    document.getElementById("btnAddProduct").style.display = "none";
  });

  document.getElementById("btnCancelAddForm").addEventListener("click", () => {
    document.getElementById("contentContainer").style.display = "block";
    document.getElementById("selectSort").style.display = "block";
    document.getElementById("formContainer").classList.add("d-none");
    document.getElementById("btnAddProduct").style.display = "block";
  });

  document.getElementById("selectSort").addEventListener("change", () => {
    document.getElementById("nameSortSelected").textContent = 'Kecepatan Sorting (' + 
      document.getElementById("selectSort").value + ')';
  });

  // Initialize product display
  populateCategoryFilter();
  applyFiltersAndSort();
});
