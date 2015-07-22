var userId = null;
var token= null;

$(document).ready(function(){
	
	var mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");
	
	mockDB.transaction(function (tx) {
		    tx.executeSql('DROP TABLE USER_AUTH_DET');
		    tx.executeSql('DROP TABLE ACCT');
		    tx.executeSql('DROP TABLE OFFERS');
		    tx.executeSql('DROP TABLE CERTS');
		    tx.executeSql('DROP TABLE NOTF');
  		});
	localDB.transaction(function (tx) {
	    tx.executeSql('DROP TABLE USER_SESSION');
	
		});

	var databaseCreated = false;

		mockDB.transaction(function (tx) {
		    tx.executeSql('SELECT * FROM USER_AUTH_DET', [], function (tx, results) {
		      var len = results.rows.length, i;
		      if(len >0){
		      	databaseCreated = true;
		      }
			
		   }, null);
		});
	
		databaseCreated = false;

	if(!databaseCreated){

		// Load User Auth Table
		mockDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS USER_AUTH_DET (username, password, userid unique)');
   			tx.executeSql('INSERT INTO USER_AUTH_DET (username, password, userid) VALUES ("admin", "admin",1)');
  			tx.executeSql('INSERT INTO USER_AUTH_DET (username, password, userid) VALUES ("user", "user",2)');
  		});

  		// Load User Account Table
		mockDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS ACCT (userid unique, accountid unique, basepoints, bonuspoints, totalpoints)');
   			tx.executeSql('INSERT INTO ACCT (userid, accountid, basepoints, bonuspoints, totalpoints) VALUES (1, 1, 100, 300, 400)');
  			tx.executeSql('INSERT INTO ACCT (userid, accountid, basepoints, bonuspoints, totalpoints) VALUES (2, 2, 300, 400, 700)');
  		});

  		// Load User Offers Table
		mockDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS OFFERS (userid , accountid , offerid , offername, offerdesc, expirydate)');
   			tx.executeSql('INSERT INTO OFFERS (userid, accountid, offerid, offername, offerdesc, expirydate) VALUES (1, 1, 111, "offer 1", "offer desc 1" , "07/30/3015")');
   			tx.executeSql('INSERT INTO OFFERS (userid, accountid, offerid, offername, offerdesc, expirydate) VALUES (1, 1, 112, "offer 2", "offer desc 2" , "07/30/3015")');
   			tx.executeSql('INSERT INTO OFFERS (userid, accountid, offerid, offername, offerdesc, expirydate) VALUES (1, 1, 113, "offer 3", "offer desc 3" , "07/30/3015")');
   			tx.executeSql('INSERT INTO OFFERS (userid, accountid, offerid, offername, offerdesc, expirydate) VALUES (1, 1, 114, "offer 4", "offer desc 4" , "07/30/3015")');
   			tx.executeSql('INSERT INTO OFFERS (userid, accountid, offerid, offername, offerdesc, expirydate) VALUES (1, 1, 115, "offer 5", "offer desc 5" , "07/30/3015")');
  			tx.executeSql('INSERT INTO OFFERS (userid, accountid,offerid, offername, offerdesc, expirydate) VALUES (2, 2, 222, "offer 2", "offer desc 2", "07/30/3015")');
  		});

  			// Load User Certs Table
		mockDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS CERTS (userid , accountid , certid unique, certname, certdesc, expirydate)');
   			tx.executeSql('INSERT INTO CERTS (userid, accountid, certid, certname, certdesc, expirydate) VALUES (1, 1, 12343434343,"cert name 1 of admin", "cert desc 1", "07/30/3015")');
   			tx.executeSql('INSERT INTO CERTS (userid, accountid, certid, certname, certdesc, expirydate) VALUES (1, 1, 1234343432323,"cert name2 of admin", "cert desc 2", "07/30/3015")');
  			tx.executeSql('INSERT INTO CERTS (userid, accountid, certid, certname, certdesc, expirydate) VALUES (2, 2, 212121212132,  "cert name 1 of user" ,"cert desc 1","07/30/3015")');
  			tx.executeSql('INSERT INTO CERTS (userid, accountid, certid, certname, certdesc, expirydate) VALUES (2, 2, 2121212121323,  "cert name 2 of user" ,"cert desc 2","07/30/3015")');
  		});

  			// Load User Notf Table
		mockDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS NOTF (userid unique, accountid unique, notfid unique, notfname, notfdesc, notfdate)');
   			tx.executeSql('INSERT INTO NOTF (userid, accountid, notfid, notfname, notfdesc, notfdate) VALUES (1, 1, 1,"notf name 1 of admin", "notf desc 1", "07/30/3015")');
  			tx.executeSql('INSERT INTO NOTF (userid, accountid, notfid, notfname, notfdesc, notfdate) VALUES (2, 2, 2,  "notf name 1 of user" ,"notf desc 2","07/30/3015")');
   			//.executeSql('INSERT INTO NOTF (userid, accountid, notfid, notfname, notfdesc, notfdate) VALUES (1, 1, 3, "notf name 2 of admin", "notf desc 1", "07/30/3015")');
  			//tx.executeSql('INSERT INTO NOTF (userid, accountid, notfid, notfname, notfdesc, notfdate) VALUES (2, 2, 4,  "notf name 2 of user" ,"notf desc 2","07/30/3015")');
  		});


		// Table to store user session details
  		localDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS USER_SESSION ( userid unique, token)');
  		});

	}

	

});