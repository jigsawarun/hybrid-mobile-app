$(document).ready(function(){
    var self = this;
	self.mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");
	self.userId = "";
	
	localDB.transaction(function (tx) {
		tx.executeSql('SELECT userid FROM USER_SESSION', [], function (tx, results) {
			var len = results.rows.length;
            if(len >0){
            	self.userId = results.rows.item(0).userid;
            	fetchOffers(self.userId);
            }
		}, null);
	});
	
	function fetchOffers(userId){
		self.mockDB.transaction(function (tx) {
			tx.executeSql('SELECT *  FROM OFFERS WHERE userid=?', [userId], function (tx, results) {
				if(results.rows.length > 0){
					showOffers(results.rows);
				}
			}, null);
		});	
	}
	
	function showOffers(resultSet){
		for(var i =0; i < resultSet.length; i++){
			$("#offersContainer").append("<div data-role='collapsible' data-collapsed='true'><h1>" + resultSet.item(i).offername +"</h1><p>" +  resultSet.item(i).offerdesc + "</p></div>" );
		}
		$("#offersContainer div[data-role=collapsible]:first").attr('data-collapsed','false');
		$("#offersContainer").trigger("create");
	}
});