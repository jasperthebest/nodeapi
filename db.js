var mongoose = require('mongoose');
const options = {
	useNewUrlParser: true
};
//port: :27017
mongoose.connect('mongodb://localhost/ipademo?useNewUrlParser=true' );