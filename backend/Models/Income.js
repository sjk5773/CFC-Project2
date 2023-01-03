const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let incomeSchema = new Schema(
  {
    // schema goes here
    client_id: { type: String, required: true },
    is_head_of_household: { type: Boolean, required: true},
    monthly_Income: { type: Number, default: null},
    spousal_Support: { type: Number,default: null },
    work_comp: { type: Number, default: null },
    child_support: { type: Number, default: null },
    tanf: { type: Number, default: null },
    ssi: { type: Number, default: null },
    unemployment: { type: Number, default: null},
    other_Income: { type: Number, default: null },
    modify_At: { type: Date, required: true, default: Date.now },
  },
  {
    collection: "income",
  }
);

module.exports = mongoose.model("income", incomeSchema);
