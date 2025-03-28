$(document).ready(function () {
    $("#btn_guardar").click(function(){
        guardar_registro();
    });
});

function guardar_registro(){
    $("#div_respuesta").removeClass('alert-danger').removeClass('alert-success');
    if(
        $("#nombres").val() != "" &&
        $("#apellidos").val() != "" &&
        $("#fecha_nacimiento").val() != "" &&
        $("#profesion").val() != ""
    ){
        let registro = {
            nombres: $("#nombres").val(),
            apellidos: $("#apellidos").val(),
            profesion: $("#profesion").val(),
            fecha_nacimiento: $("#fecha_nacimiento").val()
        };
    
        /*console.log(`Hola, mi nombre es ${registro.nombres} ${registro.apellidos}. Nací ${registro.fecha_nacimiento} y mi profesión es ${registro.profesion}`);*/
        $("#div_respuesta").show()
        .addClass('alert-success')
        .html(`Hola, mi nombre es ${registro.nombres} ${registro.apellidos}. Nací ${registro.fecha_nacimiento} y mi profesión es ${registro.profesion}`);
    }else{
        //alert("Debe rellenar todos los campos");
        $("#div_respuesta").show()
        .addClass('alert-danger')
        .html("Debe rellenar todos los campos");
    }
}