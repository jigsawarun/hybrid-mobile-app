$(document).ready(function(){
	
	var mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");

	
	
	localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USER_SESSION', [], function (tx, results) {
        	mockDB.transaction(function (tx) {	
                    tx.executeSql('SELECT * FROM ACCT WHERE userid = ?', [results.rows.item(0).userid], function (tx, results) {
        	          	$("#basePoints").text(results.rows.item(0).basepoints);
        	          	$("#bonusPoints").text(results.rows.item(0).bonuspoints);
        	          	$("#totalPoints").text(results.rows.item(0).totalpoints);
        	          
                    }, null);
                 });
        }, null);
     });
	
	
	
	

});