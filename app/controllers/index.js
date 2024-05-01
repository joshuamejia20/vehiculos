$(document).ready(function () {
    listar_vehiculos();

    $("#btn_guardar_car").click(function () { 
        guardar_vehiculo();
    });

    $('#mdl_registro_car').on('hidden.bs.modal', function (event) {
        $("#frm_registro_car").trigger('reset');
        $("#id_no_normalizada").val("");
    });

    $("#tabla_vehiculos").on('click','.editar-vehiculo', function (){
        let id_no_normalizada = $(this).attr('data-id');

        obtener_vehiculo(id_no_normalizada);
    });

    $("#tabla_vehiculos").on('click','.eliminar-vehiculo', function (){
        let id_no_normalizada = $(this).attr('data-id');

        eliminar_vehiculo(id_no_normalizada);
    });

    $("#btn_nuevo_car").click(function () { 
        $("#mdl_title_registro").html('<i class="fas fa-plus"></i> Registrar nuevo vehiculo');
        $("#btn_guardar_car").addClass('btn-success').removeClass('btn-warning').html('<i class="fas fa-save"></i> Guardar');
    });
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
                    '<td>'+
                        '<button type="button" title="Editar" class="btn btn-warning editar-vehiculo" data-id="'+response.resultado[i].id_no_normalizada+'">'+
                        '<i class="fas fa-edit"></i>'+
                        '</button>'+
                        '&emsp;<button type="button" title="Eliminar" class="btn btn-danger eliminar-vehiculo" data-id="'+response.resultado[i].id_no_normalizada+'">'+
                        '<i class="fas fa-trash"></i>'+
                        '</button>'+
                    '</td>'+
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

function guardar_vehiculo(){
    let datos = $("#frm_registro_car").serialize();
    $.ajax({
        url: 'app/models/vehiculos/registrar.php', //hacia donde irá la solicitud (ruta)
        type: 'POST', //el metodo http a utilizar
        dataType: 'json', //tipo de datos que se espera recibir del servidor
        data: {
            datos: datos
        }
    }) // datos enviados al servidor
    .done(function (response){
        if(response.success){
            listar_vehiculos();
            $("#mdl_registro_car").modal('hide');
            Swal.fire({
                title: "<strong>Éxito</strong>",
                icon: "success",
                html: response.msg,
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
}

function obtener_vehiculo(id_no_normalizada){
    $.ajax({
        url: 'app/models/vehiculos/obtener.php', //hacia donde irá la solicitud (ruta)
        type: 'POST', //el metodo http a utilizar
        dataType: 'json', //tipo de datos que se espera recibir del servidor
        data: {
            id_no_normalizada: id_no_normalizada
        }
    }) // datos enviados al servidor
    .done(function (response){
        if(response.success){
            $("#mdl_title_registro").html('<i class="fas fa-edit"></i> Actualizar vehiculo');
            $("#btn_guardar_car").removeClass('btn-success').addClass('btn-warning').html('<i class="fas fa-edit"></i> Actualizar');
            let valores = response.resultado[0];
            $("#id_no_normalizada").val(valores.id_no_normalizada);
            $("#marca").val(valores.marca);
            $("#modelo").val(valores.modelo);
            $("#fecha_presentacion").val(valores.fecha_presentacion);
            $("#tipo_combustible").val(valores.tipo_combustible);
            $("#tipo_vehiculo").val(valores.tipo_vehiculo);
            $("#tipo_transmision").val(valores.tipo_transmision);
            $("#color").val(valores.color);
            $("#numero_puertas").val(valores.numero_puertas);
            $("#mdl_registro_car").modal('show');
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

function eliminar_vehiculo(id_no_normalizada){
    Swal.fire({
        title: "¿Desea eliminar este vehiculo?",
        text: "No podrá revertir ésta acción",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            $.ajax({
                url: 'app/models/vehiculos/eliminar.php', //hacia donde irá la solicitud (ruta)
                type: 'POST', //el metodo http a utilizar
                dataType: 'json', //tipo de datos que se espera recibir del servidor
                data: {
                    id_no_normalizada: id_no_normalizada
                }
            }) // datos enviados al servidor
            .done(function (response){
                if(response.success){
                    listar_vehiculos();
                    Swal.fire({
                        title: "<strong>Éxito</strong>",
                        icon: "success",
                        html: response.msg,
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
        }
    });
}