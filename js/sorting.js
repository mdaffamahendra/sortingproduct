const baseUrl = (sortingName,sortBy, order) => `https://db-data.fufufafa.xyz/api/produk?sortingName=${sortingName}&sortby=${sortBy}&order=${order}`

const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json") ;

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};


// export const fetchSortedData = async (sortingName, sortBy, order) => {
//     try {
//       const response = await fetch(baseUrl(sortingName, sortBy, order), requestOptions);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data.data; // Mengembalikan data bagian dalam
//     } catch (error) {
//       console.error("Error fetching sorted data:", error);
//       throw error; // Memunculkan kembali error agar bisa ditangani oleh pemanggil fungsi
//     }
//   };

  fetch(baseUrl("bubble","price","ascending"), requestOptions)
  .then( async  (result) => {
    console.log(JSON.stringify(await result.json(),null,2));
    // Untuk masuk ke dalam data nya pakai result.json().data
  })
  .catch((error) => console.error(error));
  