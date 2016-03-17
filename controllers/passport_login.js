
var User = require('../models/usuarios')
var config = require('../config')

var TwitterStrategy = require('passport-twitter').Strategy
var FacebookStrategy = require('passport-facebook').Strategy

var register = function (passport) {

	passport.serializeUser(function(user, done) {
		done(null, user)
	})

	passport.deserializeUser(function(obj, done) {
		done(null, obj)
	})

	// Configuración del autenticado con Twitter
	passport.use(new TwitterStrategy({
		consumerKey		 : config.twitter.key,
		consumerSecret	 : config.twitter.secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function (accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function (err, user) {
			if (user) {
				return done(null, user)
			} else {
				var user = new User({
					provider_id	: profile.id,
					provider	: profile.provider,
					name		: profile.displayName,
					photo		: profile.photos[0].value,
					age         : '',
					nickname    : '',
					description : ''
				})
				user.save(function(err) {
					if(err) throw err
					done(null, user)
				})

				// Si no exite
				// return done(null, false)
			}
		})
	}))

	// Configuración del autenticado con Facebook
	passport.use(new FacebookStrategy({
		clientID		: config.facebook.id,
		clientSecret	: config.facebook.secret,
		callbackURL	    : '/auth/facebook/callback',
		profileFields   : ['id', 'displayName', /*'provider',*/ 'photos']
	}, function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function (err, user) {
			if(user){
				return done(null, user)
			}else{
				var user = new User({
					provider_id	  : profile.id,
					provider	  : profile.provider,
					name		  : profile.displayName,
					photo		  : profile.photos[0].value,
					age         : '',
					nickname    : '',
					description : ''
				})
				user.save(function(err) {
					if(err) throw err
					done(null, user)
				})

				// Si no exite
				// return done(null, false)
			}
		})
	}))
}

module.exports = register
