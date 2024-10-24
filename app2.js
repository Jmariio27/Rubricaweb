// Función para obtener los datos de la API
async function fetchDataFromAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);

        const data = await response.json();
        return data; // Devolver los datos obtenidos
    } catch (error) {
        console.error('Error al cargar los datos de la API:', error);
        return null;
    }
}

// Función para mostrar los productos en la página
function displayProducts(products) {
    const cardContainer = document.getElementById('cardContainer'); // Contenedor en el HTML
    cardContainer.innerHTML = ''; // Limpiar el contenido previo

    // Recorrer los productos y crear tarjetas (cards) por cada uno
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card'); // Agregar clase CSS para dar estilo

        // Información del producto desde la API
        const productTitle = product.title || 'Producto sin título';
        const productDescription = product.description || 'Descripción no disponible';
        const productPrice = product.price ? `Precio: $${product.price}` : 'Precio no disponible';
        const productImage = product.image || 'default.jpg'; // Imagen por defecto si no está disponible

        // Crear el contenido HTML de la card
        card.innerHTML = `
            <h3>${productTitle}</h3>
            <img src="${productImage}" alt="${productTitle}">
            <p>${productDescription}</p>
            <p>${productPrice}</p>
        `;

        // Agregar la card al contenedor
        cardContainer.appendChild(card);
    });
}
// Función para mostrar un solo producto seleccionado
function displaySingleProduct(product) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpiar el contenido previo

    const card = document.createElement('div');
    card.classList.add('card');

    const productTitle = product.title || 'Producto sin título';
    const productDescription = product.description || 'Descripción no disponible';
    const productPrice = product.price ? `Precio: $${product.price}` : 'Precio no disponible';
    const productImage = product.image || 'default.jpg';

    card.innerHTML = `
        <h3>${productTitle}</h3>
        <img src="${productImage}" alt="${productTitle}">
        <p>${productDescription}</p>
        <p>${productPrice}</p>
        <button id="backButton">Volver a la tienda</button>
    `;
     // Evento para volver a la lista de productos
     card.querySelector('#backButton').addEventListener('click', async () => {
        const products = await fetchDataFromAPI('https://fakestoreapi.com/products');
        if (products) displayProducts(products);
    });

    cardContainer.appendChild(card);
}
// Función para filtrar los productos por título


// Llamada para obtener los datos y mostrarlos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const url = 'https://fakestoreapi.com/products'; // URL de la API
    const products = await fetchDataFromAPI(url); // Obtener los productos de la API

    if (products) {
        displayProducts(products); // Mostrar los productos en la página
    } else {
        console.error('No se pudieron obtener los productos.');
    }
});

// let allProducts = []; // Almacenará todos los productos obtenidos de la API

// // Función para filtrar los productos
// const filterProducts = () => {
//     const selectedCategory = document.getElementById('productFilter').value;
//     const filteredProducts = selectedCategory === 'all'
//         allProducts // Mostrar todos si selecciona "Todas las categorías"
//         allProducts.filter(product => product.category === selectedCategory); // Filtrar por categoría
//     displayProducts(filteredProducts); // Mostrar los productos filtrados
// };

// // Escuchar el clic en el botón de filtrar
// document.getElementById('filterBtn').addEventListener('click', filterProducts);

// // Llamada inicial para obtener los productos
// document.addEventListener('DOMContentLoaded', async () => {
//     const url = 'https://fakestoreapi.com/products'; // URL de la API
//     await fetchDataFromAPI(url); // Obtener los productos al cargar la página
// });

// Función para filtrar los productos por título
function filterProducts(products) {
    const productFilter = document.getElementById('productFilter'); // Select de filtro

    // Llenar el select con los títulos de los productos
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.title;
        option.textContent = product.title;
        productFilter.appendChild(option);
    });

    productFilter.addEventListener('change', () => {
        const selectedTitle = productFilter.value;
        const filteredProducts = products.filter(product => product.title === selectedTitle);
        displayProducts(filteredProducts);
    });

    
}

// Función para mostrar un solo producto seleccionado
function displaySingleProduct(product) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpiar el contenido previo

    const card = document.createElement('div');
    card.classList.add('card');

    const productTitle = product.title || 'Producto sin título';
    const productDescription = product.description || 'Descripción no disponible';
    const productPrice = product.price ? `Precio: $${product.price}` : 'Precio no disponible';
    const productImage = product.image || 'default.jpg';

    card.innerHTML = `
        <h3>${productTitle}</h3>
        <img src="${productImage}" alt="${productTitle}">
        <p>${productDescription}</p>
        <p>${productPrice}</p>
        <button id="backButton">Volver a la tienda</button>
    `;

    // Evento para volver a la lista de productos
    card.querySelector('#backButton').addEventListener('click', async () => {
        const products = await fetchDataFromAPI('https://fakestoreapi.com/products');
        if (products) displayProducts(products);
    });

    cardContainer.appendChild(card);
}

const fillSelectOptions = (products) => {
    const select = document.getElementById('productFilter');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id; // Usamos el ID del producto como valor
        option.textContent = product.title; // Mostrar el título del producto en el select
        select.appendChild(option);
    });
} 