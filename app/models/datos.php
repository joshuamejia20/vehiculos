<?php

    $params = $_POST;

    if(
        $params['nombres']!="" &&
        $params['apellidos']!="" &&
        $params['profesion']!="" &&
        $params['fecha_nacimiento']!=""
    ){   
        $response = array(
            'success'=> true,
            'msg' => 'Los datos recibidos en el servidor son: nombres: ' . $params['nombres'] . ', apellidos: ' . $params['apellidos'] . ', profesión: ' . $params['profesion'] . ', fecha de nacimiento: ' . $params['fecha_nacimiento']
        );
    }else{
        $response = array(
            'success' => false,
            'error' => 'Uno de los datos está vacío'
        );
    }

    echo json_encode($response);
    unset($params, $response);

?>