$(document).ready(function () {
    listar_vehiculos();
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

            $("#tb_vehiculos").html($tabla_resultado);
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