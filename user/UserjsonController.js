var express = require('express');
//var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
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
        res.json({
            user
        });
	});
});

// RETURNS ALL THE USERS IN THE DATABASE
router.post('/all', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            User.find({}).sort({'name': 1}).limit(10).exec(function (err, users) {
                if (err) return res.status(500).send("There was a problem finding the users.");
                //res.status(200).send(users);
                res.status(200);
                res.json({
                    users
                });
            });
        }
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', (req, res) => {
    User.find({}).sort({'name': 1}).limit(5).exec(function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        //res.status(200).send(users);
        res.status(200);
        res.json({
            users
        });
    });
});

// GETS A SINGLE USER FROM THE DATABASE
/*
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).json({user});
    });
});
*/

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) { 
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).json({user});
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).json({'success': 1});
    });
});

/* Middle Verify Token */
function verifyToken (req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};


module.exports = router;