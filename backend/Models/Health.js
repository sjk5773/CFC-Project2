const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let healthSchema = new Schema({
    // schema goes here
    client_id: {type: String, required: true, unique: true},
    has_Health_Insurance: {type: Boolean, required: true},
   	has_Food_Stamps: {type: Boolean, required: true},
    food_Stamps_Amount: {type: Number, default: null},
    food_Stamps_Reason: {type: String, default: null},
    modify_At: {type: Date, required: true, default: Date.now},
    },{
        collection: 'health'
});

module.exports = mongoose.model('health', healthSchema);