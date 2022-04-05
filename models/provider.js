//This model defines the schema for providers, which defines the provider document

//imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//define new provider schema with its corresponding properties
const providerSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

//Export as a model, passing the providerSchema
module.exports = mongoose.model("Provider", providerSchema);