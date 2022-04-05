//This model defines the schema for patients, which defines the patient document
const mongoose = require("mongoose");

//imports
const Schema = mongoose.Schema;

//define a patient schema with its corresponding properties
const patientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, required: true },
  report: { type: String, required: true },
});

//Export as a model, passing the patientSchema
module.exports = mongoose.model("Patient", patientSchema);
