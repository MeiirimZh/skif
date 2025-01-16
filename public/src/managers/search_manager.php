<?php
    $json = json_decode(file_get_contents('../json/search_query.json'));
    $operation = "search";

    if (isset($_SERVER['HTTP_CUSTOM_X_HEADER']) and $_SERVER['HTTP_CUSTOM_X_HEADER'] == 'reset_search_query') {
        $json = [];
    }

    if ($operation == "search") {
        $product_name = $_POST['search_product_name'];

        $json = explode(' ', $product_name);

        $json = json_encode($json, JSON_PRETTY_PRINT);

        header("Location: ../index.php");
    }

    file_put_contents('../json/search_query.json', $json);
?>