<?php
    $jsonFile = 'json/users.json';
    $requestBody = file_get_contents('php://input');
    $users = json_decode($requestBody, true);
    $products = json_decode(file_get_contents('json/products.json'), true);
    $user_index;
    $product_index = explode(',', $_SERVER['HTTP_CUSTOM_X_HEADER'])[0];
    $operation = explode(',', $_SERVER['HTTP_CUSTOM_X_HEADER'])[1];

    if ($users) {
        for ($i = 0; $i < count($users['users']); $i++) {
            if ($users['users'][$i]['name'] = $users['current_user']) {
                if ($operation == 'add') {
                    $users['users'][$i]['favourite'][] = $products[$product_index]["id"];
                }
                else {
                    unset($users['users'][$i]['favourite'][$product_index]);
                    $users['users'][$i]['favourite'] = array_values($users['users'][$i]['favourite']);
                }
                $user_index = $i;
            }
        }
    }

    $updatedJson = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $updatedJson);
?>