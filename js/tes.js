import { fetchData } from './sorting.js';


document
      .getElementById("sortSelect")
      .addEventListener("change", () => this.applyFiltersAndSort());
    document
      .getElementById("categoryFilter")
      .addEventListener("change", () => this.applyFiltersAndSort());




const sortProductsAscending = async () => {
  try {
    const sortBy = document.getElementById('sortSelect').value;
    const sortName = document.getElementById('selectSort').value;

    const order = 'ascending'; 
    const data = await fetchData(sortName, sortBy, order);
    document.getElementById('timeSort').textContent = data.data.processingTime;
    console.log(data.data);
    
    return data.data.productSorted;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const sortProductsDescending = async () => {
  try {
    const sortBy = document.getElementById('sortSelect').value;
    const sortName = document.getElementById('selectSort').value;

    const order = 'descending'; 
    const data = await fetchData(sortName, sortBy, order);
    document.getElementById('timeSort').textContent = data.data.processingTime;
    console.log(data.data);
    return data.data.productSorted;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

document.getElementById('sortSelect').addEventListener('change', () => {
  const sortOrder = sortSelect.selectedOptions[0].getAttribute('data-sort');

  (sortOrder === "ascending") ? sortProductsAscending() : sortProductsDescending();
});



