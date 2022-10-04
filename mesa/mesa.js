let xgMesa

$(function () {
    mesas.grid()
    mesas.getKey()
    xgMesa.queryOpen({search: ''})

    $("#edt_mesa").keydown((e)=>{
        if(e.keyCode === 13){
            $(".btnSalvar").click()
        }

    })

    $("#edtPesq").keydown((e)=>{
        if(e.keyCode === 13){
            $("#btnPesq").click()
        }

    })

    $("#btnPesq").click(()=>{

        mesas.pesquisar()
    })

    $("#btnQrCode").click(()=>{
        mesas.baixarQRCODE()
    })
});


var mesas = (function () {

    let url = 'mesa/per.mesa.php'

    let event = ''
    let mesa_info = ''
    let key = ''

    function grid() {
        xgMesa = new xGridV2.create({
            el: '#pnGridMesa',
            height: '200',
            width:'500',
            theme: 'x-clownV2',
            heightLine: 27,
            columns: {
                "Mesa": { dataField: 'mesa' },
            },
            dblClick: async (ln) => {
                if (ln == false) return false;

                $(".btnEdt").click()

            },
            sideBySide: {
                el: "#pnFields",

                frame: {
                    el: "#pnButtons",
                    buttons: {
                        novo: {
                            html: "Novo",
                            class: "btnModel btnNovo",
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        edit: {
                            html: "Editar",
                            class: "btnModel btnEdt",
                            state: xGridV2.state.update,
                            click: edit,
                        },
                        deletar: {
                            html: "Deletar",
                            class: "btnModel btnDel",
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        save: {
                            html: "Salvar",
                            class: "btnModel btnSalvar",
                            state: xGridV2.state.save,
                            click: salvar,
                        },
                        cancelar: {
                            html: "Cancelar",
                            class: "btnModel",
                            state: xGridV2.state.cancel,
                            click: cancelar,
                        },
                    },
                },
                duplicity: {
                    dataField: ['mesa'],
                    execute: (r) => {
                        let param = {}
                        param = r.value

                        if(event === "editar") return false

                        return axios.post(url, {
                            call: 'findMesa',
                            param: {
                                param: param,
                                id_login: usuario[0].id_login,
                            }
                        })
                            .then(rs => {
                                if (rs.data[0]) {
                                    xgMesa.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!')
                                    xgMesa.focusField(r.field);
                                    return false;
                                }
                            })
                    }
                }
            },
            onSelectLine: (r) => {
                mesa_info = r
                gerarQRCode()
            },
            query: {
                execute: (r) => {
                    getMesas(r.param.search, r.offset);
                }
            },
        });
    }

    function getMesas(search, offset) {

        axios.post('login/login.php', {
            call: 'session',
    
        }).then(r => {
    
            if (r.data.semSession) {
                console.error("ERRO COM RESGATAR LOGIN!")
                return false
            }

            axios.post('mesa/per.mesa.php', {
                call: 'getmesa',
                param:{
                    search: search,
                    offset: offset,
                    id_login: r.data[0].id_login
                }
            }).then(rs => {
                xgMesa.querySourceAdd(rs.data);
    
                if (rs.data[0])
                    xgMesa.focus();
            })
        })
        
    }

    function pesquisar(){
        let edtPesq = $("#edtPesq").val()

        xgMesa.queryOpen({search : edtPesq})
    }

    function novo(){
        event = "novo"

        habilitarInput()

        $("#edt_mesa").val("")
        $("#edt_mesa").focus()
        
    }

    function edit(){
        event = "editar"

        habilitarInput()

        $("#edt_mesa").focus()
    }

    function deletar(){

        let id_mesa = mesa_info.id_mesa

        axios.post(url,{
            call: 'delMesa',
            param: {
                id_mesa: id_mesa,
                id_login: usuario[0].id_login
            }
        }).then(r =>{

            if(r.data === "DELETADO COM SUCESSO!") xgMesa.deleteLine()

            show(r.data)
        })
    }

    function salvar(){

        let mesa = $("#edt_mesa").val()

        if(mesa === "" || mesa === undefined || mesa === null){
            show("VALOR INVÁLIDO!")
            return false
        }

        let id_mesa = 0

        if(event === "editar") id_mesa = xgMesa.dataSource().id_mesa

        setMesa(mesa, id_mesa)
    }

    function cancelar(){

        desabilitarInput()
    }

    function getKey(){

        axios.post('login/login.php', {
            call: 'session',
    
        }).then(r => {

            if (r.data.semSession) {
                console.error("ERRO COM RESGATAR LOGIN!")
                return false
            }

            axios.post(url,{
                call: 'getCode',
                param: r.data[0].id_login
            }).then(r=>{
    
                key = r.data[0].keyAC
            })
        })
    
    }

    function gerarQRCode(){
        $('#qrcode').html('')

        var dominio = $(location).attr('origin')

        let infoQR = dominio + '/karla/cardapio    ' + key + ' ' + mesa_info.id_mesa

        qrcode =  new QRCode("qrcode", {
            text: infoQR,
            width: 250,
            height: 250,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        })
        
    }

    function baixarQRCODE(){
        
        let qr = $('#qrcode').html()
        $('#qrDownload').html(qr)
        $('#qrDownload').xPrint()
    }

    function setMesa(mesa, id_mesa){

        axios.post(url, {
            call: 'setMesa',
            param: {
                    id_mesa: id_mesa,
                    mesa: mesa, 
                    id_login: usuario[0].id_login
                }

        }).then(rs => {

            let param 
            if(event === 'novo'){
                param = {
                    id_mesa: rs.data[0].id_mesa,
                    mesa: mesa,
                }

                xgMesa.insertLine(param)
            }
            if(event === 'editar'){

                xgMesa.dataSource("mesa", mesa)

            }

            xgMesa.focus();

            desabilitarInput()

        });
    }

    async function habilitarInput(){
        $("#edt_mesa").removeAttr("disabled")
        $("#edt_mesa").focus()

        xgMesa.disable()
    }

    function desabilitarInput(){
        $("#edt_mesa").attr("disabled", true)
        xgMesa.enable()

        $("#edt_mesa").val(xgMesa.dataSource().mesa)
    }

    return {
        grid: grid,
        pesquisar: pesquisar,
        baixarQRCODE: baixarQRCODE,
        getKey: getKey,
    }
})();
