//This section revolves around the api's endpoints for providers

//imports
const express = require("express");

const providersControllers = require("../controllers/providers-controllers");
const auth = require("../middleware/auth");
const fileUpload = require("../middleware/file-upload");

//Creates new router object to handle requests to various endpoints
const router = express.Router();

//Requests to each url are passed their corresponding controllers functions
//i.e requests to /api/providers -> will get all provider data
//requests to /api/rooms/prid -> will revolve around the provider data of a specific provider
router.get("/", providersControllers.getProviders);

router.get("/:prid", providersControllers.getProviderById);

//Auth routing before patch and delete requests as only authenticated users should be able to send http requests
router.use(auth);

router.post(
  "/",
  fileUpload.single("image"),
  providersControllers.createProvider
);

router.patch("/:prid", providersControllers.updateProvider);

router.delete("/:prid", providersControllers.deleteProvider);

module.exports = router;
