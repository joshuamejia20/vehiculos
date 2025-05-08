$(document).ready(function () {
    listar_vehiculos();

    $("#btn_guardar_vehiculo").click(function () { 
        guardar_vehiculo();
    });

    $("#btn_update_vehiculo").click(function(){
        editar_vehiculo();
    });

    $('#mdl_vehiculo').on('hidden.bs.modal', function (event) {
        $("#frm_vehiculo").trigger('reset');
    });

    $("#tabla_vehiculos").on('click', '.update-car', function(){
        let id_vehiculo = $(this).attr('data-id');
        obtener_vehiculo(id_vehiculo);
    });

    $("#tabla_vehiculos").on('click', '.delete-car', function(){
        let id_vehiculo = $(this).attr('data-id');
        eliminar_vehiculo(id_vehiculo);
    });

    $("#nuevo_vehiculo").click(function () { 
        $("#btn_update_vehiculo").hide();
        $("#btn_guardar_vehiculo").show();
    });
});

function listar_vehiculos(){
    $.ajax({
        url: 'app/models/vehiculos/listar.php',
        type: 'POST',
        dataType: 'Json',
        data: {},
        beforeSend: function(){
            //Swal.showLoading();
            //$("#btn_operar").attr("disabled", true);
        },
        complete: function(){
            /*setTimeout(() => {
                $("#btn_operar").attr("disabled", false);
            }, 3000);*/
        }
    })
    .done(function(response){ 
        if(response.success){
            $("#tb_vehiculos").empty();
            //Swal.close();
            $tabla_resultado = "";
            for (let i = 0; i < response.resultado.length; i++) {
                let actions =
                    "<button type='button' title='Editar vehiculo' class='btn btn-warning update-car' data-id='"+response.resultado[i].id_no_normalizada+"'>"+
                        "<i class='fas fa-edit'></i> Editar"+
                    "</button>"+
                    "<button type='button' title='Eliminar vehiculo' class='ml-2 btn btn-danger delete-car' data-id='"+response.resultado[i].id_no_normalizada+"'>"+
                        "<i class='fas fa-trash'></i> Eliminar"+
                    "</button>";
                $tabla_resultado  += "<tr>"+
                    "<td>"+ (i+1)+"</td>"+
                    "<td>"+ response.resultado[i].marca +"</td>"+
                    "<td>"+ response.resultado[i].modelo +"</td>"+
                    "<td>"+ response.resultado[i].fecha +"</td>"+
                    "<td>"+ response.resultado[i].numero_puertas +"</td>"+
                    "<td>"+ response.resultado[i].color +"</td>"+
                    "<td>"+ response.resultado[i].tipo_gasolina +"</td>"+
                    "<td>"+ response.resultado[i].tipo_traccion +"</td>"+
                    "<td>"+ response.resultado[i].tipo_vehiculo +"</td>"+
                    //"<td>"+ response.resultado[i].id_no_normalizada +"</td>"+
                    "<td>" + actions + "</td>";
                "</tr>";
            }

            $("#tb_vehiculos").append($tabla_resultado);
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

function guardar_vehiculo(){
    let datos = {
        marca: $("#marca").val(),
        modelo: $("#modelo").val(),
        fecha: $("#fecha").val(),
        tipo_vehiculo: $("#tipo_vehiculo").val(),
        tipo_gasolina: $("#tipo_gasolina").val(),
        tipo_traccion: $("#tipo_traccion").val(),
        color: $("#color").val(),
        numero_puertas: $("#numero_puertas").val()
    }

    $.ajax({
        url: 'app/models/vehiculos/guardar.php',
        type: 'POST',
        dataType: 'Json',
        data: datos,
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
        if(response.success){
            //cierre de modal
            $("#mdl_vehiculo").modal('hide');
            //llamar a funcion que lista nuevamente
            listar_vehiculos();

            //mostrar mensaje de exito
            Swal.fire({
                title: "Éxito",
                text: response.msg,
                icon: "success"
            });
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

function editar_vehiculo(){
    let datos = {
        id_no_normalizada: $("#id_no_normalizada").val(),
        marca: $("#marca").val(),
        modelo: $("#modelo").val(),
        fecha: $("#fecha").val(),
        tipo_vehiculo: $("#tipo_vehiculo").val(),
        tipo_gasolina: $("#tipo_gasolina").val(),
        tipo_traccion: $("#tipo_traccion").val(),
        color: $("#color").val(),
        numero_puertas: $("#numero_puertas").val()
    }

    $.ajax({
        url: 'app/models/vehiculos/actualizar.php',
        type: 'POST',
        dataType: 'Json',
        data: datos,
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
        if(response.success){
            //cierre de modal
            $("#mdl_vehiculo").modal('hide');
            //llamar a funcion que lista nuevamente
            listar_vehiculos();

            //mostrar mensaje de exito
            Swal.fire({
                title: "Éxito",
                text: response.msg,
                icon: "success"
            });
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

function eliminar_vehiculo(id_vehiculo){
    Swal.fire({
        title: "¿Está seguro que desea eliminar éste vehiculo?",
        text: "Esta acción no se puede revertir",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'app/models/vehiculos/eliminar.php',
                type: 'POST',
                dataType: 'Json',
                data: {
                    id_no_normalizada: id_vehiculo
                },
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
                if(response.success){
                    listar_vehiculos();
        
                    //mostrar mensaje de exito
                    Swal.fire({
                        title: "Éxito",
                        text: response.msg,
                        icon: "success"
                    });
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

function obtener_vehiculo(id_vehiculo){
    $.ajax({
        url: 'app/models/vehiculos/obtener.php',
        type: 'POST',
        dataType: 'Json',
        data: {
            id_no_normalizada: id_vehiculo
        },
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
        if(response.success){
            Swal.close();
            $("#id_no_normalizada").val(response.resultado.id_no_normalizada);
            $("#marca").val(response.resultado.marca);
            $("#modelo").val(response.resultado.modelo);
            $("#fecha").val(response.resultado.fecha);
            $("#tipo_vehiculo").val(response.resultado.tipo_vehiculo);
            $("#tipo_gasolina").val(response.resultado.tipo_gasolina);
            $("#tipo_traccion").val(response.resultado.tipo_traccion);
            $("#color").val(response.resultado.color);
            $("#numero_puertas").val(response.resultado.numero_puertas);
            //cierre de modal
            $("#btn_update_vehiculo").show();
            $("#btn_guardar_vehiculo").hide();
            $("#mdl_vehiculo").modal('show');
            //llamar a funcion que lista nuevamente
            
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