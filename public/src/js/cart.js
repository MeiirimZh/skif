let products = [];
let page_products = [];
let favourites = [];
let product_ids = [];
let order_price = 0;

const products_cards = document.querySelectorAll(".main-products__card");
let products_remove_btns = Array.from(document.querySelectorAll(".main-products__remove-button"));
let products_favourites_btns = Array.from(document.querySelectorAll(".main-products__favourite-button"));

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

// Load favourites
fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                favourites = data['users'][i]['favourite'];
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

function removeProduct(button) {
    let product_index = products_remove_btns.indexOf(button);

    fetch('../json/users.json')
        .then(response => response.json())
        .then(data => {
            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                document.querySelector(".header-cart__cart-quantity").textContent = xhr.responseText;

                location.reload();
            };

            xhr.open("POST", "../cart_manager.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Custom-X-Header", `${String(product_index)},${'remove'}`);
            xhr.send(JSON.stringify(data));
        })
}

function updateFavourites(button) {
    let button_index = products_favourites_btns.indexOf(button);
    let product_index;

    for (let i = 0; i < products.length; i++) {
        if (products[i]['id'] == page_products[button_index]['id']) {
            product_index = i;
        }
    }

    fetch('../json/users.json')
        .then(response => response.json())
        .then(data => {
            let operation = 'add';

            for (let i = 0; i < data['users'].length; i++) {
                if (data['users'][i]['name'] == data['current_user']) {
                    if (data['users'][i]['favourite'].includes(products[product_index]['id'])) {
                        operation = 'remove';

                        products_cards[button_index].querySelector(".main-products__favourite-button").querySelector(".main-products__favourite-button-img").src = '../icons/Favourite-Small.png';
                    }
                    else {
                        products_cards[button_index].querySelector(".main-products__favourite-button").querySelector(".main-products__favourite-button-img").src = '../icons/Favourite-Small-Filled.png';
                    }
                }
            }

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                console.log("Избранные изменены");
            };

            xhr.open("POST", "../favourites_manager.php");
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.setRequestHeader("Custom-X-Header", `${String(product_index)},${operation}`);

            xhr.send(JSON.stringify(data));
        })
}

fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                product_ids = data['users'][i]['cart'];
            }
        }
    });

fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;

        for (let i = 0; i < product_ids.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (product_ids[i] == data[j]['id']) {
                    page_products.push(data[j]);
                }
            }
        }
        
        products_cards.forEach((element, index) => {
            element.querySelector('.main-products__card-image').src = page_products[index]['image'];
            element.querySelector('.main-products__card-price').textContent = page_products[index]['price'].toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';
            element.querySelector('.main-products__card-name').textContent = page_products[index]['name'];
            element.querySelector('.main-products__cart-button').style.display = 'none';
            if (favourites.includes(page_products[index]['id'])) {
                element.querySelector('.main-products__favourite-button').querySelector(".main-products__favourite-button-img").src = '../icons/Favourite-Small-Filled.png';
            }
        });

        for (let i = 0; i < page_products.length; i++) {
            order_price += page_products[i]['price'];
        }

        document.querySelector(".main__order-price").textContent = 'Сумма: ' + order_price.toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';
    });
