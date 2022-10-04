<?php
$p = 'home.php';
if (!empty($_GET['p'])) {
    $p = $_GET['p'] . '.php';
}
?>

<!DOCTYPE html lang="pt-br">
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    <link rel="stylesheet" type="text/css" href="./css/main.css">
    <script src="js/jquery-2.2.1.min.js" type="text/javascript"></script>

    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>

    <script src="plugins/xGridV2/xGridV2.js" type="text/javascript"></script>
    <link rel="stylesheet" href="plugins/xGridV2/xGridV2.css" type="text/css" />

    <script src="plugins/xModal/xModal.js" type="text/javascript"></script>
    <link rel="stylesheet" href="plugins/xModal/xModal.css" type="text/css" />

    <script src="plugins/modais.js" type="text/javascript"></script>
    <script src="plugins/util.js" type="text/javascript"></script>

    <script src="plugins/xPrint/xPrint.js" type="text/javascript"></script>

    <script src="plugins/axios.min.js" type="text/javascript"></script>

    <script src="plugins/jquery.maskMoney.js" type="text/javascript"></script>
    <script src="plugins/jquery.mask.min.js" type="text/javascript"></script>

    <script src="plugins/xCalk/xCalk.js" type="text/javascript"></script>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <script src="js/index.js" type="text/javascript"></script>

    <!-- <link rel="stylesheet" href="login/login.css" type="text/css" /> -->


    <title>KARLA</title>


</head>
<?php require_once($p); ?>
<body>

</body>

</html>