const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

let organizationSchema = new Schema(
  {
    // schema goes here
    organization_id: {
      type: String,
      required: true,
      unique: true,
      default: uuid.v1,
    },
    organization_name: { type: String, required: true },
    organization_desc: { type: String, required: true },
    Address: {
      Address: { type: String, required: true },
      City: { type: String, required: true },
      State: { type: String, required: true },
      County: { type: String, required: true },
      zip: { type: Number, required: true },
    },
  },
  {
    collection: "organization",
  }
);

module.exports = mongoose.model("organization", organizationSchema);
