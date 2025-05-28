<?php

require "../sql/conexion.php";

session_start();
$id_usuario = $_SESSION['vehiculos_id_usuario'];

try {
    $params = $_POST;

    $sql = "CALL extraer_datos($params[id_no_normalizada], 'no_normalizada', @datos)";
    $solicitar_datos = mysqli_query($con, $sql);
    $sql = "SELECT @datos";
    $registro_datos = mysqli_query($con, $sql);
    $datos = mysqli_fetch_assoc($registro_datos);

    $info_anterior = $datos['@datos'];

    $sql = "UPDATE no_normalizada
            SET marca = '$params[marca]',
            modelo = '$params[modelo]',
            fecha = '$params[fecha]',
            tipo_vehiculo = '$params[tipo_vehiculo]',
            tipo_gasolina = '$params[tipo_gasolina]',
            tipo_traccion = '$params[tipo_traccion]',
            color = '$params[color]',
            numero_puertas = '$params[numero_puertas]'
            WHERE id_no_normalizada = '$params[id_no_normalizada]'";

    $update_vehiculo = mysqli_query($con, $sql);

    if (mysqli_affected_rows($con) > 0) {
        $sql = "CALL extraer_datos($params[id_no_normalizada], 'no_normalizada', @datos)";
        $solicitar_datos = mysqli_query($con, $sql);
        $sql = "SELECT @datos";
        $registro_datos = mysqli_query($con, $sql);
        $datos = mysqli_fetch_assoc($registro_datos);

        $info_posterior = $datos['@datos'];

        $sql = "CALL registrar_bitacora($params[id_no_normalizada], 'no_normalizada', 4, $id_usuario, '$info_anterior', '$info_posterior')";
        $registro_bitacora = mysqli_query($con, $sql);
        $response = array('success' => true, 'msg' => 'Vehiculo actualizado exitosamente');
    } else {
        $response = array('success' => false, 'error' => 'No fue posible actualizar el vehiculo');
    }
} catch (Exception $e) {
    $response = array(
        'success' => false,
        'error' => 'Error en la consulta: ' . $e->getMessage()
    );
}

echo json_encode($response);
