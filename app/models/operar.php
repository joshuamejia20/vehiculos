<?php

$params = $_POST;
$resultado = 0;

if ($params["n1"] != "" && $params["n2"] != "") {
    switch ((int)$params["tipo_operacion"]) {
        case 1:
            $resultado = (float)$params["n1"] + (float)$params["n2"];
            $response = array(
                "success" => true,
                "msg" => "El resultado de sumar " . $params["n1"] . " + " . $params["n2"] . " = " . $resultado
            );
            break;
        case 2:
            $resultado = (float)$params["n1"] - (float)$params["n2"];
            $response = array(
                "success" => true,
                "msg" => "El resultado de restar " . $params["n1"] . " - " . $params["n2"] . " = " . $resultado
            );
            break;
        case 3:
            $resultado = (float)$params["n1"] * (float)$params["n2"];
            $response = array(
                "success" => true,
                "msg" => "El resultado de multiplicar " . $params["n1"] . " X " . $params["n2"] . " = " . $resultado
            );
            break;
        case 4:
            $resultado = (float)$params["n1"] / (float)$params["n2"];
            $response = array(
                "success" => true,
                "msg" => "El resultado de dividir " . $params["n1"] . " / " . $params["n2"] . " = " . $resultado
            );
            break;
        default:
            $response = array(
                "success"=>false,
                "error"=>"La operación no es válida o no escogiste una"
            );
            break;
    }
} else {
    $response = array(
        'success' => false,
        'error' => "Uno de los números se encuentra vacío"
    );
}

echo json_encode($response);
unset($params, $response);