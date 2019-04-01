var express = require('express'),
	router = express.Router(),
	db = require("../models/server.js");

router.get('/', function(req, res){
	db.Requirements.find()
		.then(function(requirements){
			res.send(JSON.stringify({status: 200, error: null, response:requirements}));
		})
		.catch(function(err){
			res.send(err);
		})
});

module.exports = router;