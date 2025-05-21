$(document).ready(function () {
    $("#btn_login").click(function () { 
        iniciar_sesion();
    });
});

function iniciar_sesion(){
    $.ajax({
            url: 'app/models/login.php', //el modelo que recibirá la información
            type: 'POST', //tipo de envio 
            dataType: 'Json', //el tipo de dato que se espera recibir del servidor
            data: {
                usuario: $("#user").val(),
                clave: $("#pass").val()
            }, //los datos que se enviarán al servidor
        })
        .done(function(response){ //funcion que se ejecuta si la respuesta es exitosa
            if(response.success){ //codigo a ejecurae si el modelo envio una respuesta exitosa
                location.href=response.url;
            }else{ //su success es false o no está presente
                Swal.fire({
                title: "Atención",
                text: response.error,
                icon: "info"
            });
            }
        }).fail(function(){ //funcion que se ejecuta si la petición falla
            console.log("falla");
        });
}