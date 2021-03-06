//
// # Push Notification Helper
//
// 2013 Pablo De Nadai
//

var passportSocketIo = require('passport.socketio'),
	_ = require('lodash');

exports = module.exports = function(socketIo) {
	return {

		//
		// ### function emitTo (playerId, notification)
		// #### @playerId {number} Recipient (`Player`) ID.
		// 
		emitTo: function (playerId, eventName, data) {
			passportSocketIo.filterSocketsByUser(socketIo, function (player) {
				return _.isEqual(player[0]._id, playerId);
			}).forEach(function (s) {
				s.emit(eventName, data);
			});
		}

	};
}