var express = require('express'),
	router = express.Router(),
	db = require("../models/server.js");

router.get('/', function(req, res){
	db.Course.find()
		.then(function(courses){
			res.send(JSON.stringify({status: 200, error: null, response:courses}));
		})
		.catch(function(err){
			res.send(err);
		})
});

module.exports = router;