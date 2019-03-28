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

/*
router.post('/', function(req, res){
	db.Course.create(req.body)
		.then(function(newRecipe){
			res.status(201).json(newRecipe);
		})
		.catch(function(err){
			res.send(err);
		})
});

router.put('/:recipeId', function(req, res){
   db.Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true})
   .then(function(recipe){
       res.json(recipe);
   })
   .catch(function(err){
       res.send(err);
   })
});

router.delete('/:recipeId', function(req, res){
   db.Recipe.remove({_id: req.params.recipeId}) 
   .then(function(){
       res.json({message: 'Deleted!'});
   })
   .catch(function(err){
       res.send(err);
   })
});
*/

module.exports = router;