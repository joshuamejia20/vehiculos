<?php
    //variables
    #inician con $
    #$_ 
    /*
        1. No deben iniciar con numeros $4nombre;
        2. No deben tener espacios $nombre completo;
        3. No deben tener caracteres especiales $nombre_completo;
    */

/*

    $nombre = "Josue";
    $NOMBRE = "Josue";
    $Nombre = "Josue";

    unset($nombre, $NOMBRE, $Nombre);

    //tipos de variables
    $num1 = 18; //entero positivo
    $num2 = -18; //entero negativo
    $num3 = 18.5; //flotante
    $num4 = 0x12; //hexadecimal
    $num5 = 012; //octal

    $cadena = "Hola mundo";
    $esPosible = true;
    $esPosible = false;
    $nulo = null;

    //concatenacion
    echo "hola a" . " todos";

    //if y switch
    $temperatura = 25;
    if($temperatura > 20){
        echo "<br>Hace calor";
    }

    $hora = 14;
    if($hora < 12){
        echo  "Buenos dias";
    }elseif($hora < 18){
        echo "<br>Buenas tardes";
    }else{
        echo "Buenas noches";
    }

    $usuario_activo = true;
    $usuario_admin = false;

    if($usuario_activo && !$usuario_admin){
        echo "Usuario activo, pero no es administrador";
    }elseif($usuario_admin){
        echo "Usuario administrador";
    }else{
        echo "Usuario inactivo";
    }

    $esSalvo = true;

    $final = ($esSalvo) ? "Va pa'arriba" : "Va pa'bajo";

    //switch
    $color = "azul";

    switch($color){
        case "rojo":
            echo "El color es rojo";
            break;
        case "azul":
            echo "El color es azul";
            break;
        default:
            echo "Color desconocido";
    }

    $asistencia = 3;

    switch($asistencia){
        case 1:
        case 2:
        case 3:
            echo "Asistencia baja";
            break;
        case 4:
        case 5:
        case 6:
            echo "Asistencia promedio";
            break;
        case 7:
        case 8:
        case 9:
            echo "Asistencia alta";
            break;
        default:
            echo "Asistencia desconocida";
    }

    $variable = "abc";

    switch(true){
        case is_numeric($variable):
            echo "Es un numero";
            break;
        case is_string($variable):
            echo "Es una cadena";
            break;
        case is_bool($variable):
            echo "Es un booleano";
            break;
        default:
            echo "Tipo desconocido";
    }*/

    //BUCLES
    #FOR 1 - 5
    /*for($i = 1;  $i<=5;  $i++){
        echo "Iteración número:  " .$i . "<br>";
    }

    #numeros impares del 1 al 10
    for($i = 1; $i <= 10; $i+=2){
        echo "Número impar: " . $i . "<br>";
    }

    #imprimir un triangulo invertido
    for($i = 10; $i >=1; $i--){
        for($j = 1; $j<=$i; $j++){
            echo "*";
        }
        echo "<br>";
    }

    $indexado = array(1,2,3,4,5);
    $asociativo = array(
        "nombre"=>'gerson',
        'carrera'=>'La poderosa ingenieria',
        'mejor amigo'=>'JC'
    );

    for($i=0; $i<COUNT($indexado); $i++){
        echo "posicion: $i: valor: ".$indexado[$i] . "<br>";
    }
    foreach($asociativo as $llave => $valor){
        echo "llave: $llave --> valor: ". $valor .  "<br>";
    }

    #caracter de una cadena
    /*$cadena ="hola";
    foreach ($cadena as $caracter) {
        echo $caracter .  "<br>";
    }*/

    #WHILE 1 -5
    /*$i = 1;
    while($i<=5){
        echo "Número: $i <br>";
        $i++;
    }

    #encontrar el primer divisor de un numero
    $numero=15;
    $divisor = 2;
    while($numero % $divisor != 0){
        $divisor++;
    }
    echo "el primer divisor de $numero  es: $divisor";

    #sumar el total de una cantidad
    $numero = 12345;
    $suma = 0;
    while($numero > 0){
        $digito = $numero % 10;
        $suma += $digito;
        $numero = (int)$numero/10; 
    }

    echo "<br>La suma de los digitos es: $suma <br>";

    #DO WHILE 1 -5 
    $i = 1;
    do{
        echo "Número: $i <br>";
        $i++;
    }while($i<=5);

    #simulador de adivinar numero
    $numero_aleatorio = 0;
    $intentos = 0;
    do{
        $numero_aleatorio  = rand(1, 10);
        $intentos++;
        echo "Intento número: $intentos numero generado: $numero_aleatorio <br>";
    }while($numero_aleatorio != 7);

    echo "¡Adivinaste en $intentos intentos! <br>";

    $numero = 10;
    $factorial = 1;
    do{
        $factorial = $factorial * $numero;
        $numero--;
    }while($numero > 0);

    echo "el factorial es $factorial <br>";*/

    //arreglos
    //son mapas ordenados que guardan valores con claves
    echo "Indexados<br>";//sus claves son numericas
    $color = "negro";
    $arrayIndexado = array(1, 2, "Hola", $color);
    print_r($arrayIndexado);
    
    echo "<br>";

    for ($i=0; $i < count($arrayIndexado); $i++) { 
        echo $arrayIndexado[$i]."<br>";
    }
    echo "Asociativos <br>";// sus claves son alfanumericas
    $arrayAsociativo = array(
        "nombre"=>'Josué',
        "color"=>$color,
        "saludo"=>"Siempre ingeniero, nunca lic."
    );

    print_r($arrayAsociativo);
    echo "<br>";

    foreach($arrayAsociativo as $clave => $valor){
        echo "Clave: $clave ----> valor: $valor <br>";
    }

    //FUNCIONES
    $array = array("Hola", "futuros", "ingenieros");
    $string = implode("_", $array);
    echo $string;
    echo "<br>";

    $arr1 = explode("_", $string);
    print_r($arr1);
    echo "<br>";

    echo COUNT($arrayIndexado)."<br>";
    echo COUNT($arrayAsociativo)."<br>";
    echo sizeof($arrayIndexado)."<br>";
    echo sizeof($arrayAsociativo)."<br>";

    array_push($arr1, "item nuevo");
    print_r($arr1);
    echo "<br>";

    $numeros = array(3, 1, 4, 1, 5);
    sort($numeros);
    print_r($numeros);
    echo "<br>";

    $edades = array(
        "Juan" =>25,
        "Ana" =>22,
        "Luis"=>30
    );

    asort($edades);
    print_r($edades);

    echo "<br>";
    ksort($edades);
    print_r($edades);
    echo "<br>";

    $frutas = array("Manzana", "Pera", "Uva");
    unset($frutas[1]);
    print_r($frutas);
    echo "<br>";

    $datos = ["nombre"=>"Juan", 'edad'=>30];
    var_export($datos);
    echo "<br>";
    var_dump($datos);
    echo "<br>";

    $cartas = [1, 2, 3, 4, 5];
    shuffle($cartas);
    print_r($cartas);
    echo "<br>";

    $a = [1, 2, 3];
    $b = [4, 5, 6];
    $c = array_merge($a, $b);
    print_r($c);
    echo "<br>";

    $estudiantes = array('Emilio', 'William', 'Dayana');
    $posicion = array_search("William", $estudiantes);
    echo $posicion;
    echo "<br>";

    $valores = array('paciencia', 'bondad', 'humildad');
    $clave = array_rand($valores);
    echo "Te ha tocado el valor: " . $valores[$clave];
    echo "<br>";

    $partes  = array_chunk($c, 2);
    print_r($partes);
    echo "<br>";

    $texto = "ingenieria";
    $arr2 = str_split($texto);
    print_r($arr2);
    echo "<br>";

    $repetidos = array(1, 2, 3, 3, 4, 5, 5);
    $unicos = array_unique($repetidos);
    print_r($unicos);
    echo "<br>";
    echo "<br>";
    echo "--------------------------------------------<br>";

    $arrphp = array(
        "nombres" => "Juan Carlos",
        "apellidos" =>"Arriola Sandoval",
        "carrera" => "Ingenieria",
        "Materia favorita" => "Mate 4"
    );

    /*$json = json_encode($arrphp);
    file_put_contents("json/expediente.json", $json);*/
    /*print_r($json);
    echo "<br>";
    $nueva = json_decode($json);
    print_r($nueva);*/

    #extraer desde archivo
    $obj = file_get_contents("json/expediente.json");
    $data = json_decode($obj, true);

    print_r($data);

?>