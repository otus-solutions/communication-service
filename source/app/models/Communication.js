/** @namespace application.app.models.Communication**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communication = new Schema({
    name: {
        type: String,
        required: true
    },
    cc: {
        type: String
    },
    subject: {
        type: String
    },
    template: {
        type: String,
        required: true
    }
});

mongoose.model('communication', communication, 'communication');

