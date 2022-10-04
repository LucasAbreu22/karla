<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.mesa.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Mesa {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlMesa();
    }

    function exemplo($param) {
        $call = $this->sql->exemplo($param);
        echo json_encode($call);
    }
    
    function getCode($param) {
        $call = $this->sql->getCode($param);
        echo json_encode($call);
    }

    function getMesa($param) {
        $call = $this->sql->getMesa($param);
        echo json_encode($call);
    }

    function findMesa($param) {
        $call = $this->sql->findMesa($param);
        echo json_encode($call);
    }

    function setMesa($param){

        if($param['id_mesa'] === 0){
            $call = $this->sql->insertMesa($param);
        }else{
            $call = $this->sql->updateMesa($param);
        }

        echo json_encode($call);
    }

    function delMesa($param){

        $call = $this->sql->delMesa($param);
        echo json_encode($call);
    }

}

$class = new Mesa();
$class->$call(@$param);

