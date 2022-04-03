const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, required: true },
  report: { type: String, required: true },
});

module.exports = mongoose.model("Patient", patientSchema);
