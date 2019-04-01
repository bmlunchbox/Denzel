var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    course: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    availability: {
        type: [String]
    },
    notes: {
        type: [String]
    },
    easy: {
        type: String
    },
    useful: {
        type: String
    }
}, {collection: 'Courses'});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;