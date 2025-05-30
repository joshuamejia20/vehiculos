$(document).ready(function () {
    listar_marca_normal();
    listar_marca_nueva();
});

function listar_marca_normal(){
    $.ajax({
        url: 'app/models/marca/listar.php',
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
            let opciones = '';
            for (let i = 0; i < response.resultado.length; i++) {
                opciones += '<option value="'+ response.resultado[i].id_marca+'">'+response.resultado[i].marca+'</option>';
            }
            $("#marca_normal").html(opciones);
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

function listar_marca_nueva(data){
    $("#marca_nueva").select2({
        placeholder: "Seleccione su marca",
        ajax: {
            url: "app/models/marca_nueva/listar.php",
            type: "POST",
            dataType: "Json",
            data: function(params){
                return {
                    query: params.term,
                    id_departamento: $("#marca_normal").val()
                };
            },
            delay: 250,
            processResults: function(data, page){
                console.log(data);
                return {
                    results: data.data
                }
            },
            cache: true
        },
        theme: "bootstrap4",
        allowClear: true,
        minimumInputLength: 0
    });
    $("#marca_nueva").val(null).trigger("change");
    if(data != undefined && data != null){
        var option = new Option(data.marca, data.id_marca, false, false);
        $("#marca_nueva").html(option);
        $("#marca_nueva").trigger("change");
    }
}