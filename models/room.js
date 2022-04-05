//This model defines the schema for rooms, which defines the room document

//imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//define new room schema with its corresponding properties
const roomSchema = new Schema({
  name: { type: String, required: true },
  floor: { type: String, required: true },
  reservations: { type: String, required: true },
  bedAvailability: { type: Number, required: true },
  roomAvailability: { type: String, required: true },
});

//Export as a model, passing the roomSchema
module.exports = mongoose.model("Room", roomSchema);
