<?php
    require_once "blocks/header.html";
?>
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