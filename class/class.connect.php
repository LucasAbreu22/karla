<?php
class ConexaoSql
{

    public static function getConectar()
    {
        $host = "localhost";
        $db = "karla";
        $username = "root";
        $password = "";
        // Create connection
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8;", $username, $password);
            return $pdo;

        } catch (PDOException $pe) {
            die("Não foi possível se conectar ao banco de dados $db :" . $pe->getMessage());
        }
        /*
        try {
            $fp = @fsockopen($server, 3050, $errno, $errstr, (float) 1.1);

            if (!$fp) {
                return false;
            } else {
                $pdo = new PDO("sql:dbname=$server:$banco;charset=utf8;", "host", '');
                return $pdo;
            }
        } catch (PDOException $erro) {
            die('Servidor não está respondendo ' . $erro->getMessage());
        }*/
    }
}