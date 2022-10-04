let usuario;
const login = new Login();

$(function () {

    $('.real').maskMoney({ thousands: '.', decimal: ',', allowZero: true });
    $('.date').mask('00/00/0000');
    $('.numeroNota').mask('000.000.000');
    $('.CPF').mask('999.999.999-99');
    $('.chave').mask('0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000');
    $('.CNPJ').mask('99.999.999/9999-99');
    $('.CEP').mask('00.000-000');
    $('.inteiro').maskMoney({ thousands: '.', decimal: ',', precision: 0, allowZero: true });

    $('.back').click(()=>{
        window.location = "/karla/index.php?p=home"
    })

    $('.pnMenu a').click(function () {
        pnMenuToggle();
    });


    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            if ($('.pnMenu').hasClass('pnMenuToggle'))
                pnMenuToggle();

            if ($('.pnUser').hasClass('pnUserToggle'))
                pnUserToggle();
        }
    });

    $('#pnTitulo').html($('#pnPrincipal title').html());


    $('.btnSair').click(function () {
        login.sair()
    })


});

function pnNotifyToggle() {
    $('.pnNotify').toggleClass('pnNotifyToggle');
}

function pnMenuToggle() {
    $('.pnMenu').toggleClass('pnMenuToggle');
    return false;
}
function pnUserToggle() {
    $('.pnUser').toggleClass('pnUserToggle');
    if ($('.viewPhoto').hasClass('viewPhotoBig'))
        pnViewPhoto();
    return false;
}

function Login() {

    this.session = function () {

        axios.post('login/login.php', {
            call: 'session',

        }).then(r => {

            if (r.data.semSession) {
                usuario = '';
                // pnLogin.open()
                window.location.href = "login";
                return false
            }

            usuario = r.data
            //$('#spUser').html(r.data.NOME.split(' ')[0])
        })
    }

    this.sair = function () {

        axios.post(`login/login.php`, {
            call: 'sair',

        }).then(r => {
            login.session()

        })

    };

}

login.session();