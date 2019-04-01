var express = require('express'),
	router = express.Router(),
	db = require("../models/server.js");

router.get('/', function(req, res){
	db.Requirements.find()
		.then(function(requirements){
			res.json(requirements);
		})
		.catch(function(err){
			res.send(err);
		})
});

module.exports = router;