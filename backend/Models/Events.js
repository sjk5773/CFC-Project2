const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

let eventSchema = new Schema({
    // schema goes here     // schema goes here                     
	event_ID: {type: String, required: true, unique: true, default: uuid.v1},
	event_name: {type: String, required: true},
	event_description: {type: String, required: true},
	program_type: {type: String, required: true},
	date: {type: Date, required: true},
	workers: [{type: String, default: []}],
	organization_id: {type: String, required: true},
	address: {
        Address: {type: String, required: true},
        City: {type: String, required: true},
        State: {type: String, required: true},
        County: {type: String, required: true},
        zip: {type: String, required: true}
    },
	clients: [{type: String, default: []}],
    },{
        collection: 'event'
});

module.exports = mongoose.model('event', eventSchema)