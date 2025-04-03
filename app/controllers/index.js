$(document).ready(function () {
    $("#btn_guardar").click(function(){
        guardar_registro();
    });
});

function guardar_registro(){
    $("#div_respuesta").removeClass('alert-danger').removeClass('alert-success');
    if(
        true
    ){
        let registro = {
            nombres: $("#nombres").val(),
            apellidos: $("#apellidos").val(),
            profesion: $("#profesion").val(),
            fecha_nacimiento: $("#fecha_nacimiento").val()
        };

        $.ajax({
            url: 'app/models/datos.php', //el modelo que recibirá la información
            type: 'POST', //tipo de envio 
            dataType: 'Json', //el tipo de dato que se espera recibir del servidor
            data: registro, //los datos que se enviarán al servidor
        })
        .done(function(response){ //funcion que se ejecuta si la respuesta es exitosa
            if(response.success){ //codigo a ejecurae si el modelo envio una respuesta exitosa
                $("#div_respuesta").show()
                .addClass('alert-success')
                .html(response.msg);
            }else{ //su success es false o no está presente
                $("#div_respuesta").show()
                .addClass('alert-danger')
                .html(response.error);
            }
        }).fail(function(){ //funcion que se ejecuta si la petición falla
            console.log("falla");
        });
    }else{
        //alert("Debe rellenar todos los campos");
        $("#div_respuesta").show()
        .addClass('alert-danger')
        .html("Debe rellenar todos los campos");
    }
}