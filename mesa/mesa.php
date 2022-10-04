<script src="mesa/mesa.js" type="text/javascript"></script>
<script src="mesa/qrcode.min.js" type="text/javascript"></script>

<title>MESAS</title>
<body id="bgPrincipal">
    <div id="backgroundFuncs" class="bgTipoConsumivel">

    <i class="fas fa-chevron-left back"></i>
        <center>
            <div id="pnCodigoTela">MESAS</div>
        </center>
        <div id="pnFields">
            <label>Nome</label>
            <input type="text" id="edt_mesa" class="input" name="mesa" disabled>
            <br>
            <button id="btnQrCode" class="btnModel">BAIXAR QR CODE</button>
        </div>
        <br>
        <center>
            <div id="pnButtons">
                
            </div>
        </center>
        <div id="pnGridMesa"></div>

        <br>

        <input type="text" id="edtPesq" class="inputPesq">
        <button id="btnPesq" class="btnModel">Pesquisar</button>
            
    </div>


    <div id="qrcode" hidden></div>
    <div id="qrDownload" hidden></div>

    
</body>