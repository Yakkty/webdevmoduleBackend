const express = require("express");

const roomsControllers = require("../controllers/rooms-controllers");
const router = express.Router();

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

router.get("/", roomsControllers.getRooms);

router.get("/:rid", roomsControllers.getRoomById);

router.patch("/:rid", roomsControllers.updateRoom);

router.delete("/:rid", roomsControllers.deleteRoom);

module.exports = router;
