const express = require("express");

const patientsControllers = require("../controllers/patients-controllers");
const reportUpload = require("../middleware/report-upload");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

router.get("/", patientsControllers.getPatients);

router.get("/:pid", patientsControllers.getPatientById);

router.post(
  "/",
  fileUpload.single("report"),
  patientsControllers.createPatient
);

router.patch("/:pid", patientsControllers.updatePatient);
router.delete("/:pid", patientsControllers.deletePatient);

module.exports = router;
