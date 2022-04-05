//This section revolves around the api's endpoints for patients


//imports

const express = require("express");

const patientsControllers = require("../controllers/patients-controllers");
const reportUpload = require("../middleware/report-upload");
const auth = require("../middleware/auth");

//Creates new router object to handle requests to various endpoints
const router = express.Router();

//Requests to each url are passed their corresponding controllers functions
//i.e requests to /api/patients -> will get all patients data
//requests to /api/patients/pid -> will revolve around the patient data of a specific patient
router.get("/", patientsControllers.getPatients);

router.get("/:pid", patientsControllers.getPatientById);

//Auth routing before patch and delete requests as only authenticated users should be able to send http requests
router.use(auth);

router.post(
  "/",
  reportUpload.single("report"),
  patientsControllers.createPatient
);

router.patch("/:pid", patientsControllers.updatePatient);
router.delete("/:pid", patientsControllers.deletePatient);

module.exports = router;
