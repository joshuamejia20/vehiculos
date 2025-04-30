<?php

    require '../sql/conexion.php';

    try{
        //codigo
        $params = $_POST;

        $sql = "SELECT * FROM no_normalizada";
        $resultado = mysqli_query($con, $sql);

        if($resultado){
            if(mysqli_num_rows($resultado)){
                $items = array();
                while($row = mysqli_fetch_assoc($resultado)){
                    $items[] = $row;
                }

                $response = array(
                    'success'=>true,
                    'resultado'=>$items
                );
            }else{
                $response = array(
                    'success'=>false,
                    'error'=>'No hay registros de vehiculos'
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
        //atrapamos cualquier error
        $response = array(
            'success'=>false,
            'error'=>'Error en la consulta: ' . $e->getMessage()
        );

        echo json_encode($response);
    }