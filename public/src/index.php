<?php
        $a = 5;
?>

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
        <a href="index.html"><img class="header__logo" src="img/Logo.png" alt="logo"></a>
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
            <h2 class="header-profile__account bold">Войти</h2>
            <h2>Мой раздел</h2>
        </section>
        <section class="header-favourite">
            <button class="header-favourite__button">
                <img src="icons/Favourite.png" alt="favourite icon">
            </button>
        </section>
        <button class="header-cart">
            <img src="icons/Cart.png" alt="cart icon">
            <section>
                <h2 class="header-cart__cart bold">Корзина</h2>
                <h2 class="header-cart__cart-quantity" data-attr="<?=$a;?>">0 товаров</h2>
            </section>
        </button>
        <section class="header-menu">
            <button class="header-menu__button">
                <img src="icons/Menu.png" alt="">
            </button>
        </section>
    </header>

    <div class="navmain">
        <nav>
            <div class="nav-container">
                <ul>
                    <li>
                        <button class="nav-container__button" onclick="window.location.href='catalogue/clothing-shoes-accessories.html';">
                            <img src="icons/catalogue/clothes.png" alt="clothing icon">
                            <h2>Одежда, обувь,<br>аксессуары</h2>
                        </button>
                    </li>
                    <li>
                        <button class="nav-container__button" onclick="window.location.href='catalogue/gear.html';">
                            <img src="icons/catalogue/backpack.png" alt="gear icon">
                            <h2>Снаряжение</h2>
                        </button>
                    </li>
                    <li>
                        <button class="nav-container__button" onclick="window.location.href='catalogue/supply.html';">
                            <img src="icons/catalogue/bottle.png" alt="supply icon">
                            <h2>Питание</h2>
                        </button>
                    </li>
                    <li>
                        <button class="nav-container__button" onclick="window.location.href='catalogue/navigation-and-safety.html';">
                            <img src="icons/catalogue/compass.png" alt="navigation icon">
                            <h2>Навигация и<br>безопасность</h2>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

        <main>
            <div class="main-products">
                <?php
                    for ($i = 0; $i < 12; $i++)
                        require "blocks/product_card.html";
                ?>
            </div>
        </main>
    </div>

    <footer></footer>

    <script src="js/index.js"></script>
</body>
</html>