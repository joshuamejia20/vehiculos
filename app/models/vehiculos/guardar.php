<?php

use Dom\Mysql;

require "../sql/conexion.php";
session_start();
$id_usuario = $_SESSION['vehiculos_id_usuario'];

try {

    $params = $_POST;
    $info_anterior = '';
    $sql = "INSERT INTO no_normalizada(marca, modelo, fecha, tipo_vehiculo, tipo_gasolina, tipo_traccion, color, numero_puertas)
        VALUES('$params[marca]', '$params[modelo]', '$params[fecha]', '$params[tipo_vehiculo]', '$params[tipo_gasolina]', '$params[tipo_traccion]', '$params[color]', '$params[numero_puertas]')";
    $insertar_vehiculo = mysqli_query($con, $sql);

    if (mysqli_insert_id($con) > 0) {
        $id = mysqli_insert_id($con);
        //tabla subtabla(ID)
        $sql = "CALL extraer_datos($id, 'no_normalizada', @datos)";
        $solicitar_datos = mysqli_query($con, $sql);
        $sql = "SELECT @datos";
        $registro_datos = mysqli_query($con, $sql);
        $datos = mysqli_fetch_assoc($registro_datos);

        $info_posterior = $datos['@datos'];

        $sql = "CALL registrar_bitacora($id, 'no_normalizada', 3, $id_usuario, '$info_anterior', '$info_posterior')";
        $registro_bitacora = mysqli_query($con, $sql);

        if(!$registro_bitacora){
            $response = array(
                'success'=>false,
                'error'=>mysqli_error($con)
            );
        }
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
