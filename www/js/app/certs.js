$(document).ready(function(){
	
	var mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");

	localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USER_SESSION', [], function (tx, results) {
					mockDB.transaction(function (tx) {
				            tx.executeSql('SELECT * FROM CERTS WHERE userid = ?', [results.rows.item(0).userid], function (tx, results) {
				
					          	 var len = results.rows.length, i;
				         	    var  msg = null;
				     
				               for (i = 0; i < len; i++){
				               		msg = null;
				                    msg = '<li><a href="#">';
								  msg  = msg +  results.rows.item(i).certname;
				                  msg = msg+'</a></li>';
				       			  $("#certsList").append(msg);
				               }      
				            }, null);
				         });
        }, null);
    });
});