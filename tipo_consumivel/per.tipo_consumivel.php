<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.tipo_consumivel.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Tipo_consumivel {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlTipo_consumivel();
    }

    function getTipoConsumivel($param) {

        $call = $this->sql->getTipoConsumivel($param);
        echo json_encode($call);
    }

    function setTipoConsumivel($param) {

        if($param['id_tipo_consumivel'] === 0){
            $call = $this->sql->insertTipoConsumivel($param);
        }
        else{
            $call = $this->sql->updateTipoConsumivel($param);
        }
        echo json_encode($call);
    }

    function delTipoConsumivel($param) {

        $call = $this->sql->delTipoConsumivel($param);
        echo json_encode($call);
    }

}

$class = new Tipo_consumivel();
$class->$call(@$param);

