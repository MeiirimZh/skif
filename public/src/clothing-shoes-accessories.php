<?php
    require_once "blocks/header.html";
?>
<?php
    require_once "blocks/navmain.html";
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

<?php
    require_once "blocks/footer.html";
?>

<script src="js/categories.js"></script>