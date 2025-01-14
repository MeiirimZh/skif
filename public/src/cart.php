<?php
    require_once "blocks/header.html";
?>
        <main>
            <div class="main-products">
                <?php
                    $users = json_decode(file_get_contents('json/users.json'), true);
                    
                    for ($i = 0; $i < count($users['users']); $i++) {
                        if ($users['users'][$i]['name'] == $users['current_user'])
                            $cart_quantity = count($users['users'][$i]['cart']);
                            if ($cart_quantity != 0) {
                                for ($i = 0; $i < $cart_quantity; $i++) {
                                    require "blocks/product_card.html";
                                }
                            }
                            else {
                                echo '<h2 class="main-empty-cart__text">Корзина пуста</h2>';
                            }
                    }
                ?>
            </div>
            <h2 class="main__order-price bold"></h2>
            <button class="main__confirm_order">Оформить заказ</button>
        </main>
    </div>

    <footer></footer>

    <script src="js/cart.js"></script>
</body>
</html>