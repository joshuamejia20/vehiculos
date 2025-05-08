<?php

require "../sql/conexion.php";

try {
    $params = $_POST;
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
