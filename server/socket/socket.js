define([ 'socketio' ],

function(io) {

	var AppSockets = function(eventDispatcher) {

		var connectSocket = function() {
			socket = io.connect();

			socket.on('connect_failed', function(reason) {
				console.error('[Socket.IO] Erro: ', reason);
			}).on('connect', function() {
				console.log('[Socket.IO] Conectado!');
			});

		}

		// Evento que dispara estabelece a conexão socket
		eventDispatcher.on('app:loggedin', connectSocket);
	}

	return {
		initialize : function(eventDispatcher) {
			AppSockets(eventDispatcher);
		}
	}

});