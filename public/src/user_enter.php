<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SKIF</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <a href="#"><img class="header__catalogue" src="icons/Catalogue.png" alt="catalogue icon"></a>
        <button class="header-logo" onclick="header_logo_clicked()">
            <img class="header-logo__img" src="img/Logo.png" alt="logo">
        </button>
        <section class="header-location">
            <section class="header-location__city">
                <img src="icons/Location.png" alt="location icon">
                <h2 class="bold">Караганда</h2>
            </section>
            <h2>Уточните Адрес</h2>
        </section>
        <form class="header-search">
            <input type="search" name="" id="header-search__input" placeholder="Искать товар...">
            <button class="header-search__button">
                <img src="icons/Magnifier.png" alt="magnifier icon">
            </button>
        </form>
        <section class="header-profile">
            <button class="header-profile__button" onclick="profile_dropmenu()">
                <h2 class="header-profile__account bold">Войти</h2>
                <h2>Профиль</h2>
            </button>
            <section class="header-profile-menu">
                <button onclick="window.location.href='user_enter.php'"">Вход / регистрация</button>
                <button onclick="user_exit()">Выйти из аккаунта</button>
            </section>
        </section>
        <section class="header-favourite" onclick="window.location.href='favourites.php';">
            <button class="header-favourite__button">
                <img src="icons/Favourite.png" alt="favourite icon">
            </button>
        </section>
        <button class="header-cart" onclick="window.location.href='cart.php';">
            <img src="icons/Cart.png" alt="cart icon">
            <section>
                <h2 class="header-cart__cart bold">Корзина</h2>
                <h2 class="header-cart__cart-quantity"></h2>
            </section>
        </button>
        <section class="header-menu">
            <button class="header-menu__button">
                <img src="icons/Menu.png" alt="">
            </button>
        </section>
    </header>
    
    <main class="user-enter-main">
        <form action="managers/users_manager.php" method="post">
            <h1>Вход / Регистрация</h1>
            <h2>Имя пользователя</h2>
            <input type="text" name="username">
            <h2>Пароль</h2>
            <input type="password" name="password">
            <input type="submit" value="Войти или зарегистрироваться">
        </form>
    </main>

    <script src="js/user_enter.js"></script>
</body>
</html>