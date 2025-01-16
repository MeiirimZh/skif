<?php
    $json = json_decode(file_get_contents("../json/users.json"), true);

    $json['current_user'] = "guest";

    $json = json_encode($json, JSON_PRETTY_PRINT);
    file_put_contents('../json/users.json', $json);
?>