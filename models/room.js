const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: { type: String, required: true },
  floor: { type: String, required: true },
  reservations: { type: String, required: true },
  bedAvailability: { type: Number, required: true },
  roomAvailability: { type: String, required: true },
});


module.exports = mongoose.model("Room", roomSchema);