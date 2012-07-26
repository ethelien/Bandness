//VARIABLES

var Valor;
var name;
var id;
var lugar;
var fecha;
var Mes;
var mes_evento;
var cabecera="";
var landmark;
var id_amigo;
var img_amigo;
var par=0;
var usuario_conciertos;
var user_id = localStorage.getItem("user_id");

   
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
	//User_id = paresVarValor['User_id'];
	User_amigo = paresVarValor['User_amigo'];		
	Valor = paresVarValor['Valor'];
	Mes = paresVarValor['Mes'];
	
	if(Valor=='0'){
		usuario_conciertos=user_id;
		obtenerAmigos();
	}
		
	else if(Valor=='1'){
		usuario_conciertos=User_amigo;
		div = document.getElementById('amigos');
		div.style.display = "none";	
	}
	
	else if(Valor=='2'){
		usuario_conciertos=user_id;
		div = document.getElementById('amigos');
		div.style.display = "none";		
	}
	
	obtenerConciertos();	
	
}

function addNewRow()
{
  // obtenemos acceso a la tabla por su ID
  var TABLE = document.getElementById("conciertos");
  // obtenemos acceso a la fila maestra por su ID
  var TROW = document.getElementById("fila");
  // tomamos la celda
  var content = TROW.getElementsByTagName("td");
  // creamos una nueva fila
  var newRow = TABLE.insertRow(-1);
  newRow.className = TROW.attributes['class'].value;
  
  if(par=='1'){
  	newRow.style.background = "#D0D0D0";
  	par--;
  }
  
  else
  	par++; 	
  	
  // creamos una nueva celda
  var newCell = newRow.insertCell(newRow.cells.length);
  var newCell2 = newRow.insertCell(newRow.cells.length);

  newCell.className = 'nombres';
  newCell2.className = 'logo';
 
  // y lo asignamos a la celda
  newCell.innerHTML = landmark;
  newCell2.innerHTML = "<img src="+cabecera+" height='64' width='64'>"
  	  
  newRow.idName=id;
  newRow.onclick=function(){Cargar_Evento(newRow.idName);}

}

function añadiramigos(id, photo){
	var TROW = document.getElementById("fila_amigos");
    var newCell = TROW.insertCell(TROW.cells.length);
    newCell.innerHTML = "<img src="+photo+" id="+id+" class='amigos_img'>"
    newCell.onclick=function(){Cargar_Conciertos_amigos(id,user_id);}	    	  								
}

function Cargar_Evento(x){
    $("body").fadeOut('slow');     	
	window.location = "evento.html?Evento="+x;		
}

function Cargar_Conciertos_amigos(x){
    $("body").fadeOut('slow');     	
	window.location = "conciertos.html?Valor=1&User_amigo="+x;		
}

    function obtenerConciertos() {
        $.ajax({
            url: 'http://158.42.77.115/eventos_usuario.php?usuario='+usuario_conciertos,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
        	$.each(data, function(i,item){
                 
	            name=item.name;
	            fecha=item.date_init;
	            lugar=item.venue;
	            landmark = '<h2>'+item.name+'<BR>'+item.date_init+'<BR>'+item.venue+'</h2>';
	            id=item.id;
	            mes_evento=item.Month;
	            cabecera="http://test.bandness.com/uploads/images/posters/"+item.picture;  
	
				if(Mes!=null){
					if(Mes==mes_evento){
						addNewRow();                                         
					}
				}
				
				else
	            	addNewRow();                                         
            });
        },
        error: function(){
        }
	});
}

function obtenerAmigos() {

	$.ajax({
	    url: 'http://158.42.77.115/usuario_amigos.php?usuario='+user_id,
	    dataType: 'jsonp',
	    jsonp: 'jsoncallback',
	    type:'get',
	    timeout: 5000,
	    success: function(data/*, status*/){
	        $.each(data, function(i,item){
	            id_amigo=item.item2;
	            img_amigo="http://test.bandness.com/uploads/images/profile/"+item.photo;  
	
	            añadiramigos(id_amigo,img_amigo);                                         
	        });
	    },
	    error: function(){
	    }
	});
}
    