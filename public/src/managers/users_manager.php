<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $action = 'signup';
    $user_found = false;

    $json = json_decode(file_get_contents('../json/users.json'), true);

    for ($i = 0; $i < count($json['users']); $i++) {
        if ($username == $json['users'][$i]['name']) {
            if ($password == $json['users'][$i]['password']) {
                $user_found = true;

                header('Location: /index.php');
            }
            $action = 'sign in';
        }
    }

    if (!$user_found and $action == 'sign in') {
        echo '<h1>Неправильный пароль!</h1>';
        echo '<button onclick="window.location.href=\'../index.php\';">Перейти на главную</button>';
        echo '<button onclick="window.location.href=\'../user_enter.php\';">Вернуться в вход / регистрацию</button>';
    }

    if ($action == 'signup') {
        $new_user = ["name" => $username, "password" => $password, "cart" => [], "favourite" => []];
        $json['users'][] = $new_user;
        $json['current_user'] = $username;
        
        $json = json_encode($json, JSON_PRETTY_PRINT);
        file_put_contents('../json/users.json', $json);

        header("../index.php");
    }
    else {
        $json['current_user'] = $username;

        $json = json_encode($json, JSON_PRETTY_PRINT);
        file_put_contents('../json/users.json', $json);
    }
?>