/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//VARIABLES
 var linkLocation;
 var user_id = localStorage.getItem("user_id");
 var pass = localStorage.getItem("pass");

 //FUNCIONES   
    $(document).ready(function() {
        $("body").css("display", "none");
        
        $("input").click(function() {
        	$("#zona").css("display", "none");
    	});
    	
    	$("input").blur(function() {
        	$("#zona").css("display", "inline");
    	});
         
        document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    
    })
   
    function onBodyLoad() {   	
		obtenerDatos();
		$("body").fadeIn('slow');	
    }
    
	function mostrarEstilos() {

		div = document.getElementById('resul');
		div2 = document.getElementById('formularioEstilo');
		div3 = document.getElementById('formularioCiudades');
		div4 = document.getElementById('formularioCercania');
		
		$('#formularioEstilo').slideDown('slow', function() {
  		});
		
		div.style.display = "none";
		div3.style.display = "none";
		div4.style.display = "none";

	}

	function mostrarCiudades() {

		div = document.getElementById('resul');
		div2 = document.getElementById('formularioEstilo');
		div3 = document.getElementById('formularioCiudades');
		div4 = document.getElementById('formularioCercania');
		
		$('#formularioCiudades').slideDown('slow', function() {
 		});
		
		div.style.display="none";
		div2.style.display = "none";
		div4.style.display = "none";

	}
		
	function mostrarCercania() {

		div = document.getElementById('resul');
		div2 = document.getElementById('formularioEstilo');
		div3 = document.getElementById('formularioCiudades');
		div4 = document.getElementById('formularioCercania');
		
		$('#formularioCercania').slideDown('slow', function() {
		});
		
		div.style.display="none";
		div2.style.display = "none";
		div3.style.display = "none";

	}
       
    function obtenerDatos() {
        
        $.ajax({
            url: 'http://158.42.77.115/evento_por_fecha.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                $.each(data, function(i,item){	              	  
              	  	var celda = document.getElementById(i);
              	  	celda.id=item.id;
               	    celda.src='http://test.bandness.com/uploads/images/posters/'+item.picture;
                });
            },
            error: function(){
            }
        });
    }
    
    function continuar(){
	    event.preventDefault();
        linkLocation = "html/bandas.html?tipo=ALL";
        $("body").fadeOut('slow',redirectPage);     
	}	
	
	function zonaprivada(){

		if(user_id!=undefined && pass=='true'){
			event.preventDefault();
        	linkLocation = "html/menu.html?User_id="+user_id;
        	$("body").fadeOut('slow',redirectPage);
		}
		
		else{
			event.preventDefault();
        	linkLocation = "html/login.html";
        	$("body").fadeOut('slow',redirectPage); 
        }   
	}
	
	function zonaeventos(i){
		event.preventDefault();
        linkLocation = "html/evento.html?Evento="+i;
        $("body").fadeOut('slow',redirectPage);     
	}
	
	function buscarCiudad(){
		var tipo="CI";
        valor=document.getElementById("Ciudad").value;
        linkLocation = "html/bandas.html?Banda="+valor+"&tipo="+tipo;
        $("body").fadeOut('slow',redirectPage);     	
    }
	
	function buscarEstilo(){
		var tipo="ES";
        valor=document.getElementById("Estilo1").value;
        estilo2=document.getElementById("Estilo2").value;
        estilo3=document.getElementById("Estilo3").value;
        linkLocation = "html/bandas.html?Banda="+valor+"&estilo2="+estilo2+"&estilo3="+estilo3+"&tipo="+tipo;	
        $("body").fadeOut('slow',redirectPage);     
    }
    
    function redirectPage() {
		window.location = linkLocation;
	}	