<?php
include_once '../class/class.connect.php';
include_once '../class/prepareSql.php';

class SqlTipo_consumivel
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoSql::getConectar();
  }


  function exemplo($param)
  {
    $sql = "select * from produtos";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }
  function getTipoConsumivel($param)
  {
    extract($param);

    $sql = "SELECT
            * 
            FROM tipo_item
            WHERE tipo_item LIKE '%$search%'
            AND id_login = $id_login
            LIMIT 10 OFFSET $offset ";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }
  
  function insertTipoConsumivel($param)
  {
    extract($param);

    $sql = "INSERT INTO tipo_item (id_login, tipo_item)
            VALUES ($id_login, '$tipo_consumivel')";
  
    $query = $this->db->prepare($sql);

    if($query->execute()){

      $sql = "SELECT MAX(id_tipo_item) as id_tipo_item
              FROM tipo_item
              WHERE id_login = $id_login";

      $query = $this->db->prepare($sql);

      if($query->execute()){
        return $query->fetchAll(PDO::FETCH_OBJ); 
      } else {
        return "ERRO SQL[03]";
      }
    } else{
      return "ERRO SQL[02]";
    }

  }

  function updateTipoConsumivel($param)
  {
    extract($param);

    $sql = "UPDATE tipo_item
            SET tipo_item = '$tipo_consumivel'
            WHERE id_tipo_item = $id_tipo_consumivel
            AND id_login = $id_login";

    $query = $this->db->prepare($sql);

    if($query->execute()){
      return "INFORMAÇÃO ALTERADA COM SUCESSO!";
    }else{
      return "ERRO SQL[04]"; 
    } 

  }

  function delTipoConsumivel($param)
  {
    extract($param);

    $sql = "DELETE FROM tipo_item
            WHERE id_tipo_item = $id_tipo_consumivel
            AND id_login = $id_login";

    $query = $this->db->prepare($sql);

    if($query->execute()){
      return "REMOVIDO COM SUCESSO!";
    }else{
      return "ERRO SQL[05]"; 
    } 

  }
}