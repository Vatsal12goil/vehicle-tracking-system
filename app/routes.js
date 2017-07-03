//This would in a way replace the require route.js line with this function (like a inter-file function call).
module.exports = function(app, passport, path){

	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../views/html', 'home.html'));
	});

	app.get('/home.html', function (req, res) {
		res.sendFile(path.join(__dirname, '../views/html', 'home.html'));
	});

	app.get('/home', function (req, res) {
		res.sendFile(path.join(__dirname, '../views/html', 'home.html'));
	});

	app.get('/login', function (req, res) {
		req.logout();
		res.sendFile(path.join(__dirname, '../views/html', 'student.html'));
	});

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