 var user_id = localStorage.getItem("user_id"); 


//FUNCIONES
    
    $(document).ready(function() {
        $("body").css("display", "none");
  	    $("body").fadeIn('slow');
    
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
    	
		//var paresVarValor = leerGET();
		//User_id = paresVarValor['User_id'];
    }
    
    function bandas(){
        linkLocation = "bandas.html";
        $("body").fadeOut('slow',redirectPage);     	
	}
	
	function configuracion(){
		linkLocation = "configuracion.html";
        $("body").fadeOut('slow',redirectPage);     	
	}
	
	function conciertos(){
		linkLocation = "conciertos.html?Valor=0";
        $("body").fadeOut('slow',redirectPage);     	
	}
	
	function diario(){
		linkLocation = "diario.html";
        $("body").fadeOut('slow',redirectPage);     	
	}
	
    function redirectPage() {
		window.location = linkLocation;
	}