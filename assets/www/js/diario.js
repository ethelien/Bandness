var par=0;
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var conciertos = ['0','0','0','0','0','0','0','0','0','0','0','0'];
var fecha=new Date();
var anyo=fecha.getFullYear();
var event_id;
var event_mes;
var event_year;

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
	User_id = paresVarValor['User_id'];
	$('#quantity').val(anyo);
	obtenerDiario();
}
	
function disminuir(){
    //Solo si el valor del campo es diferente de 0
    if ($('#quantity').val() != 0){
        $('#quantity').val(parseInt($('#quantity').val()) - 1);
		document.getElementById("diario").innerHTML = "";
		conciertos = ['0','0','0','0','0','0','0','0','0','0','0','0'];
		
		obtenerDiario();
		}
}

function aumentar(){
    //Aumentamos el valor del campo
    $('#quantity').val(parseInt($('#quantity').val()) + 1);
	
	document.getElementById("diario").innerHTML = "";
	conciertos = ['0','0','0','0','0','0','0','0','0','0','0','0'];
	
	obtenerDiario();
}


function addNewRow(){
  // obtenemos acceso a la tabla por su ID
  var TABLE = document.getElementById("diario");
  // obtenemos acceso a la fila maestra por su ID
  	  
  if(document.getElementById(event_mes)==null){

  	var newRow = TABLE.insertRow(-1);
    newRow.className = 'filas';
    newRow.onclick=function(){Cargar_Conciertos(event_mes);}    
    
    	  
    if(par=='1'){
  		newRow.style.background = "#D0D0D0";
  		par--;
 	 }
  
 	 else
  		par++;
  		
  	// creamos una nueva celda
  	var newCell = newRow.insertCell(newRow.cells.length);
  	newCell.id=event_mes;
  }
  	
  var celda = document.getElementById(event_mes);
  conciertos[event_mes-1]++;

  // y lo asignamos a la celda
  celda.innerHTML = "<h2>"+meses[event_mes-1]+" |  "+conciertos[event_mes-1]+" Conciertos</h2>";	  	  
}


function Cargar_Conciertos(x){
    $("body").fadeOut('slow');     	
	window.location = "conciertos.html?User_id="+User_id+"&Mes="+x+"&Valor=2";		
}


function obtenerDiario() {
    $.ajax({
        url: 'http://192.168.1.102/usuario_diario.php?usuario='+User_id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        type:'get',
        timeout: 5000,
        success: function(data/*, status*/){
            $.each(data, function(i,item){
                event_id=item.id;
                event_mes=item.Month;
                event_year=item.Year;     
                               
                if($('#quantity').val() == event_year)
                	addNewRow();
            });

        },
        error: function(){
            alert('no va');
        }
    });
}