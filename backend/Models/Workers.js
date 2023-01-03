const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

let workerSchema = new Schema({
    // schema goes here
	worker_id: {type: String, required: true, unique: true, default: uuid.v1},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
    },{
        collection: 'worker'
});

module.exports = mongoose.model('worker', workerSchema);