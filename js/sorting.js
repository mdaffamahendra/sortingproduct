const baseUrl = (sortingName,sortBy, order) => `https://db-data.fufufafa.xyz/api/produk?sortingName=${sortingName}&sortby=${sortBy}&order=${order}`

const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json") ;

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};


export async function fetchData(endpoint, field, order) {
    try {
        const result = await fetch(baseUrl(endpoint, field, order), requestOptions);
        const data = await result.json();
        return await data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
  }

  
  
  