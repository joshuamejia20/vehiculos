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

    $sql = "DELETE FROM no_normalizada
            WHERE id_no_normalizada = '$params[id_no_normalizada]'";

    $eliminar_vehiculo = mysqli_query($con, $sql);

    if (mysqli_affected_rows($con) > 0) {
        $info_posterior = '';

        $sql = "CALL registrar_bitacora($params[id_no_normalizada], 'no_normalizada', 5, $id_usuario, '$info_anterior', '$info_posterior')";
        $registro_bitacora = mysqli_query($con, $sql);
        $response = array('success' => true, 'msg' => 'Vehiculo eliminado exitosamente');
    } else {
        $response = array('success' => false, 'error' => 'No fue posible eliminar el vehiculo');
    }
} catch (Exception $e) {
    $response = array(
        'success' => false,
        'error' => 'Error en la consulta: ' . $e->getMessage()
    );
}

echo json_encode($response);
