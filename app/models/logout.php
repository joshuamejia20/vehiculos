<?php

    session_start();
    //session_destroy();

    unset(
        $_SESSION['vehiculos'],
        $_SESSION['vehiculos_id_usuario'],
        $_SESSION['vehiculos_usuario'],
        $_SESSION['vehiculos_nombre_completo']
    );

    if(!isset($_SESSION['vehiculos'])){
        $response = array(
            'success'=>true,
            'url'=>'?mod=login'
        );
    }else{
        $response = array(
            'success'=>false,
            'error'=>'No fue posible cerrar la sesión'
        );
    }

    echo json_encode($response);