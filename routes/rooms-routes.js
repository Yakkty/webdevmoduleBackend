const express = require("express");

const roomsControllers = require("../controllers/rooms-controllers");
const router = express.Router();


router.get("/", roomsControllers.getRooms);

router.get("/:rid", roomsControllers.getRoomById);

router.patch("/:rid", roomsControllers.updateRoom);

router.delete("/:rid", roomsControllers.deleteRoom);

module.exports = router;
