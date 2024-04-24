<?php 

require '../sql/conexion.php';

$params = array();
$params['completo'] = $_POST['datos'];

$campos = explode("&", $_POST['datos']);

foreach ($campos as $value) {
    $dato = explode('=', $value);
    $params[$dato[0]] = $dato[1];
}

try{

    if(isset($params['id_no_normalizada']) && $params['id_no_normalizada']==""){
        $sql = "INSERT INTO no_normalizada(marca, modelo, fecha_presentacion, tipo_combustible, tipo_vehiculo, tipo_transmision, color, numero_puertas)
        VALUES('$params[marca]','$params[modelo]','$params[fecha_presentacion]', '$params[tipo_combustible]', '$params[tipo_vehiculo]','$params[tipo_transmision]', '$params[color]','$params[numero_puertas]')";
        $guardar_vehiculo = mysqli_query($con, $sql);

        if(mysqli_insert_id($con)>0){
            $response = array(
                'success'=>true,
                'msg'=>'El vehiculo fue registrado exitosamente'
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No fue posible registrar el vehiculo'
            );
        }
    }else{
        $sql = "UPDATE no_normalizada
            SET marca='$params[marca]',
            modelo='$params[modelo]',
            fecha_presentacion='$params[fecha_presentacion]',
            tipo_combustible='$params[tipo_combustible]',
            tipo_vehiculo='$params[tipo_vehiculo]',
            tipo_transmision='$params[tipo_transmision]',
            color='$params[color]',
            numero_puertas='$params[numero_puertas]'
            WHERE id_no_normalizada='$params[id_no_normalizada]'";
        $actualizacion = mysqli_query($con, $sql);

        if(mysqli_affected_rows($con)>0){
            $response = array(
                'success'=>true,
                'msg'=>'Vehiculo actualizado correctamente'
            );
        }else{
            $response = array(
                'success'=>false,
                'error'=>'No fue posible actualizar'
            );
        }
    }
}catch(Exception $e){
    $response = array(
        'success'=>false,
        'error'=>'Error en la consulta: ' . $e->getMessage()
    );
}

echo json_encode($response);

$con->close();
unset($response, $params, $dato, $sql);


?>