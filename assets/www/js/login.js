//VARIABLES

var user_id;
var id;
var pass;

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
		
function Login(){

    var user_corr = document.getElementById('User_corr');
    var user_wrong = document.getElementById('User_wrong');
    var pass_corr = document.getElementById('Pass_corr');
    var pass_wrong = document.getElementById('Pass_wrong');
    var user_corr_text = document.getElementById('User_corr_text');
    var user_wrong_text = document.getElementById('User_wrong_text');
    var pass_corr_text = document.getElementById('Pass_corr_text');
    var pass_wrong_text = document.getElementById('Pass_wrong_text');
    
    if(user_id==""){
    	user_wrong.style.display='inline';
    	user_wrong_text.style.display='inline';
    	user_corr.style.display='none';
    	user_corr_text.style.display='none';
    	pass_wrong.style.display='inline';
    	pass_wrong_text.style.display='inline';
    	pass_corr.style.display='none';
    	pass_corr_text.style.display='none';
    }
    
    else if(pass==true){
    	Obtener_id();
    }
    
   else if(pass==false && user_id!="FALSE"){
    	user_wrong.style.display='none';
    	user_wrong_text.style.display='none';
    	user_corr.style.display='inline'; 
    	user_corr_text.style.display='inline'; 
    	pass_wrong.style.display='inline';
    	pass_wrong_text.style.display='inline';
    	pass_corr.style.display='none';
    	pass_corr_text.style.display='none';    	
    }
    
}


function validarNick() {
	valor=document.getElementById("N").value;
    
    $.ajax({
        url: 'http://192.168.1.102/bandee_nick.php?busqueda='+valor,
	        dataType: 'jsonp',
	        jsonp: 'jsoncallback',
	        type:'get',
	        timeout: 5000,
	        success: function(data/*, status*/){
	            $.each(data, function(i,item){;
	                user_id = item.id;

	            });
	            validarPass();
	        },
	        error: function(){
	        }
	    });
	}
	
function validarPass() {
	
	valor=document.getElementById("P").value;
	
	$.ajax({
        url: 'http://192.168.1.102/bandee_pass.php?pass='+valor+'&id='+user_id,
	        dataType: 'jsonp',
	        jsonp: 'jsoncallback',
	        type:'get',
	        timeout: 5000,
	        success: function(data/*, status*/){
	            $.each(data, function(i,item){
	                pass = item.Resultado;
	            });
	            Login();
	        },
	        error: function(){
	        }
	    });
	}
	
	function Obtener_id() {
				
    $.ajax({
        url: 'http://192.168.1.102/bandee_user_id.php?user='+user_id,
	        dataType: 'jsonp',
	        jsonp: 'jsoncallback',
	        type:'get',
	        timeout: 5000,
	        success: function(data/*, status*/){
	            $.each(data, function(i,item){
	                id = item.id;
	            });
    			entrar();  	
	        },
	        error: function(){
	        }
	    });
	}

	function registrar(){
	 	window.open("http://WWw.bandness.com");
	}
	
	function entrar(){
	    window.location = "menu.html?User_id="+id;
		 $("body").fadeOut('slow',redirectPage);   
	}
	
