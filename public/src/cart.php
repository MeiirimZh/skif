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
        </main>
    </div>

    <footer></footer>

    <script src="js/cart.js"></script>
</body>
</html>