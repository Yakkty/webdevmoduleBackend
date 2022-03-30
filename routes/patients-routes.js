const express = require("express");

const patientsControllers = require("../controllers/patients-controllers");
const router = express.Router();

router.get("/", patientsControllers.getPatients);

router.get("/:pid", patientsControllers.getPatientById);

router.post("/", patientsControllers.createPatient);

module.exports = router;
