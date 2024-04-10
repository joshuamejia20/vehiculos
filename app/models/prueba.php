<?php

    $params = $_POST;

    if(isset($params["validez"])){
        $contenido = "Hola, mi nombre es " .$params["nombre"] . " " . $params["apellido"] . " mi fecha de nacimiento es " . $params["fecha"] . " y mi gran profesión es ". $params['profesion'];
        
        $response = array(
            'contenido' => $contenido,
            'success' => true
        );
    }else{
        $response = array(
            'success' => false,
            'error' => 'No tienes acceso al modelo'
        );
    }

    echo json_encode($response);

    unset($response, $params);

?>