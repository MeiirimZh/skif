<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $action = 'signup';

    $json = json_decode(file_get_contents('../json/users.json'), true);

    for ($i = 0; $i < count($json['users']); $i++) {
        if ($username == $json['users'][$i]['name']) {
            if ($password == $json['users'][$i]['password']) {
                $action = 'sign in';

                echo "С возвращением, " . $username;
            }
            else {
                echo "Неверный пароль!";
            }
        }
    }

    if ($action == 'signup') {
        $new_user = ["name" => $username, "password" => $password, "cart" => [], "favourite" => []];
        $json['users'][] = $new_user;
        $json['current_user'] = $username;
        
        $json = json_encode($json, JSON_PRETTY_PRINT);
        file_put_contents('../json/users.json', $json);
    }
    else {
        $json['current_user'] = $username;

        $json = json_encode($json, JSON_PRETTY_PRINT);
        file_put_contents('../json/users.json', $json);
    }
?>