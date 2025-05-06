$(document).ready(function () {
    listar_vehiculos();

    $("#btn_guardar_vehiculo").click(function () { 
        guardar_vehiculo();
    });

    $('#mdl_vehiculo').on('hidden.bs.modal', function (event) {
        $("#frm_vehiculo").trigger('reset');
    });
});

function listar_vehiculos(){
    $.ajax({
        url: 'app/models/vehiculos/listar.php',
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
        if(response.success){
            $("#tb_vehiculos").empty();
            Swal.close();
            $tabla_resultado = "";
            for (let i = 0; i < response.resultado.length; i++) {
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
                    "<td>"+ response.resultado[i].id_no_normalizada +"</td>"+
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