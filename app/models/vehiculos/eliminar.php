<?php

require '../sql/conexion.php';

    $params = $_POST;

    $sql = "DELETE FROM no_normalizada
        WHERE id_no_normalizada='$params[id_no_normalizada]'";
    $eliminar = mysqli_query($con, $sql);

    if(mysqli_affected_rows($con)>0){
        $response = array(
            'success'=>true,
            'msg'=>'Vehiculo eliminado correctamente'
        );
    }else{
        $response = array(
            'success'=>false,
            'error'=>mysqli_error($con)
        );
    }

    echo json_encode($response);

?>