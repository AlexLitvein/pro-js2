class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="goods-item">
    <img src='https://via.placeholder.com/200x150'>
    <h3>${this.title}</h3>
    <p>${this.price}</p>
    <button class="buy-btn">Купить</button>
    </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  totalPrice() {
    let res = this.goods.reduce((acc, curr) => {
      return { price: acc.price + curr.price };
    });
    return res.price;
  }
}

class Cart {
  constructor() {
    this.goodsList = [];
  }
  addItem() {}
  reoveItem() {}
  totalPrice() {}
  order() {}
}

class CartItem {
  constructor() {}
  getInfo() {}
  incrementCount() {}
  decrementCount() {}
}

const prod = new GoodsList();
prod.fetchGoods();
prod.render();
console.log(prod.totalPrice());
