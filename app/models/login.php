<?php

require "sql/conexion.php";

try {
    $params = $_POST;

    $sql = "SELECT u.id_usuario,
        nombres, apellidos, usuario,
        IF(
            CAST(u.estado as UNSIGNED)=1,
            true,
            false
        ) estado_usuario,
        IF(
            (
                SELECT id_clave
                FROM clave c
                WHERE CAST(c.estado as UNSIGNED)=1
                AND c.id_usuario=u.id_usuario
                AND c.clave=PASSWORD(MD5('$params[clave]'))
            ),
            true,
            false
        ) validez_clave
        FROM usuario u
        WHERE usuario='$params[usuario]'";

    $verificar_usuario = mysqli_query($con, $sql);

    if ($verificar_usuario) {
        if (mysqli_num_rows($verificar_usuario)) {
            $items = array();
            while ($row = mysqli_fetch_assoc($verificar_usuario)) {
                $items[] = $row;
            }

            if ($items[0]['estado_usuario']) {
                if ($items[0]['validez_clave']) {
                    //todo sale bien
                    session_start();
                    $_SESSION['vehiculos'] = true;
                    $_SESSION['vehiculos_id_usuario'] = $items[0]['id_usuario'];
                    $_SESSION['vehiculos_usuario'] = $items[0]['usuario'];
                    $_SESSION['vehiculos_nombre_completo'] = $items[0]['nombres'] ." " .  $items[0]['apellidos'];

                    $sql = "INSERT INTO bitacora(tabla_afectada, registro_afectado, fecha_accion, tipo_accion, id_usuario)
                    VALUES('no_aplica', 0, NOW(), 1, $_SESSION[vehiculos_id_usuario])";
                    $ingreso = mysqli_query($con, $sql);

                    $response = array(
                        'success'=>true,
                        'url' => '?mod=inicio'
                    );

                } else {
                    $response = array(
                        'success' => false,
                        'error' => 'Sus credenciales son incorrectas'
                    );
                }
            } else {
                $response = array(
                    'success' => false,
                    'error' => 'Su cuenta está inactiva'
                );
            }
        } else {
            $response = array(
                'success' => false,
                'error' => 'Sus credenciales son incorrectas'
            );
        }
    } else {
        $response = array(
            'success' => false,
            'error' => mysqli_error($con)
        );
    }
} catch (Exception $e) {
    $response = array(
        'success' => false,
        'error' => 'Error en la consulta: ' . $e->getMessage()
    );
}

echo json_encode($response);
