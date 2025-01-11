<?php
    $jsonFile = 'json/users.json';
    $requestBody = file_get_contents('php://input');
    $users = json_decode($requestBody, true);
    $user_index;

    if ($users) {
        for ($i = 0; $i < count($users['users']); $i++) {
            if ($users['users'][$i]['name'] = $users['current_user']) {
                $users['users'][$i]['cart'][] = 1;
                $user_index = $i;
            }
        }
    }

    $updatedJson = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $updatedJson);
    echo count($users['users'][$user_index]['cart']) . ' товаров';
?>