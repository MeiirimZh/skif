let products = [];
let page_products = [];
let product_ids = [];

const products_cards = document.querySelectorAll(".main-products__card");
let products_carts_btns = Array.from(document.querySelectorAll(".main-products__cart-button"));
let products_favourites_btns = Array.from(document.querySelectorAll(".main-products__favourite-button"));

// Update a cart quantity text and current user
fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        if (data['current_user'] != 'guest') {
            for (let i = 0; i < data['users'].length; i++) {
                if (data['users'][i]['name'] == data['current_user']) {
                    if (data['current_user'].length == 9) {
                        document.querySelector(".header-profile__account").textContent = data['users'][i]['name'];
                    }
                    else {
                        document.querySelector(".header-profile__account").textContent = data['users'][i]['name'].slice(0, 9);
                    }
                }
            }
        }

        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                document.querySelector('.header-cart__cart-quantity').textContent = data['users'][i]['cart'].length + " товаров";
            }
        }
    })

document.querySelector(".header-profile-menu").style.display = 'none';

function profile_dropmenu() {
    if (document.querySelector(".header-profile-menu").style.display == 'none') {
        document.querySelector(".header-profile-menu").style.display = 'block';
    }
    else {
        document.querySelector(".header-profile-menu").style.display = 'none';
    }
}

function user_exit() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        location.reload();
    };

    xhr.open("POST", "../managers/user_exit_manager.php");
    xhr.send();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateFavourites(button) {
    let product_index = products_favourites_btns.indexOf(button);

    fetch('../json/users.json')
        .then(response => response.json())
        .then(data => {
            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                location.reload();
            };

            xhr.open("POST", "../favourites_manager.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Custom-X-Header", `${String(product_index)},${'remove'}`);
            xhr.send(JSON.stringify(data));
        })
}

function updateCart(button) {
    let button_index = products_carts_btns.indexOf(button);
    let product_index;

    for (let i = 0; i < products.length; i++) {
        if (products[i]['id'] == page_products[button_index]['id']) {
            product_index = i;
        }
    }

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

fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                product_ids = data['users'][i]['favourite'];
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
            element.querySelector('.main-products__favourite-button').querySelector(".main-products__favourite-button-img").src = '../icons/Favourite-Small-Filled.png';
            element.querySelector('.main-products__remove-button').style.display = 'none';
        });
    });
