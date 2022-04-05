//This model defines the schema for users, which defines the user document

//imports
const mongoose = require("mongoose");

//Create new schema objec
const Schema = mongoose.Schema;

//define a user schema with its corresponding properties
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


//Export as a model, passing the userSchema
module.exports = mongoose.model("User", userSchema);
