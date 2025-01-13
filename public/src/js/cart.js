let products = [];
let product_ids = [];

let products_cards = document.querySelectorAll(".main-products__card");

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

fetch('../json/users.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data['users'].length; i++) {
            if (data['users'][i]['name'] == data['current_user']) {
                product_ids = data['users'][i]['cart'];
            }
        }
        console.log(product_ids);
    });

fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < product_ids.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (product_ids[i] == data[j]['id']) {
                    products.push(data[j]);
                }
            }
        }
        
        products_cards.forEach((element, index) => {
            element.querySelector('.main-products__card-image').src = products[index]['image'];
            element.querySelector('.main-products__card-price').textContent = products[index]['price'].toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';
            element.querySelector('.main-products__card-name').textContent = products[index]['name'];
        });
    })  
