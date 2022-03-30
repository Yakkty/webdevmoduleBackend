const express = require("express");

const router = express.Router();

router.get("/users", (req, res, next) => {
  console.log("GET REQUEST IN USERS");
  res.json({ message: "It works" });
});

module.exports = router;