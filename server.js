// Import required modules
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
var session = require('express-session');
var path = require('path');

// configure database on cloud using modulous.io
// var configure_db = require('./config/database.js');

//connect to database
mongoose.connect('mongodb://localhost:8081/users_ts');

app.use( express.static( __dirname + '/views'));
app.use(morgan('dev'));		//maintain log on console
app.use(cookie_parser());	//read cookies (used in authentication process)
app.use(body_parser());		//read html files

app.use(session( {secret : 'divyanshu'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport, path);

app.listen(port);
console.log("Running at Port : " + port);