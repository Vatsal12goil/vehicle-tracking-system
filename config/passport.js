var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/modules/user');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
	done(null, user._id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});



	passport.use('local-signup', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
		},
		function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username' : username}, function(err, user){
				if(err)
					return done(err);

				if (user)
					return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

				else{
					var newUser = new User();

					newUser.local.username = username;
					newUser.local.email = req.body.email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.id = req.body.identity;

					newUser.save(function(err){
						if(err)
							throw err;

						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username' : username}, function(err, user){
				if(err)
					return done(err);

				if(!user)
					return done(null, false, req.flash('loginMessage', 'The entered username doesn\'t exist!'));

				if(!user.validPwd(password))
					return done(null, false, req.flash('loginMessage', 'The entered password is wrong!!'));

				return done(null, user);
			});
		});
	}));
	
};