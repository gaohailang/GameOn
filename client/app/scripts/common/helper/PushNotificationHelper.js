//
// # Push Notification Helper 
// Listens and emits notification from/to the server.
//
// 2013 Pablo De Nadai
//

'use strict';

app.factory('PushNotificationHelper', function ($rootScope, ServerUrl) {

	var socket = io.connect(ServerUrl);
	
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
		  			callback.apply(socket, args);
				});
			});
		},

		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
		  			if (callback) {
		    			callback.apply(socket, args);
		  			}
				});
			});
		}
	};
});