let products = [];
let cart_products = [];

const main_products_cards = document.querySelectorAll(".main-products__card");
const header_cart = document.querySelector(".header-cart");

header_cart.querySelector(".header-cart__cart-quantity").textContent = cart_products.length + " товаров";

main_products_cards.forEach((element, index) => {
    let cartButton = element.querySelector(".main-products__cart-button");
    cartButton.addEventListener("click", () => {
        addProductToCart(index);
    });
});

function addProductToCart(productIndex) {
    cart_products.push(products[productIndex]["id"]);
    header_cart.querySelector(".header-cart__cart-quantity").textContent = cart_products.length + " товаров";
    console.log(cart_products);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

fetch('./json/products.json')
    .then(response => response.json())
    .then(data => {
        let jsonData = shuffleArray(data);
        
        main_products_cards.forEach((element, index) => {
            element.querySelector('.main-products__card-image').src = jsonData[index]['image'];
            element.querySelector('.main-products__card-price').textContent = jsonData[index]['price'].toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';
            element.querySelector('.main-products__card-name').textContent = jsonData[index]['name'];
        });

        products = jsonData;
    });
