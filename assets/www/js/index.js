/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//Variables globales
//
var $resultados;


function obtenerDatos() {
    valor=document.getElementById("dato").value;
    var valor ='paco';
    alert(valor);
    
    resultados = $('#resultados');
          
    $.ajax({
        url: 'http://158.42.46.225/buscador.php?busqueda='+valor,
        //url: '../html/bandee.php',
        //NO SE PUEDE LANZAR A UN LOCALHOST, TIENE QUE SER A UN WEB-SERVER (HTTP)
        //url: 'http://158.42.143.175/bandee.php', IP ASIGNADA X LA UPV
        //url: 'http://158.42.141.22/bandee.php',
        //url: '///android_asset/www/html/bandee.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){
            $.each(data, function(i,item){
                alert(item.id);
                //$resultados = item.id;
                var landmark = '<h1>'+item.id+'</h1>';
                resultados.append(landmark);
                //$.mobile.pageLoading(true);
                mostrardatos();
            });
        },
        error: function(){
            resultados.text('There was an error loading the data.');
        }
    });
}
		    
function mostrardatos() {
    //window.open("https://www.gafasonline.es");
    alert("Hola2");
    $('#resultados').html($resultados);
    $.mobile.pageLoading(true);
}