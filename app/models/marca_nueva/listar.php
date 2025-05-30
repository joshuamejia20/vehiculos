<?php

    require '../sql/conexion.php';

    try{
        //codigo
        $params = $_POST;
        
        $params['query'] = "%".$_POST['query']. "%";

        $sql = "SELECT id_marca id, marca text FROM marca
            WHERE marca LIKE '$params[query]'";
        $resultado = mysqli_query($con, $sql);

        if($resultado){
            if(mysqli_num_rows($resultado)){
                $items = array();
                while($row = mysqli_fetch_assoc($resultado)){
                    $items[] = $row;
                }

                $response = array(
                    'success'=>true,
                    'data'=>$items
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