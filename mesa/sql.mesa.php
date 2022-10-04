<?php
include_once '../class/class.connect.php';
include_once '../class/prepareSql.php';
class SqlMesa
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoSql::getConectar();
  }


  function exemplo()
  {
    $sql = 'select * from produtos';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getCode($param)
  {
    $sql = "SELECT 
            keyAC 
            FROM login
            WHERE id_login = $param";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getMesa($param)
  {
    extract($param);

    $sql = "SELECT
            * 
            FROM mesa
            WHERE mesa LIKE '%$search%'
            AND id_login = $id_login
            LIMIT 10 OFFSET $offset ";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function findMesa($param)
  {

    extract($param);

    $sql = "SELECT
            * 
            FROM mesa
            WHERE mesa LIKE '%$param%'
            AND id_login = $id_login";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function insertMesa($param)
  {

    extract($param);

    $sql = "INSERT INTO mesa (id_login, mesa)
            VALUES ($id_login, '$mesa')";

    $query = $this->db->prepare($sql);
    
    if($query->execute()){

      $sql = "SELECT 
              max(id_mesa) as id_mesa
              FROM mesa
              WHERE id_login = $id_login";
      
      $query = $this->db->prepare($sql);
      $query->execute();
      
      return $query->fetchAll(PDO::FETCH_OBJ); 
    } 
  }

    function updateMesa($param){

      extract($param);

      $sql = "UPDATE mesa
              SET mesa = '$mesa'
              WHERE id_mesa = $id_mesa
              AND id_login = $id_login";

      $query = $this->db->prepare($sql);
      
      if($query->execute()){
        return "ALTERADO COM SUCESSO!";
      }else {
        return "ERRO SQL[01]";
      }

    }

    function delMesa($param){
       extract($param);

       $sql = "DELETE FROM mesa
               WHERE id_mesa = $id_mesa
               AND id_login = $id_login";

      $query = $this->db->prepare($sql);

      if($query->execute()){
        return "DELETADO COM SUCESSO!";
      }else{
        return "ERRO SQL[02]";
      }
    }
  
  
}