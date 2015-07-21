$(document).ready(function(){

	var mockDB = openDatabase("APP_MOCK_DB","1.0","MOCK DATABASE","20000");
	var localDB = openDatabase("APP_LOCAL_DB","1.0","LOCAL DATABASE","20000");

	
	    $("#signIn").click(function(){
	        
	    	mockDB.transaction(function (tx) {
	
	        var loginId = $( "#loginId" ).val();
	        var password = $( "#password" ).val();
	        
	             if($.trim(loginId).length ===0 || $.trim(password).length ===0 ){
	            	 $("#loginError").text("Please enter login id and password");
	            }else{
	                  tx.executeSql('SELECT * FROM USER_AUTH_DET where username =? and password=?', [loginId,password], function (tx, results) {
		                  var len = results.rows.length, i;
		                  if(len >0){
		                	  handleSignIn(results.rows.item(0).userid);
		                  }else{
		                	  $("#loginError").text("Incorrect Username/Password");
		                  }
	                  }, null);
	            	}
	       		});
	    	}); 
	    
	    function handleSignIn(userId){
	    	localDB.transaction(function (tx) {
	    		 tx.executeSql('INSERT INTO USER_SESSION ( userid, token) VALUES (?,?)', [userId, "121212121212"],
	    		 function(tx,results){
	    			 window.location.href = "home.html";
	    		 },null
	    		 );
	    	});
	    	
	    	
	    }


});