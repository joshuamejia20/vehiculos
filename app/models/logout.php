<?php
require "sql/conexion.php";

session_start();
//session_destroy();

$sql = "INSERT INTO bitacora(tabla_afectada, registro_afectado, fecha_accion, tipo_accion, id_usuario)
VALUES('no_aplica', 0, NOW(), 2, $_SESSION[vehiculos_id_usuario])";
$ingreso = mysqli_query($con, $sql);

unset(
    $_SESSION['vehiculos'],
    $_SESSION['vehiculos_id_usuario'],
    $_SESSION['vehiculos_usuario'],
    $_SESSION['vehiculos_nombre_completo']
);

if (!isset($_SESSION['vehiculos'])) {
    $response = array(
        'success' => true,
        'url' => '?mod=login'
    );
} else {
    $response = array(
        'success' => false,
        'error' => 'No fue posible cerrar la sesión'
    );
}

echo json_encode($response);
