//VARIABLES

var var_nombre;
var var_description;
var var_fecha;
var var_dia;
var var_mes;
var var_precio;
var var_sala;
var var_location;
var var_longitude;
var var_latitude;
var var_asistentes;
var var_conf="";

//FUNCIONES

$(document).ready(function() {
    $("body").css("display", "none");
    $("body").fadeIn('slow');

    document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    
});
    
function leerGET(){
    var cadGET = location.search.substr(1,location.search.length);
	var arrGET = cadGET.split("&");
	var asocGET = new Array();
	var variable = "";
	var valor = "";
	for(i=0;i<arrGET.length;i++){
		 var aux = arrGET[i].split("=");
		 variable = aux[0];
		 valor = aux[1];
 		asocGET[variable] = valor;
	}
 return asocGET;
} 


function onBodyLoad() {
	
	var paresVarValor = leerGET();
	User_id = paresVarValor['User'];
	Evento = paresVarValor['Evento'];
	//User_id=123;
	
	if(User_id==undefined){
		var asistencia= document.getElementById("confirmar");
		asistencia.onclick=function(){registrate();}
	}
	
	else{
	    document.getElementById('zona').style.display="none";
	}

	obtenerDatos();
	ComprobarAsistencia();
	
} 
  
function cambiar(){
 
    if(document.getElementById('confirmar').getAttribute("class") == 'por_confirmar'){
    	document.getElementById('confirmar').setAttribute("class","confirmado");
        $('#quantity').val(parseInt($('#quantity').val()) + 1); 	
        ConfirmarAsistencia(0); 
    }
    
    else{
    	document.getElementById('confirmar').setAttribute("class","por_confirmar");    	
        $('#quantity').val(parseInt($('#quantity').val()) - 1);
        ConfirmarAsistencia(User_id);        	  
    }
    
}
    
function obtenerDatos() {
    
    $.ajax({
        url: 'http://192.168.1.102/evento_info.php?evento='+Evento,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        type:'get',
        timeout: 5000,
        success: function(data/*, status*/){
            $.each(data, function(i,item){
               var_nombre = item.name;
               var_description = item.description;
               
               var_fecha = item.date_init;  
               var_dia = item.Day;  
               var_mes = item.Month;  
                
               var_precio = item.price;    
               var_sala = item.venue;
               var_location = item.location;
               var_latitude = item.latitude;
               var_longitude = item.longitude
               var_asistentes = item.cuenta;               

            });
            mostrardatos();
        },
        error: function(){
        }
    });
}

function ComprobarAsistencia() {
    
    $.ajax({
        url: 'http://192.168.1.102/bandee_asistencia_evento.php?evento='+Evento+'&user='+User_id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        type:'get',
        timeout: 5000,
        success: function(data/*, status*/){
                $.each(data, function(i,item){
                   var_conf = "TRUE";       
                });
                
                if(var_conf=="TRUE")
                	document.getElementById('confirmar').setAttribute("class","confirmado");
                	
                else
                	document.getElementById('confirmar').setAttribute("class","por_confirmar");         
                
            },
            error: function(){

            }
        });
    }
    
   function ConfirmarAsistencia(i) {		
        
        $.ajax({
            url: 'http://192.168.1.102/evento_confirmar_asistencia.php?user_id='+User_id+'&event_id='+Evento+'&valor='+i,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data){

            }, 
            error: function(){

            }
        });
    }
    
    function mostrardatos() {
        $('#EVENTO_mes').html(var_mes);
        $('#EVENTO_dia').html(var_dia);
        $('#EVENTO_nombre').html(var_nombre);
		$('#EVENTO_hora').html(var_fecha);
		$('#EVENTO_sala').html(var_sala);
		$('#EVENTO_lugar').html(var_location);
		$('#EVENTO_descripcion').html(var_description);
		$('#EVENTO_precio').html(var_precio + ' €');
		$('#quantity').val(var_asistentes);
		
		$("#base").fadeIn('fast');
    }
    
	function zonaprivada(){
		event.preventDefault();
    	window.location  = "login.html";
    	$("body").fadeOut('slow',redirectPage);     
	}
	
	function continuar(){
    	event.preventDefault();
    	window.location = "bandas.html";
    	$("body").fadeOut('slow',redirectPage);     
	}	
	
	function verMapa(){
		window.location = 'https://maps.google.com/maps?q='+var_latitude+',+'+var_longitude+'&iwloc=A&hl=es';
	}
	
	function registrate(){
		alert("Debes registrarte para esto, dale caña!");
	}
	