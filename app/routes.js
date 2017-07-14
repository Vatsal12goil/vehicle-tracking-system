//This would in a way replace the require route.js line with this function (like a inter-file function call).
module.exports = function(app, passport, path){

	app.get('/', function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'home.ejs'), { message: req.flash('signupMessage') });

	});

	app.get('/student', function (req, res) {
		// req.logout();
		var user = req.body.username || "User";
		res.render(path.join(__dirname, '../views/html', 'student.ejs'), { uname : user});
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
	// app.get('/login', isLoggedIn, function(req, res) {
	// 	res.json({ user : req.user });
	// });

	// function isLoggedIn(req, res, next) {
	// 	if(req.isAuthenticated()){
	// 		return next();
	// 	}
	// 	res.redirect('/');
	// }

}