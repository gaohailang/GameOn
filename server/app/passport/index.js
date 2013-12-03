//
// ### Passport Authentication
// 
exports = module.exports = function(app, passport) {
	var env = require('./../env')(),
		LocalStrategy = require('passport-local').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy;
	
	// Local Strategy
	passport.use(new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'password'
  	},
  	function(email, password, done) {
		// Find a player with given email
		app.db.base.models.Player.findOne({ email: email }, '+password', function(err, player) {
			if (err) return done(err);
			if (!player) return done(null, false, { message: 'Unknown player' });
			
			// Validate password
			var encryptedPassword = app.db.base.models.Player.encryptPassword(password);
			if (player.password != encryptedPassword) {
				return done(null, false, { message: 'Invalid password' });
			}
			
			// We're good
			return done(null, player);
		});
	}));
	
	// Facebook Strategy
	if (env['facebook-oauth-key']) {
		passport.use(new FacebookStrategy({
			clientID: env['facebook-oauth-key'],
			clientSecret: env['facebook-oauth-secret']
		},
		function(accessToken, refreshToken, profile, done) {
			// Hand off to caller
			done(null, false, {
				accessToken: accessToken,
				refreshToken: refreshToken,
				profile: profile
			});
		}));
	}
	
	// Serialize
	passport.serializeUser(function(player, done) {
		done(null, player._id);
	});
	
	// Deserialize
	passport.deserializeUser(function(id, done) {
		app.db.base.models.Player.findOne({ _id: id }).exec(function(err, player) {
			done(err, player);
		});
	});
};