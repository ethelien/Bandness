 $(document).ready(function(){
  
	  var resultados = $('#resulta');
	  var $valor;
	  
	  //ESTE VALOR DEBE VENIR DE LA LLAMADA PREVIA DESDE INICIO, DONDE NOS LLEGUE LA BANDA SOBRE LA QUE SE HA CLICKADO Y SE QUIERE LA INFORMACIÓN
	  valor="BandnessBand";              
	     			
	     			alert(valor);
	     			
	                resultados = $('#resulta');
	                
	            $.ajax({
	                    url: 'http://192.168.1.102/banda_informacion.php?banda='+valor,
	                    dataType: 'jsonp',
	                    jsonp: 'jsoncallback',
	                    type:'get',
	                    timeout: 5000,
	                    success: function(data/*, status*/){
            $.each(data, function(i,item){
                var landmark = '<h1>'+item.bio+'</h1>';
                alert(landmark);
                resultados.append(landmark);
            });
           // mostrardatos();
        },
        error: function(){
            alert('no va');
        }
    });
});

//function mostrardatos() {
//    $('#resulta').html($resultados);
//    $.mobile.pageLoading(true);
//}