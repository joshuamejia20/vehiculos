<?php

require '../sql/conexion.php';

try{

    $params = $_POST;
    $response = array();

    $sql = "SELECT id_no_normalizada, marca, modelo, 
        fecha_presentacion, CAST(tipo_combustible AS UNSIGNED) tipo_combustible, CAST(tipo_vehiculo AS UNSIGNED) tipo_vehiculo, CAST(tipo_transmision AS UNSIGNED) tipo_transmision, color, numero_puertas 
        FROM no_normalizada
        WHERE id_no_normalizada = '$params[id_no_normalizada]'";
    $resultado = mysqli_query($con, $sql);

    if($resultado){
        if(mysqli_num_rows($resultado)>0){
            $items = array();
            while($fila = mysqli_fetch_assoc($resultado)){
                array_push($items, $fila);
            }

            $response = array(
                'success' => true,
                'resultado' => $items,
                'total' => COUNT($items)
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No se encontró el vehiculo seleccionado'
            );
        }
    }else{
        $response = array(
            'success'=>false,
            'error'=>mysqli_error($con)
        );
    }

    echo json_encode($response);
}catch(Exception $e){
    $response = array(
        'success'=>false,
        'error'=>'Error en la consulta: ' . $e->getMessage()
    );

    echo json_encode($response);
}

$con->close();
unset($response);

?>