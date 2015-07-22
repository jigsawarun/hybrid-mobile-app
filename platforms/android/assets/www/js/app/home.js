$(document).ready(function(){
	
	var mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");

	
	
	localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USER_SESSION', [], function (tx, results) {
        	mockDB.transaction(function (tx) {	
                    tx.executeSql('SELECT A.totalpoints , count(O.offerid) as offercount FROM ACCT A, OFFERS O WHERE A.userid  = ? and A.userid = O.userid', [results.rows.item(0).userid], function (tx, results) {
        	          	 $('#pointsValue').text(results.rows.item(0).totalpoints);
        	        	 $('#offersValue').text(results.rows.item(0).offercount);	
                    }, null);
                 });
        }, null);
     });
	
	
	
	localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USER_SESSION', [], function (tx, results) {
        	mockDB.transaction(function (tx) {	
                    tx.executeSql('SELECT count(C.certid) as certCount FROM  CERTS C  WHERE C.userid  = ?', [results.rows.item(0).userid], function (tx, results) {
        	        	 $('#rewardsValue').text(results.rows.item(0).certCount);
                    }, null);
                 });
        }, null);
     });
	
	localDB.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USER_SESSION', [], function (tx, results) {
        	mockDB.transaction(function (tx) {	
                    tx.executeSql('SELECT count(N.notfid) as notfCount  FROM  NOTF N  WHERE N.userid  = ?', [results.rows.item(0).userid], function (tx, results) {
        	        	 $('#notifValue').text(results.rows.item(0).notfCount);
                    }, null);
                 });
        }, null);
     });
	

});