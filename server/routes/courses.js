var express = require('express'),
	router = express.Router(),
	db = require("../models/server.js");

router.get('/', function(req, res){
	db.Course.find()
		.then(function(courses){
			res.json(courses);
		})
		.catch(function(err){
			res.send(err);
		})
});

module.exports = router;