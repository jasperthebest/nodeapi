var express = require('express');
//var bodyParser = require('body-parser');
var router = express.Router();
//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());

var User = require('../models/User');

// ADD THIS PART

// CREATES A NEW USER

router.post('/', (req, res) => {
	User.create({
		name : req.body.name,
        email : req.body.email,
        password : req.body.password
	},
	function(err, user){
		if(err) return res.status(500).send("There was a problem adding the information to the database.");
		//res.status(200).send(user);
        res.status(200);
        res.render('formsubmit', { data: user, title: "Success"});
	});
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    //console.log(req.session.id);
    //console.log(req.session.userid);
    if(req.session.userid) {
        User.find({}).sort({'name': 1}).limit(5).exec(function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            //res.status(200).send(users);
            res.status(200);
            res.render('formsubmit', { data: users, title: "Eurica"});
        });
    } else {
        res.send("Error Session");
    }
});

// Logout Session
/*
router.get('/logout', function (req, res) {
    req.session.destroy();
});
*/

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) { 
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});


module.exports = router;