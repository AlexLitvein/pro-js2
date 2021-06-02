const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" id="${this.id}">
    <img src="${this.img}" alt="pic">
    <h3>${this.title}</h3>
    <p>${this.price}</p>
    <button class="buy-btn">Купить</button>
    </div>`;
  }
}

class ProductList {
  constructor(container = ".products") {
    this.container = document.querySelector(container);
    this.goods = [];
    this.getProducts().then(data => {
      this.goods = [...data];
      this.render();
    })
  }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    for (const product of this.goods) {
      const prod = new ProductItem(product);
      this.container.insertAdjacentHTML("beforeend", prod.render());
    }
  }

  getSum() {
    return this.goods.reduce((acc, curr) => acc + curr.price, 0);
  }
}

const prod = new ProductList();
console.log(prod.getSum());
