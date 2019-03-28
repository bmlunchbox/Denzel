var express = require('express'),
	app = express(),
	port = 5000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var courseRoutes = require("./routes/courses");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get('/', function(req, res){
	res.send("root");
});

app.use('/api/course', courseRoutes);

app.listen(port, function(){
	console.log("App on port " + port);
});