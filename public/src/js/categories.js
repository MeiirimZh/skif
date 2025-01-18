let products = [];
let page_products = [];
let favourites = [];

const products_cards = document.querySelectorAll(".main-products__card");
let products_carts_btns = Array.from(document.querySelectorAll(".main-products__cart-button"));
let products_favourites_btns = Array.from(document.querySelectorAll(".main-products__favourite-button"));

let category;

// Get the category
switch (window.location.href) {
    case 'https://skif.local/clothing-shoes-accessories.php':
        category = 'clothing-shoes-accessories';
        break;
    case 'https://skif.local/gear.php':
        category = 'gear';
        break;
    case 'https://skif.local/supply.php':
        category = 'supply';
        break;
    case 'https://skif.local/navigation-and-safety.php':
        category = 'navigation-and-safety';
        break;
}

function mobile_catalogue() {
    let nav = document.getElementsByTagName('nav')[0];
    if (nav.style.display == 'none') {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.zIndex = 1;
        document.querySelector(".nav-container").style.background = '#FFF';
    }
    else {
        nav.style.display = 'none';
    }
}

function mobile_menu() {
    if (document.querySelector(".header-menu-dropmenu").style.display == 'none') {
        document.querySelector(".header-menu-dropmenu").style.display = 'block';
    }
    else {
        document.querySelector(".header-menu-dropmenu").style.display = 'none';
    }
}

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

function header_logo_clicked() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        window.location.href='index.php';
    }

    xhr.open("POST", "../managers/search_manager.php");
    xhr.setRequestHeader("Custom-X-Header", "reset_search_query");
    xhr.send();
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

            xhr.open("POST", "../managers/cart_manager.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Custom-X-Header", `${String(product_index)},${'add'}`);
            xhr.send(JSON.stringify(data));
        })
}

function updateFavourites(button) {
    let button_index = products_favourites_btns.indexOf(button);
    let product_index = products.indexOf(page_products[button_index]);

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

            xhr.open("POST", "../managers/favourites_manager.php");
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.setRequestHeader("Custom-X-Header", `${String(product_index)},${operation}`);

            xhr.send(JSON.stringify(data));
        })
}

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

// Load the favourites
fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                favourites = data['users'][i]['favourite'];
            }
        }
    })

fetch('../json/products.json')
.then(response => response.json())
.then(data => {
    products = [...data];
    let jsonData = shuffleArray([...data]);

    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]['category'] != category) {
            jsonData.splice(i, 1);
            i--;
        }
    }

    page_products = [...jsonData];

    products_cards.forEach((element, index) => {
        if (jsonData[index] != undefined) {
            element.querySelector('.main-products__card-image').src = jsonData[index]['image'];
            element.querySelector('.main-products__card-price').textContent = jsonData[index]['price'].toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';
            element.querySelector('.main-products__card-name').textContent = jsonData[index]['name'];
            element.querySelector('.main-products__remove-button').style.display = 'none';
            if (favourites.includes(jsonData[index]['id'])) {
                element.querySelector('.main-products__favourite-button').querySelector(".main-products__favourite-button-img").src = '../icons/Favourite-Small-Filled.png';
            }
        }
        else {
            element.style.display = 'none';
        }
    })
});