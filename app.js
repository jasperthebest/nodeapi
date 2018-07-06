var express = require('express');
var app = express();
var db = require('./db.js');

const path = require("path");

app.use('/media', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end("<h1>Homepage</h1>");
})

// ADD THESE TWO LINES
var UserController = require('./user/UserController');
app.use('/users', UserController);

module.exports = app;