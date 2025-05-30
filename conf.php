<?php

define('MODULO_DEFECTO', 'login');
define('LAYOUT_LOGIN', 'login.php');
define('LAYOUT_DESKTOP', 'desktop.php');
define('MODULO_PATH',  realpath('app/views'));
define('LAYOUT_PAHT', realpath('app/templates'));

$id_rol = 2;

$conf['error'] = array(
    'archivo' => '404.php',
    'layout' => LAYOUT_DESKTOP
);

$conf['login'] = array(
    'archivo' => 'login.html',
    'layout' => LAYOUT_LOGIN
);

$conf['vehiculos'] = array(
    'archivo' => 'vehiculos.html',
    'layout' => LAYOUT_DESKTOP
);

$conf['selects'] = array(
    'archivo' => 'seleccion.php',
    'layout' => LAYOUT_DESKTOP
);

$conf['inicio'] = array(
    'archivo' => 'home.html',
    'layout' => LAYOUT_DESKTOP
);


$conf['vehiculos-dos'] = array(
    'archivo' => 'vehiculos2.html',
    'layout' => LAYOUT_DESKTOP
);
