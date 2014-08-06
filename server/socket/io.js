//var customerStore = require('store/customer');
//var when = require('when');

//module.exports = function (id) {
//    return when(id).then(customerStore.load);
//};


module.exports = function (server) {
   var io =require("socket.io").listen(server);
  // var ns = io.of('/ns');
   var cookieParser = require("cookie-parser");
   var socketioJwt = require('socketio-jwt');
   
   //io.set('authorization', socketioJwt.authorize({
	//   secret: 'jwtSecret',
	//   handshake: true
	//}));

   
   io.on('connection', function (socket) {
	   
	 //  console.log(socket.handshake.decoded_token.email, 'connected');
	 //  var session = socket.handshake.session;
	   console.log("connection");
	 //  console.log(session);
	 //  var hs = socket.handshake;
	 //  console.log('A socket with sessionID '+hs.sessionID+' connected.');
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