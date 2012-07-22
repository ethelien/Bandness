//VARIABLES

var $resultados;
var $banda;
var $id;
var var_nombre;
var var_ciudad;
var var_sello;
var var_estilo="";
var var_componentes="";
var cabecera="";
var dia;
var mes;
var id_evento;

//FUNCIONES


$(document).ready(function() {
	$("body").css("display", "none");
	$("body").fadeIn('slow');

	document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    
});


function onBodyLoad() {
	
	var paresVarValor = leerGET();
	id = paresVarValor['Banda'];
	obtenerInfo();
}

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


function obtenerInfo() {
			    
    $.ajax({
    	url: 'http://192.168.1.102/banda_informacion.php?banda='+id,
	        dataType: 'jsonp',
	        jsonp: 'jsoncallback',
	        type:'get',
	        timeout: 5000,
	        success: function(data/*, status*/){
            $.each(data, function(i,item){
            	if(i==0){
            		var_nombre = item.name;
                	var_ciudad = item.location;
                	var_sello = item.label; 
                	cabecera="http://test.bandness.com/uploads/images/band/header/"+item.header;   	
            	}
            	
            	if(i==1){
            		var_estilo+=item.Estilo; 		            
            	}

				if(i==2){
	            	var_componentes+=item.Componentes;
	            }
            });
            obtenerEventos();
        },
        error: function(){
        }
    });
}

function obtenerEventos() {
    
$.ajax({
	url: 'http://192.168.1.102/banda_evento.php?banda='+id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        type:'get',
        timeout: 5000,
        success: function(data/*, status*/){
            $.each(data, function(i,item){
        		dia = item.Day;
            	mes = item.Month;
            	id_evento = item.id;
            	
            	añadireventos(dia,mes,id_evento)  						
            });
            mostrardatos();
        },
        error: function(){
        }
    });
}

function añadireventos(dia, mes,id_evento){
	var TROW = document.getElementById("prox_eventos");
    var newCell = TROW.insertCell(TROW.cells.length);
    newCell.innerHTML = "<button id="+id_evento+" class='fecha_evento'>"
    newCell.onclick=function(){Cargar_Evento(id_evento);}
    	  		    
	var id_mes = mes+"_"+id_evento;
	var id_dia = dia+"_"+id_evento;

	var texto = document.getElementById(id_evento);
	var h4 = document.createElement("h4");
	h4.innerHTML = "<span id="+id_mes+" type='text' name='mes'></span><BR><span id="+id_dia+" type='text' name='dia' style='font-size: x-large'></span>"	
	texto.appendChild(h4);	
		    
   	$('#'+id_mes).html(mes);
	$('#'+id_dia).html(dia);
					
}

 function continuar(){
	event.preventDefault();
	window.location = "bandas.html?tipo=ALL";
	$("body").fadeOut('slow',redirectPage);     
}		

function zonaprivada(){
	window.location = "login.html";		
}

function Cargar_Evento(x){
	$("body").fadeOut('slow');     	
	window.location = "evento.html?Evento="+x;		
}

function mostrardatos() {
    $('#BANDA_imagen').prop('src',cabecera);		    
    $('#BANDA_nombre').html(var_nombre);
    $('#BANDA_ciudad').html(var_ciudad);
    $('#BANDA_estilo').html(var_estilo);
    $('#BANDA_sello').html(var_sello);
    $('#BANDA_componentes').html(var_componentes);

    $("#base").fadeIn('1000');
}
