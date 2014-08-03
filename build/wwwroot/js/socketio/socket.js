define(["application","socket.io-client"], function(App,io){
	
	 App.module("Socket", function(Socket){
		    Socket.IO = {
		       createConnection: function(){
		    	  var conn = io.connect('http://localhost:3000/ns');
		    	  console.info('socket connected');
		    	 // conn.emit('call', p1, function(resp, data) {
		    	//	    console.log('server sent resp code ' + resp);
		    	//	});
		    	  return conn;
		      }
		      
		    };
	 });

	 return App.Socket.IO;

	
})

