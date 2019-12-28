/** @namespace application.app.models.Communication**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communication = new Schema({});

mongoose.model('communication', communication, 'communication');
