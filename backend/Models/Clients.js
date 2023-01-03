const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

let clientSchema = new Schema(
  {
    // schema goes here
    client_id: { type: String, required: true, unique: true, default: uuid.v1 },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    middle_name: { type: String, default: null },
    birthday: { type: Date, required: true },
    ssn: { type: String, default: null },
    gender: { type: String, default: null },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    language: { type: String, default: null },
    race: { type: String, default: null},
    is_65_or_older: { type: Boolean, required: true },
    is_veteran: { type: Boolean, required: true },
    highest_education_completed: { type: String, default: null },
    is_Employed: { type: Boolean, required: true },
    drivers_license: { type: String, default: null },
    is_getting_vaccine: { type: Boolean, default: null },
    is_vaccinated: { type: Boolean, default: null },  
    vaccine_preference: { type: String, default: null },
    address: {
      Address: { type: String, default: null },
      City: { type: String, default: null },
      State: { type: String, default: null },
      County: { type: String, default: null },
      zip: { type: Number, default: null },
    },
    modified_at: { type: Date, required: true, default: Date.now },
  },
  {
    collection: "client",
  }
);

module.exports = mongoose.model("client", clientSchema);
