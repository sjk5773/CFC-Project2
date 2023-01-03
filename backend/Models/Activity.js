const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activitySchema = new Schema({
    // schema goes here
    client_id: {type: String, required: true},
    event_id: {type: String, required: true},
    short_notes: {type: String},
    time_spent: {type: Number, required: true},
    },{
        collection: 'activity'
});

module.exports = mongoose.model('activity', activitySchema);