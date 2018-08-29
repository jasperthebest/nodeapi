var express = require('express');
var jwt = require('jsonwebtoken');
//var bodyParser = require('body-parser');
var router = express.Router();
//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());

var User = require('../models/User');

// Check Login User

router.post('/', (req, res) => {
	//var email = req.body.email;
	// var password = req.body.password;
	const user = {
		email: req.body.email,
		password: req.body.password
	};
	//var reqtoken = 0;
	User.findOne(user).exec((err, users) => {
		if (err) return res.status(500).send("There was a problem finding the users.");
		req.session.userid = users.id;
		//req.session.userid = "hello";
		if(users) {
			jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '150s' }, (err, token) => {
				res.status(200);
	        	res.json({token});
	        	//req.session.userid = token;
	        	//console.log(reqtoken);
	        	//console.log(token);
	        });
		} else {
			res.status(403);
			res.send("Invalid Password");
		}
		//console.log(reqtoken);
		/*
		res.json({
			users
		});
		*/
	});
	//console.log(reqtoken);
	
});

router.get('/', (req, res) => {
	
	res.status(200).render('loginform', { title: "Login"});
	/*
	User.find({}).exec((err, users) => {
		res.status(200);
		res.json({
			users
		});
	});
	*/
});

module.exports = router;