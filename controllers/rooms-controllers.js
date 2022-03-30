const HttpError = require("../models/http-error");

const DUMMY_ROOMS = [
  {
    id: "r1",
    name: "1",
    floor: "0",
    reservations: "Available",
    bedAvailability: "8",
    roomAvailability: "Available",
  },
  {
    id: "r2",
    name: "2",
    floor: "0",
    reservations: "Available",
    bedAvailability: "0",
    roomAvailability: "Unavailable",
  },
  {
    id: "r3",
    name: "3",
    floor: "0",
    reservations: "Reserved",
    bedAvailability: "0",
    roomAvailability: "unAvailable",
  },
  {
    id: "r4",
    name: "4",
    floor: "0",
    reservations: "Available",
    bedAvailability: "05",
    roomAvailability: "unAvailable",
  },
  {
    id: "r5",
    name: "5",
    floor: "0",
    reservations: "Available",
    bedAvailability: "5",
    roomAvailability: "Available",
  },
  {
    id: "r6",
    name: "6",
    floor: "0",
    reservations: "Available",
    bedAvailability: "9",
    roomAvailability: "Available",
  },
];

const getRooms = (req, res, next) => {
  const room = DUMMY_ROOMS;
  res.json({ room: room });
};

const getRoomById = (req, res, next) => {
  const roomId = req.params.rid;
  const room = DUMMY_ROOMS.find((r) => {
    return r.id === roomId;
  });

  if (!room) {
    return next(new HttpError("Could not find room", 404));
  }
  res.json({ room: room });
};

exports.getRoomById = getRoomById;
exports.getRooms = getRooms;
