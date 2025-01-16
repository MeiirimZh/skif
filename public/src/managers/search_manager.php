<?php
    $json = json_decode(file_get_contents('../json/search_query.json'));
    $product_name = $_POST['search_product_name'];
    
    $json = explode(' ', $product_name);
    
    $json = json_encode($json, JSON_PRETTY_PRINT);
    file_put_contents('../json/search_query.json', $json);

    header("Location: ../index.php");
?>