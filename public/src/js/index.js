let products = [];
let page_products = [];
let cart_products = [];

const products_cards = document.querySelectorAll(".main-products__card");
let products_carts_btns = Array.from(document.querySelectorAll(".main-products__cart-button"));

// Update a cart quantity text
fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                document.querySelector('.header-cart__cart-quantity').textContent = data['users'][i]['cart'].length + " товаров";
            }
        }
    })

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateCart(button) {
    let button_index = products_carts_btns.indexOf(button);
    let product_index = products.indexOf(page_products[button_index]);

    fetch('../json/users.json')
        .then(response => response.json())
        .then(data => {
            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                document.querySelector(".header-cart__cart-quantity").textContent = xhr.responseText;
            };

            xhr.open("POST", "../cart_manager.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Custom-X-Header", `${String(product_index)},${'add'}`);
            xhr.send(JSON.stringify(data));
        })
}

fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        products = [...data];
        let jsonData = shuffleArray([...data]);
        
        products_cards.forEach((element, index) => {
            element.querySelector('.main-products__card-image').src = jsonData[index]['image'];
            element.querySelector('.main-products__card-price').textContent = jsonData[index]['price'].toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';
            element.querySelector('.main-products__card-name').textContent = jsonData[index]['name'];
            element.querySelector('.main-products__remove-button').style.display = 'none';
        });

        page_products = jsonData;
    });
