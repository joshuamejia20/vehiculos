$(document).ready(function () {
    $("#btn_enviar").click(()=>{
        guardar_json();
    });
});

function guardar_json(){
    $.ajax({
        url: 'app/models/prueba.php', //hacia donde irá la solicitud (ruta)
        type: 'POST', //el metodo http a utilizar
        dataType: 'json', //tipo de datos que se espera recibir del servidor
        data: {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            fecha: $("#fecha").val(),
            profesion: $("#profesion").val(),
            validez: true
        }
    }) // datos enviados al servidor
    .done(function (response){
        if(response.success){
            //console.log(response.contenido);
            Swal.fire({
                title: "<strong>Acción Exitosa</strong>",
                icon: "success",
                html: response.contenido,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }else{
            //console.error(response.error);
            Swal.fire({
                title: "<strong>Atención</strong>",
                icon: "info",
                html: response.error,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            });
        }
    })//si la respuesta es exitosa (comunicacion)
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error al realizar la solicitud: "+ textStatus, errorThrown);
    })
};