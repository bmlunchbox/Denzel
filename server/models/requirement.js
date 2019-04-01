var mongoose = require('mongoose');

var requirementSchema = new mongoose.Schema({
    class: {
        type: Number
    },
    program: {
        type: String
    }/*,
    terms: {
        1A: {
            term: {
                type: String
            },
            season: {
                type: String
            },
            electives: {
                type: Number
            },
            courses:{
                type: [String]
            }
        }
    }*/
}, {collection: 'Requirements'});

var Requirements = mongoose.model('Requirements', requirementSchema);

module.exports = Requirements;