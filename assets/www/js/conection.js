/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    
$(document).ready(function(){
	var output = $('#output');

	$.ajax({
		url: 'http://192.168.1.102/login.php?login=paumaldonado@gmail.com',
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
				var landmark = '<h1>'+item.id+'</h1>';
				//+ '<p>'+item.latitude+'<br>'
				//+ item.longitude+'</p>';
				output.append(landmark);
			});
		},
		error: function(){
			output.text('There was an error loading the data.');
		}
	});
});
