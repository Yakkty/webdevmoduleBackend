//This Section revolves around the apis endpoints for users, namely logging in

//imports
const express = require("express");

const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post("/login", usersControllers.login);

module.exports = router;
