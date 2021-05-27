const products = [
    { id: 1, tittle: 'Notebook', price: 2000 },
    { id: 2, tittle: 'Mouse', price: 400 },
    { id: 3, tittle: 'Keyboard', price: 300 },
    { id: 4, tittle: 'Gamepad', price: 205 }
];

const renderProduct = (product, img='https://via.placeholder.com/200x150') => {
    return `<div class="product-item">
    <img src="${img}">
    <h3>${product.tittle}</h3>
    <p>${product.price}</p>
    <button class="buy-btn">Купить</button>
    </div>`;
}

const renderPage = (list) => {
    const productList = list.map(item => renderProduct(item));
    document.querySelector('.products').innerHTML = productList.join('');
}

renderPage(products);