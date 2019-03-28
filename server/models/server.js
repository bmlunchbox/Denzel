var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect("mongodb+srv://Brandon:Brandon@coursedata-u7jmw.mongodb.net/test?retryWrites=true", {useNewUrlParser: true},
	function(err){
		if(err){
			console.log("DB failed.");
			//console.log(err);
			throw err;
		}
		console.log("DB success.");
	});

mongoose.Promise = Promise;

module.exports.Course = require("./course");