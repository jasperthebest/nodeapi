var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var db = require('./db.js');

const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/media', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ 
	secret: 'helloworld',
	resave: true, 
	saveUninitialized: true 
}));

/*
	, 
	resave: true, 
	saveUninitialized: true 
*/



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end("<h1>Homepage</h1>");
});

// ADD THESE TWO LINES
var UserController = require('./user/UserController');
app.use('/users', UserController);

var UserjsonController = require('./user/UserjsonController');
app.use('/usersjson', UserjsonController);

var LoginController = require('./login/LoginController');
app.use('/login', LoginController);

module.exports = app;