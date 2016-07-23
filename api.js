//##########################//
//	Requiring Modules
//#########################//

var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	sessionStore = require('connect-mongo')(session),
	router = express.Router();


//#################################//
//	Loading Passport configrations
//################################//

var passportAuth = require('./passportAuth.js')(passport);

//##########################//
//	Database Connection
//#########################//

mongoose.connect('mongodb://localhost/chatApp');
var db = mongoose.connection


//##########################//
//	Access Checker
//#########################//

function loggedIn(req, res, next) {
	if(req.user) {
		next();
	} else {
		res.redirect('/admin');
	}
};

//##########################//
//	Router Configuration
//#########################//

router
	.use(morgan('dev'))//log every request to the console
	.use(cookieParser())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: false}))
	.use(session({
		secret: 'thepasswordsecret',
		resave: false,
		saveUninitialized: false,
	}))// session secret
	.use(passport.initialize()) 
	.use(passport.session())//persistent login sessions
	.use(flash());//connect flash for flash messages

//##########################//
//	API
//#########################//

router
	/////////////////////
	//	Login Route
	////////////////////

	.route('/login')
	.post(passport.authenticate('login', {
        failureRedirect : '/#/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res) {
		res.json({user: req.user});
	});

router
	/////////////////////
	//	Register Route
	////////////////////
	.route('/register')
	.post(passport.authenticate('signup', {
        failureRedirect : '/#/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res){
		res.json({user: req.user});
    });

router
	/////////////////////
	//	Logout route
	////////////////////
	.route('/logout')
	.get(function(req, res) {
		req.logout();
		res.redirect("/");
	});

router
	/////////////////////
	//	Profile route
	////////////////////
	.route('/profile')
	.get(loggedIn, function(req, res) {
		res.json({user: req.user, success: 'Authorized'});
	});

router
	/////////////////////
	//	Chat route
	////////////////////
	.route('/chat')
	.get(function(req, res){
		res.json({
			userName: req.user.name,
			username: req.user.username,
			userId: req.user._id
		});
	});

module.exports = router;