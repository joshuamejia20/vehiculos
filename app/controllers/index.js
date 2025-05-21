$(document).ready(function () {
    $("#btn_guardar").click(function(){
        guardar_registro();
    });

    $("#btn_cierre_sesion").click(function () { 
        cerrar_sesion();
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

function cerrar_sesion(){
    Swal.fire({
        title: "¿Está seguro que desea cerrar sesión?",
        text: "Será redirigido al login",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'app/models/logout.php',
                type: 'POST',
                dataType: 'Json',
                data: {},
                beforeSend: function(){
                    Swal.showLoading();
                    //$("#btn_operar").attr("disabled", true);
                },
                complete: function(){
                    /*setTimeout(() => {
                        $("#btn_operar").attr("disabled", false);
                    }, 3000);*/
                }
            })
            .done(function(response){ 
                Swal.close();
                if(response.success){
                    location.href = response.url;
                }else{
                    Swal.fire({
                        title: "Atención",
                        text: response.error,
                        icon: "info"
                    });
                }
            }).fail(function(){ 
                console.log("falla");
            });
        }
    });
}