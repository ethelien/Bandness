/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function populateDB(tx) {
   //tx.executeSql('DROP TABLE IF EXISTS DEMO');
   // tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
   // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
   // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Query the database
//
function queryDB(tx) {
    alert(3)
    tx.executeSql('select * from bandee', [], querySuccess, errorCB);
    alert(4);
}

// Query the success callback
//
function querySuccess(tx, results) {
    alert(5);
    var len = results.rows.length;
    console.log("bandee table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
    }
}

// Transaction error callback
//
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
    console.log("Error processing SQL: "+err.code);
}
// Transaction success callback
//
function successCB() {
    alert(2);
    var db = window.openDatabase("Bandness", "1.0", "Base de datos de Bandness", 1000000);
    db.transaction(queryDB, errorCB);
}

// PhoneGap is ready
//
function onDeviceReady() {
    alert(1); 
    var db = window.openDatabase("Bandness", "1.0", "Base de datos de Bandness", 1000000);
    db.transaction(populateDB, errorCB, successCB);
}

function onLoad() {
    navigator.device.deviceReady();
} 
     
function comprobar(){
   // var valor = document.getElementById("N").value;
   // if (valor=="vacio"){
        window.open("file:///android_asset/www/html/Banda_MenuPrincipal.html");
    //}
/* alert(25);   MOSTAR ALERT DIALOG -> ME SERA UTIL */
}
