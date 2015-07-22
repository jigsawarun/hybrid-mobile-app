	var mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");
	
$(document).ready(function(){


	
	$("#certsButton").click(function(){
		window.location.href = "certs.html";
	});
	$("#notfButton").click(function(){
		window.location.href = "notification.html";
	});
	$("#homeButton").click(function(){
		window.location.href = "home.html";
	});
	$("#signOut").click(function(){
		localDB.transaction(function (tx) {
	        tx.executeSql('SELECT * FROM USER_SESSION', [], function (tx, results) {
	        	localDB.transaction(function (tx) {	
	                    tx.executeSql(' DELETE FROM USER_SESSION WHERE userid = ?', [results.rows.item(0).userid], function (tx, results) {
	                    	window.location.href = "index.html";
	                    }, null);
	                 });
	        }, null);
	     });
	
	});
	
	



	
});

