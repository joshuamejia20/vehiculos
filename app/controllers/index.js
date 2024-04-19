$(document).ready(function () {
    listar_vehiculos();
});

function listar_vehiculos(){
    $.ajax({
        url: 'app/models/vehiculos/listar.php', //hacia donde irá la solicitud (ruta)
        type: 'POST', //el metodo http a utilizar
        dataType: 'json', //tipo de datos que se espera recibir del servidor
        data: {}
    }) // datos enviados al servidor
    .done(function (response){
        if(response.success){
            let cuerpo = '';
            for (let i = 0; i < response.total; i++) {
                cuerpo +=
                '<tr>'+
                    '<td>'+(i+1)+'</td>'+
                    '<td>'+response.resultado[i].marca+'</td>'+
                    '<td>'+response.resultado[i].modelo+'</td>'+
                    '<td>'+response.resultado[i].fecha_presentacion+'</td>'+
                    '<td>'+response.resultado[i].tipo_combustible+'</td>'+
                    '<td>'+response.resultado[i].tipo_transmision+'</td>'+
                    '<td>'+response.resultado[i].tipo_vehiculo+'</td>'+
                    '<td>'+response.resultado[i].color+'</td>'+
                    '<td>'+response.resultado[i].numero_puertas+'</td>'+
                    '<td>'+response.resultado[i].id_no_normalizada+'</td>'
                '</tr>';
            }

            $("#tb_vehiculos").html(cuerpo);
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
}