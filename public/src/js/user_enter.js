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