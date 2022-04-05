//This module is responsible for functionality for rooms
//I.e CRUD operations

//Imports
const HttpError = require("../models/http-error");
const Room = require("../models/room");

//Function to get rooms
const getRooms = async (req, res, next) => {
  let rooms;

  //try catch as these can fail
  try {
    //find all rooms in the room document
    rooms = await Room.find();
  } catch (err) {
    //if this fails, throw error with status code inferring internal server error
    const error = new HttpError("Could not find rooms", 500);
    return next(error);
  }
  //if this succeeds, send a response with each room being mapped to an object
  //This mapping is done to convert each room to a native javascript object for easier handling
  //Getters true removes the underscore from the id field
  res.json({ rooms: rooms.map((room) => room.toObject({ getters: true })) });
};

//Function to get a specific room by its id
const getRoomById = async (req, res, next) => {
  //get id from url parameter
  const roomId = req.params.rid;

  let room;
  //try catch as these can fail

  try {
    //find room by the room id
    room = await Room.findById(roomId);
  } catch {
    //if this fails, throw error with status code inferring internal server error
    const error = new HttpError("Could not find room", 500);
    return next(error);
  }
  //if no room exists, return error saying room could not be found
  //404 code means not found
  if (!room) {
    return next(new HttpError("Could not find room", 404));
  }
  //If room is found, the room is sent as a response
  res.json({ room: room.toObject({ getters: true }) });
};

//Function to update a room
const updateRoom = async (req, res, next) => {
  //Get values from the request body
  const { reservations, bedAvailability, roomAvailability } = req.body;

  //Get id from url parameter
  const roomId = req.params.rid;

  let room;

  //try catch as these can fail
  try {
    //find room by id
    room = await Room.findById(roomId);
  } catch (err) {
    //if this fails, throw error with status code inferring internal server error
    const error = new HttpError("Could not update room ", 500);
    return next(error);
  }

  //update values with the request body values
  room.reservations = reservations;
  room.bedAvailability = bedAvailability;
  room.roomAvailability = roomAvailability;

  //attempt to save the updated values 
  try {
    await room.save();
  } catch (err) {
    const error = new HttpError("Could not update room", 500);
    return next(error);
  }

  //send response
  res.status(200).json({ room: room.toObject({ getters: true }) });
};

//Function to delete a room 
const deleteRoom = async (req, res, next) => {
  //get id from url parameters
  const roomId = req.params.rid;

  let room;

  //try catch as these can fail
  try {
    //find room by id
    room = await Room.findById(roomId);
  } catch (err) {
    //error message if no room could found to delete
    const error = new HttpError("Could not delete room ", 500);
    return next(error);
  }

  //attempt to delete room from the document
  try {
    await room.remove();
  } catch (err) {
    //send error message if this fails
    const error = new HttpError("Could not delete patient ", 500);
    return next(error);
  }

  //send response 
  res.status(200).json({ message: "Deleted place" });
};

//exports
exports.getRoomById = getRoomById;
exports.getRooms = getRooms;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
