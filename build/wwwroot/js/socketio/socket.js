define(["application","socket.io-client"], function(App,io){
	
	 App.module("Socket", function(Socket){
		    Socket.IO = {
		       createConnection: function(token){
		    	  var conn = io.connect('http://localhost:3000',
		    			  {
		    		      query: 'token=' + token
		    			  });
		    	  console.info('socket connected' + conn);
		    	 // conn.emit('call', p1, function(resp, data) {
		    	//	    console.log('server sent resp code ' + resp);
		    	//	});
		    	  return conn;
		      }
		      
		    };
	 });

	 return App.Socket.IO;

	
})

