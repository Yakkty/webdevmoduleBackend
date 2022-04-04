const express = require("express");

const providersControllers = require("../controllers/providers-controllers");
const router = express.Router();
const auth = require("../middleware/auth");
const fileUpload = require("../middleware/file-upload");

router.get("/", providersControllers.getProviders);

router.get("/:prid", providersControllers.getProviderById);

router.use(auth);

router.post(
  "/",
  fileUpload.single("image"),
  providersControllers.createProvider
);

router.patch("/:prid", providersControllers.updateProvider);

router.delete("/:prid", providersControllers.deleteProvider);

module.exports = router;
