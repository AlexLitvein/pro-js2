const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        cart: [],
        imgCatalog: 'http://placehold.it/200x150',
        productVisible: 1,
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            let cartProd = { ...product };
            cartProd.quantity = 1;

            let idx = this.cart.findIndex((el) =>
                el.id_product === cartProd.id_product
            );
            if (idx >= 0) this.cart[idx].quantity += 1;
            else this.cart.push(cartProd);
            
        },
        delCartProduct(prod) {
            let idx = this.cart.findIndex((el) =>
                el.id_product === prod.id_product
            );
            if (idx >= 0) this.cart.splice(idx, 1);
            this.showCart();
        },
        showCart() {
            this.cart.length > 0 ? this.isVisibleCart = true : this.isVisibleCart = false;
        },
        filter(value) {
            this.productVisible = this.products.length;
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                    this.productVisible--;
                } else {
                    block.classList.remove('invisible');
                }
            });
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    }
})
