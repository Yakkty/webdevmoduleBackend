const HttpError = require("../models/http-error");
const Room = require("../models/room");


const getRooms = async (req, res, next) => {
  let rooms;

  try {
    rooms = await Room.find();
  } catch (err) {
    const error = new HttpError("Could not find rooms", 500);
    return next(error);
  }
  res.json({ rooms: rooms.map((room) => room.toObject({ getters: true })) });
};

const getRoomById = async (req, res, next) => {
  const roomId = req.params.rid;

  let room;
  try {
    room = await Room.findById(roomId);
  } catch {
    const error = new HttpError("Could not find room", 500);
    return next(error);
  }
  if (!room) {
    return next(new HttpError("Could not find room", 404));
  }
  res.json({ room: room.toObject({ getters: true }) });
};

const updateRoom = async (req, res, next) => {
  //Get values from the request body
  const { reservations, bedAvailability, roomAvailability } = req.body;

  //Get id from url parameter
  const roomId = req.params.rid;

  let room;

  try {
    room = await Room.findById(roomId);
  } catch (err) {
    const error = new HttpError("Could not update room ", 500);
    return next(error);
  }

  //update values
  room.reservations = reservations;
  room.bedAvailability = bedAvailability;
  room.roomAvailability = roomAvailability;

  try {
    await room.save();
  } catch (err) {
    const error = new HttpError("Could not update room", 500);
    return next(error);
  }

  //send response
  res.status(200).json({ room: room.toObject({ getters: true }) });
};

const deleteRoom = async (req, res, next) => {
  const roomId = req.params.rid;

  let room;

  try {
    room = await Room.findById(roomId);
  } catch (err) {
    const error = new HttpError("Could not delete room ", 500);
    return next(error);
  }

  try {
    await room.remove();
  } catch (err) {
    const error = new HttpError("Could not delete patient ", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted place" });
};

exports.getRoomById = getRoomById;
exports.getRooms = getRooms;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
