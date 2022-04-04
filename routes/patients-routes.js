const express = require("express");

const patientsControllers = require("../controllers/patients-controllers");
const reportUpload = require("../middleware/report-upload");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", patientsControllers.getPatients);

router.get("/:pid", patientsControllers.getPatientById);

router.use(auth);

router.post(
  "/",
  reportUpload.single("report"),
  patientsControllers.createPatient
);

router.patch("/:pid", patientsControllers.updatePatient);
router.delete("/:pid", patientsControllers.deletePatient);

module.exports = router;
