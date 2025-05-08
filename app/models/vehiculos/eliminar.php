<?php

require "../sql/conexion.php";

try {
    $params = $_POST;
    $sql = "DELETE FROM no_normalizada
            WHERE id_no_normalizada = '$params[id_no_normalizada]'";

    $eliminar_vehiculo = mysqli_query($con, $sql);

    if (mysqli_affected_rows($con) > 0) {
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
