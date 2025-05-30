<?php

    error_reporting(E_ERROR);
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $base = "bd_vehiculos";

    $con = mysqli_connect($servidor, $usuario, $clave, $base, 3307);

    if($con){
        $con->set_charset("utf-8");
    }else{
        $response = array('success'=>false, 'error'=>"No hay conexión a la base de datos");

        echo json_encode($response);
        exit();
    }