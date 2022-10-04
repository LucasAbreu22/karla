let xgTipo_consumivel;

$(function () {
    tipo_consumivel.grid()
    xgTipo_consumivel.queryOpen({ search: '' })

    $("#btnNovo").click(()=>{
        tipo_consumivel.habilitarInput()
    })

    $("#edt_tipo_consumivel").keydown((e)=>{
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

        tipo_consumivel.pesquisar()
    })

    $("#btnCancel").click(()=>{
        tipo_consumivel.desabilitarInput()
    })
});


var tipo_consumivel = (function () {

    let url = "tipo_consumivel/per.tipo_consumivel.php"
    let event = ''
    tipo_consumivel_info = ''

    function grid() {
        xgTipo_consumivel = new xGridV2.create({
            el: '#pnGridTipoCons',
            height: '200',
            width:'500',
            theme: 'x-clownV2',
            heightLine: 27,
            columns: {
                "Tipo Consumível": { dataField: 'tipo_item' },
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
                    dataField: ['tipo_consumivel'],
                    execute: (r) => {
                        let param = {}
                        param.MARCA = r.value

                        return axios.post(url, {
                            call: 'findMarca',
                            param: param
                        })
                            .then(rs => {
                                if (rs.data[0]) {
                                    xgMarca.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!')
                                    xgMarca.focusField(r.field);
                                    return false;
                                }
                            })
                    }
                }
            },
            onSelectLine: (r) => {
                tipo_consumivel_info = r
            },
            query: {
                execute: (r) => {
                    getTipoConsumivel(r.param.search, r.offset);
                }
            },
        });
    }

    function novo(){
        event = "novo"

        $("#edt_tipo_consumivel").val("")

        habilitarInput()

        $("#edt_tipo_consumivel").focus()
    }

    function edit(){
        event = "editar"

        habilitarInput()
        $("#edt_tipo_consumivel").focus()
    }

    function deletar(){

        axios.post(url, {
            call: 'delTipoConsumivel',
            param: {
                    id_tipo_consumivel: tipo_consumivel_info.id_tipo_item,
                    id_login: usuario[0].id_login
                }

        }).then(rs => {
            if(rs.data === "REMOVIDO COM SUCESSO!"){
                xgTipo_consumivel.deleteLine()
                show(rs.data)
            }else{
                show("ERRO INTERNO "+ rs.data)
            }
        })
        
    }

    function salvar(){

        let tipo_consumivel = $("#edt_tipo_consumivel").val()

        if(tipo_consumivel === "" || tipo_consumivel === null || tipo_consumivel === undefined){
            show("Nome tipo consumível inválido!")
            return false
        }

        let id_tipo_consumivel = 0

        if(event === "editar"){
            id_tipo_consumivel = xgTipo_consumivel.dataSource().id_tipo_item
        }
        
        setTipoConsumivel(tipo_consumivel, id_tipo_consumivel)

    }

    function cancelar(){
        desabilitarInput()
    }

    function pesquisar(){
        let search = $("#edtPesq").val().trim()
        xgTipo_consumivel.queryOpen({ search: search })
    }

    function setTipoConsumivel(tipo_consumivel, id_tipo_consumivel){

        axios.post(url, {
            call: 'setTipoConsumivel',
            param: {
                    id_tipo_consumivel: id_tipo_consumivel,
                    tipo_consumivel: tipo_consumivel, 
                    id_login: usuario[0].id_login
                }

        }).then(rs => {
        console.log('rs :', rs.data[0]);

            let param 
            if(event === 'novo'){
                param = {
                    id_tipo_item: rs.data[0].id_tipo_item,
                    tipo_item: tipo_consumivel,
                }
                console.log('param :', param);

                xgTipo_consumivel.insertLine(param)
            }
            if(event === 'editar'){

                xgTipo_consumivel.dataSource("tipo_item", tipo_consumivel)

            }

            xgTipo_consumivel.focus();

        });
    }


    function getTipoConsumivel(search, offset){
        axios.post('login/login.php', {
            call: 'session',
    
        }).then(r => {
    
            if (r.data.semSession) {
                console.error("ERRO COM RESGATAR LOGIN!")
                return false
            }
    
            axios.post(url,{
                call: 'getTipoConsumivel',
                param: {
                        search: search, 
                        offset: offset,
                        id_login: r.data[0].id_login
                    },
            }).then(rs=>{
                xgTipo_consumivel.querySourceAdd(rs.data);
    
                if (rs.data[0])
                    xgTipo_consumivel.focus();
            })
        })
    
    }

    async function habilitarInput(){
        $("#edt_tipo_consumivel").removeAttr("disabled")
        xgTipo_consumivel.disable()
    }

    function desabilitarInput(){
        $("#edt_tipo_consumivel").attr("disabled", true)
        xgTipo_consumivel.enable()
    }

    return {
        grid: grid,
        habilitarInput: habilitarInput,
        desabilitarInput: desabilitarInput,
        pesquisar: pesquisar,
    }
})();
