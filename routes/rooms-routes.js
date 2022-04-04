const express = require("express");

const roomsControllers = require("../controllers/rooms-controllers");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/", roomsControllers.getRooms);

router.get("/:rid", roomsControllers.getRoomById);

router.use(auth);

router.patch("/:rid", roomsControllers.updateRoom);

router.delete("/:rid", roomsControllers.deleteRoom);

module.exports = router;
