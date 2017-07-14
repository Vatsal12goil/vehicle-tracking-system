//This would in a way replace the require route.js line with this function (like a inter-file function call).
module.exports = function(app, passport, path){

	app.get('/', function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'home.ejs'), { message: req.flash('signupMessage') });

	});

	app.get('/student', isLoggedIn, function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'student.ejs'),{ user : req.user });
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/student',
		failureRedirect : '/',
		failureFlash	: 'true'
	}));

	app.post('/login', passport.authenticate('local-login', {
		// for success redirect check if admin/parent/student/driver
		// make login failure page also (refer to scribble pad for more info )
		successRedirect : '/student',
		failureRedirect : '/loginFailure',
		failureFlash	: 'true'
	}));

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()){
			return next();
		}
		else{
			res.redirect('/');
		}
	}

}