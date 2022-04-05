//This section revolves around the api's endpoints for rooms


//imports
const express = require("express");

const roomsControllers = require("../controllers/rooms-controllers");
const auth = require("../middleware/auth");

//Creates new router object to handle requests to various endpoints
const router = express.Router();


//Requests to each url are passed their corresponding controllers functions
//i.e requests to /api/rooms -> will get all room data
//requests to /api/rooms/roomid -> will revolve around the room data of a specific room
router.get("/", roomsControllers.getRooms);

router.get("/:rid", roomsControllers.getRoomById);

//Auth routing before patch and delete requests as only authenticated users should be able to send http requests
router.use(auth);

router.patch("/:rid", roomsControllers.updateRoom);

router.delete("/:rid", roomsControllers.deleteRoom);

module.exports = router;
