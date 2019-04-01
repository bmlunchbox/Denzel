var express = require('express'),
	app = express(),
	port = 5000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var courseRoutes = require("./routes/courses");
var requirementRoutes = require("./routes/requirements");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get('/', function(req, res){
	res.send("root");
});

app.use('/api/course', courseRoutes);
app.use('/api/requirement', requirementRoutes);

app.listen(port, function(){
	console.log("App on port " + port);
});