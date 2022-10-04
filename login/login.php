<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

session_cache_limiter(1);
ob_start(); /* Evitando warning */
session_start();

include_once '../class/class.connect.php';
include_once '../class/prepareSql.php';

extract(json_decode(file_get_contents("php://input"), TRUE));


class Login
{

    public $db;

    function __construct()
    {
        $this->db = ConexaoSql::getConectar();
    }

    function setLogin($param)
    {
        extract($param);
        
        $tamanho = strlen($senha);
        $tamanho *= $tamanho;
        $tamanho *= 256;
        $senha = $senha.$tamanho;
        $cripto = crypt($senha, '$2a$08$Dq22f21epiAilymomyaoiuyaSDsd20f2l');
        
        $sql = "SELECT id_login, login
                FROM login
                WHERE login = '$login'
                AND senha = '$cripto'";
        
        $query = $this->db->prepare($sql);
        $query->execute();
        $login = $query->fetchAll(PDO::FETCH_OBJ);

      if (empty($login)) {
            echo '{"msg":"Senha ou login inválido"}';
            return false;
        }

        $_SESSION['karla'] = $login;

        echo json_encode($login);
        
    }

    function session()
    {
        if (@$_SESSION['karla'])
            echo json_encode($_SESSION['karla']);
        else
            echo '{"semSession":"falha"}';
    }

    function sair()
    {
        session_destroy();
        echo '{"msg":"login finalizado"}';
    }
}


$class = new Login();
$class->$call(@$param);