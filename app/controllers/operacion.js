$(function () {
    $("#btn_operar").click(function () { 
        enviar_server();
    });
});

function enviar_server(){
    //captura de datos
    let datos = {
        n1: $("#numero_uno").val(),
        n2: $("#numero_dos").val(),
        tipo_operacion: $("#tipo_operacion").val()
    }

    $.ajax({
        url: 'app/models/operar.php',
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
            $("#frm_operar").trigger('reset');
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