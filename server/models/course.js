var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Name cannot be blank.'
    },
    instructions: {
        type: String,
    },
    url: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Courses'});

var Course = mongoose.model('Recipe', courseSchema);

module.exports = Recipe;