var app = require('./app.js');
var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
	console.log('Express server listening on port ' + port);
});