//var customerStore = require('store/customer');
//var when = require('when');

//module.exports = function (id) {
//    return when(id).then(customerStore.load);
//};


module.exports = function (server) {
   var io =require("socket.io").listen(server);
   var ns = io.of('/ns');
   var cookieParser = require("cookie-parser");
   var socketioJwt = require('socketio-jwt');
   
   io.set('authorization', socketioJwt.authorize({
	   secret: 'jwtSecret',
	   handshake: true
	}));

   //io.set('authorization', function (handshakeData, accept) {
	   /*
	   if (handshakeData.headers.cookie) {
		   handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

		   handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');

		   console.log('handshakeData.sessionID - ', handshakeData.sessionID);

		   if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
			   console.log('io.authorization - Cookie is invalid');
			   return accept('Cookie is invalid.', false);
		   }

	   } else {
		   console.log('io.authorization - No cookie transmitted');
		   return accept('No cookie transmitted.', false);
	   }
		*/
	  // console.log('io.authorization - Cookie is correct');
       
	  // accept(null, true);
   //});
   ns.on('connection', function (socket) {
	   
	   console.log(socket.handshake.decoded_token.email, 'connected');
	   var session = socket.handshake.session;
	   console.log("session");
	   console.log(session);
	   var hs = socket.handshake;
	   console.log('A socket with sessionID '+hs.sessionID+' connected.');
       socket.on('user:login', function (data) {
       		console.log("ONDDDDDDDDD" + data);
       		socket.emit('message',"helo");
       });
       socket.on('user:logout', function (data) {
      		console.log("ONDDDDDDDDD" + data);
      		socket.emit('message',"helo");
      });
       socket.on('user:register', function (data) {
      		console.log("ONDDDDDDDDD" + data);
      		socket.emit('message',"helo");
       });
   });
   return 'Socket.io started';
};