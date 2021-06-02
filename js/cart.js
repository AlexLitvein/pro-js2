const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class CartItem {
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
    <button class="buy-btn">Удалить</button>
    </div>`;
  }
}

class CartList {
  constructor(container = ".products") {
    this.container = document.querySelector(container);
    this.totalCont = document.querySelector(".total");
    this.goods = [];
    // this.amount = 0;
    // this.count = 0;
    this.getProducts().then((data) => {
      this.goods = [...data.contents];
      // this.amount = data.amount;
      // this.count = data.countGoods;
      this.render();
    });

    let _removeItem = (e) => {
      if (e.target.tagName === "BUTTON") {
        let parentId = e.target.parentElement.id;
        let findIdx = this.goods.findIndex(function (item) {
          if (item.id_product == parentId) return true;
          else return false;
        });

        if (findIdx >= 0) {
          this.goods.splice(findIdx, 1);
          this.render();
        }

        e.stopPropagation();
      }
    };

    this.container.addEventListener("click", _removeItem);
  }

  getProducts() {
    return fetch(`${API}/getBasket.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  addProducts() {
    return fetch(`${API}/addToBasket.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  removeProducts() {
    return fetch(`${API}/deleteFromBasket.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    this.container.innerHTML = "";
    for (const product of this.goods) {
      const prod = new CartItem(product);
      this.container.insertAdjacentHTML("beforeend", prod.render());
    }
    this.totalCont.innerHTML = "";
    this.totalCont.insertAdjacentHTML("beforeend", `Amount: ${this.getSum()}<br>Count: ${this.goods.length}`);
    // this.totalCont.insertAdjacentHTML("beforeend", `Amount: ${this.amount}<br>Count: ${this.count}`);
  }

  getSum() {
    return this.goods.reduce((acc, curr) => acc + curr.price, 0);
  }
}

const prod = new CartList();
