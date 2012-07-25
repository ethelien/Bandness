//VARIABLES
var $Banda;
var $tipo;
var $estilo2;
var $estilo3;
var $name;
var $id;
var cabecera="";
var fecha;
var lugar;
var par=0;
var landmark;

//FUNCIONES

$(document).ready(function() {
    $("body").css("display", "none");

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
	Banda = paresVarValor['Banda'];
	tipo = paresVarValor['tipo'];
	estilo2 = paresVarValor['estilo2'];
	estilo3 = paresVarValor['estilo3'];

	obtenerDatos();
	$("body").fadeIn('slow');               
	
}

function addNewRow()
{
  // obtenemos acceso a la tabla por su ID
  var TABLE = document.getElementById("bandas");
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
  newRow.onclick=function(){Cargar_Banda(newRow.idName);}

}

function Cargar_Banda(x){
    $("body").fadeOut('slow');     	
	window.location = "banda.html?Banda="+x;		
}

function obtenerDatos() {
    
    $.ajax({
        url: 'http://192.168.1.101/localizacion.php?busqueda='+Banda+"&estilo2="+estilo2+"&estilo3="+estilo3+'&tipo='+tipo,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        type:'get',
        timeout: 5000,
        success: function(data/*, status*/){
            $.each(data, function(i,item){         
                name=item.name;
                id=item.id;
                cabecera="http://test.bandness.com/uploads/images/band/header/"+item.header;  
                lugar=item.venue;
                if(item.date_init!=0){
                	fecha=item.date_init;
                	landmark = '<h2>'+name+'</h2><BR><h2>'+fecha+'</h2><BR><h2>'+lugar+'</h2>';
                }
                
                else
               		landmark = '<h2>'+name+'</h2><BR>';
                
                addNewRow();                                         
            });
        },
        error: function(){
        }
    });
}


