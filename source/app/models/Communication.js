/** @namespace application.app.models.Communication**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communication = new Schema({
    "templateId": String,
    "name": String,
    "template": String,
    "project": String});

mongoose.model('communication', communication, 'communication');
