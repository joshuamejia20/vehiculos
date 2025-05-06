<?php

require "../sql/conexion.php";

try {

    $params = $_POST;

    $sql = "INSERT INTO no_normalizada(marca, modelo, fecha, tipo_vehiculo, tipo_gasolina, tipo_traccion, color, numero_puertas)
        VALUES('$params[marca]', '$params[modelo]', '$params[fecha]', '$params[tipo_vehiculo]', '$params[tipo_gasolina]', '$params[tipo_traccion]', '$params[color]', '$params[numero_puertas]')";
    $insertar_vehiculo = mysqli_query($con, $sql);

    if (mysqli_insert_id($con) > 0) {
        //$id = mysqli_insert_id($con);
        //tabla subtabla(ID)
        $response = array(
            'success' => true,
            'msg' => 'Vehiculo registrado exitosamente'
        );
    } else {
        $response  = array(
            'success' => false,
            'error' => 'No fue posible registra el vehiculo'
        );
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response = array(
        'success' => false,
        'error' => 'Error en la consulta: ' . $e->getMessage()
    );
    echo json_encode($response);
}
