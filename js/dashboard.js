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


// Configuration and Constants
const CONFIG = {
  BASE_URL: "https://db-data.fufufafa.xyz",
  AUTH_TOKEN: "Bearer FadhlanGanteng"
};

class ProductManager {
  constructor() {
    this.products = [];
    this.initializeEventListeners();
  }

  // Fetch products from API or use fallback
  async fetchProducts() {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/api/products/`, {
        method: "GET"
      });
      const { data } = await response.json();
      this.products = data.map(({ _id, ...rest }) => rest);
      document.getElementById("totalProduct").textContent = this.products.length;
    } catch (error) {
      console.error("Error fetching products:", error);
      this.products = this.getFallbackProducts();
    }
    this.populateCategoryFilter();
    this.applyFiltersAndSort();
  }

  // Fallback products in case of API failure
  getFallbackProducts() {
    return [
      {
        product_id: 1,
        product_name: "Laptop XYZss",
        product_category: "Electronics",
        product_quantity: 333,
        product_price: 12000003330,
        product_exp: "2025-12-31T00:00:00.000Z"
      }
    ];
  }

  // Initialize all event listeners
  initializeEventListeners() {
    document
      .getElementById("productForm")
      .addEventListener("submit", this.handleProductSubmit.bind(this));
    document
      .getElementById("searchInput")
      .addEventListener("input", this.searchProducts.bind(this));
    document
      .getElementById("sortSelect")
      .addEventListener("change", () => this.applyFiltersAndSort());
    document
      .getElementById("categoryFilter")
      .addEventListener("change", () => this.applyFiltersAndSort());
  }

  // Format date to DD/MM/YYYY
  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  }

  // Display products in the table
  displayProducts(productsToDisplay) {
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
            <td>${this.formatDate(product.product_exp)}</td>
            <td>
                <button class="btn btn-sm btn-warning mb-2 edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger mb-2 delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        row.querySelector('.edit-btn').addEventListener('click', () => this.editProduct(product.product_id));
        row.querySelector('.delete-btn').addEventListener('click', () => this.deleteProduct(product.product_id));    

      // Append row ke table body
      tableBody.appendChild(row);

    })
  }

  // Search products by name or category
  searchProducts() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filteredProducts = this.products.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchTerm) ||
        product.product_category.toLowerCase().includes(searchTerm)
    );
    this.applyFiltersAndSort(filteredProducts);
  }

  // Sort products
  sortProducts(productsToSort) {
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
// Filter products by category
filterByCategory(productsToFilter) {
  const category = document.getElementById("categoryFilter").value;
  return category
    ? productsToFilter.filter(
        (product) => product.product_category === category
      )
    : productsToFilter; 
}


  // Apply filters and sort to products
  applyFiltersAndSort(productsToProcess = this.products) {
    const filteredAndSortedProducts = this.sortProducts(
      this.filterByCategory(productsToProcess)
    );
    this.displayProducts(filteredAndSortedProducts);
  }

  // Populate category filter
// Populate category filter
populateCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [
    ...new Set(this.products.map((product) => product.product_category))
  ];

  categoryFilter.innerHTML = `
    <option value="">Semua Kategori</option>
    ${categories
      .map((category) => `<option value="${category}">${category}</option>`)
      .join("")}
  `;
}

  // Handle product form submission
  async handleProductSubmit(e) {
    e.preventDefault();
    const product = this.getProductFromForm();
    await this.addProduct(product);
  }

  // Get product data from form
  getProductFromForm() {
    return {
      product_id: parseInt(document.getElementById("productId").value),
      product_name: document.getElementById("productName").value,
      product_category: document.getElementById("productCategory").value,
      product_quantity: parseInt(
        document.getElementById("productQuantity").value
      ),
      product_price: parseFloat(document.getElementById("productPrice").value),
      product_exp: document.getElementById("productExp").value
    };
  }

  // Add new product
  async addProduct(product) {
    try {
      await fetch(`${CONFIG.BASE_URL}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: CONFIG.AUTH_TOKEN
        },
        body: JSON.stringify(product)
      });
      Swal.fire("Success!", "Product added successfully!", "success");
      this.products.push(product);
      document.getElementById("totalProduct").textContent = this.products.length;
      this.applyFiltersAndSort();
      document.getElementById("productForm").reset();
      this.populateCategoryFilter();
    } catch (error) {
      Swal.fire("Error!", "Failed to add product", "error");
      console.error("API Request Failed:", error);
    }
  }

  // Edit product
  editProduct(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const product = this.products.find((p) => p.product_id === id);

    row.classList.add("edit-mode");
    row.innerHTML = `
            <td>${product.product_id}</td>
            <td><input type="text" value="${
              product.product_name
            }" name="product_name"></td>
            <td><input type="text" value="${
              product.product_category
            }" name="product_category"></td>
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
                <button class="btn btn-sm btn-secondary canceledit-btn mb-2">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;

        row.querySelector('.save-btn').addEventListener('click', () => this.saveProduct(id));
        row.querySelector('.canceledit-btn').addEventListener('click', () => this.cancelEdit(id));    
  }

  // Save edited product
  async saveProduct(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const updatedProduct = {
      product_id: id,
      product_name: row.querySelector('input[name="product_name"]').value,
      product_category: row.querySelector('input[name="product_category"]')
        .value,
      product_quantity: parseInt(
        row.querySelector('input[name="product_quantity"]').value
      ),
      product_price: parseFloat(
        row.querySelector('input[name="product_price"]').value
      ),
      product_exp: row.querySelector('input[name="product_exp"]').value
    };

    try {
      await fetch(`${CONFIG.BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: CONFIG.AUTH_TOKEN
        },
        body: JSON.stringify(updatedProduct)
      });

      Swal.fire("Success!", "Product updated successfully!", "success");

      const index = this.products.findIndex((p) => p.product_id === id);
      this.products[index] = updatedProduct;
      row.classList.remove("edit-mode");
      this.applyFiltersAndSort();
    } catch (error) {
      Swal.fire("Error!", "Failed to update product", "error");
    }
  }

  // Cancel edit
  cancelEdit() {
    this.applyFiltersAndSort();
  }

  // Delete product
  async deleteProduct(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${CONFIG.BASE_URL}/api/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: CONFIG.AUTH_TOKEN
          }
        });

        this.products = this.products.filter(
          (product) => product.product_id !== id
        );
        document.getElementById("totalProduct").textContent = this.products.length;
        this.applyFiltersAndSort();
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete product", "error");
      }
    }
  }
}


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
// Initialize the product manager
const productManager = new ProductManager();
productManager.fetchProducts();


  