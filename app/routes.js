//This would in a way replace the require route.js line with this function (like a inter-file function call).
var Route = require('../app/modules/route_db');
module.exports = function(app, passport, path){

	var posn = {
		lat: 0,
		lng: 0
	};

	app.get('/', function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'home.ejs'), { message: req.flash('signupMessage') });

	});

	app.get('/loginFailure', function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'loginFailure.ejs'), { message: req.flash('loginMessage') });

	});

	app.get('/student', isLoggedIn, function (req, res) {
		// redirect to /driver if the user logged in has id === 'driver'
	    if (req.user.local.id === 'Driver'){
	    	return res.redirect('/driver');
	    }
		if (req.user.local.id === 'Admin'){
	    	return res.redirect('/admin');
	    }
		res.render(path.join(__dirname, '../views/html', 'student.ejs'),{ user : req.user });
	});

	app.get('/driver', isLoggedIn, function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'driver.ejs'),{ user : req.user });
	});

	app.get('/admin', isLoggedIn, function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'admin.ejs'),{ user : req.user });
	});

	app.get('/add_route', isLoggedIn, function (req, res) {
		res.render(path.join(__dirname, '../views/html', 'add_route.ejs'),{ message : req.flash('message'), user : req.user});
	});

	app.post('/save_route', isLoggedIn, function (req, res) {
		//fetch the route and add it to the db
		var id = req.body.id;
		var source = req.body.source;
		var destination = req.body.destination;
		var waypoints = req.body.waypoints;

		Route.findOne({ 'routes.id' : id}, function(err, route){
			if(err){
				throw err;
			}
			if(route){
				res.send(500,'showAlert');
			}
			else{
				var newRoute = new Route();

				newRoute.routes.id = id;
				newRoute.routes.source = source;
				newRoute.routes.destination = destination;
				newRoute.routes.waypoints = waypoints;
				
				newRoute.save(function(err){
					if(err){
						throw err;
					}
					res.send(500,'done');
				});
			}
		});
	});

	app.post('/route_fetch', isLoggedIn, function (req, res) {
		//fetch the route from the db and display it on the map
		var id = req.body.id;
		var data;
		Route.findOne({ 'routes.id' : id }, function(err, route){
			if(err){
				throw err;
			}
			if(route){
				var wp = [];
				for( var data of route.routes.waypoints){
					data.stopover = Boolean(data.stopover);
					wp.push(data);
					// console.log(data.stopover);
				}
				data = {
					source		: route.routes.source,
					destination	: route.routes.destination,
					waypoints	: wp
				};
				res.send(data);
			}
			if(!route){
				res.send(500,'not_found');
			}
		});

	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/update_clients', function(req, res){
		if(posn.lat === 0 && posn.lng === 0){
			console.log('Driver not yet logged in!!');
			res.json(posn);
		}
		else{
			res.json(posn);
		}
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

	app.post('/position', function(req, res){
		posn = req.body;
	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()){
			return next();
		}
		else{
			res.redirect('/');
		}
	}

}