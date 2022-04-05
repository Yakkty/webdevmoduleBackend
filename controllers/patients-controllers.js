//This module is responsible for functionality for patients
//I.e CRUD operations

//Imports
const fs = require("fs");

const HttpError = require("../models/http-error");
const Patient = require("../models/patient");

//Function to get patients
const getPatients = async (req, res, next) => {
  let patients;

  //try catch as these can fail
  try {
    //find all patients in the patient document
    patients = await Patient.find();
  } catch (err) {
    //if this fails, throw error with status code inferring internal server error
    const error = new HttpError("Could not find patients", 500);
    return next(error);
  }
  //if this succeeds, send a response with each patient being mapped to an object
  //This mapping is done to convert each patient to a native javascript object for easier handling
  //Getters true removes the underscore from the id field
  res.json({
    patients: patients.map((patient) => patient.toObject({ getters: true })),
  });
};

//Function to get a specific patient by its id
const getPatientById = async (req, res, next) => {
  //get id from url parameter
  const patientId = req.params.pid;

  let patient;

  //try catch as these can fail
  try {
    //find patient by the room id
    patient = await Patient.findById(patientId);
  } catch (err) {
    //if this fails, throw error with status code inferring internal server error
    const error = new HttpError("Could not find patient", 500);
    return next(error);
  }
  //if no patient exists, return error saying patient could not be found
  //404 code means not found

  if (!patient) {
    return next(new HttpError("Could not find patient", 404));
  }

  //getters:true removes _ from id
  //turn patient from a mongoose object to a default js object for easier management
  res.json({ patient: patient.toObject({ getters: true }) });
};

//Function to create a new patient
const createPatient = async (req, res, next) => {
  //Get values from the request body
  const { name, age, status } = req.body;

  //Create a new CreatedPatient object from the Patient model
  //Values mapped to the request body values
  const createdPatient = new Patient({
    name: name,
    age: age,
    status: status,
    report: req.file.path,
  });

  //attempt to save
  try {
    await createdPatient.save();
  } catch {
    //throw error if fails
    const error = new HttpError("Creating patient failed", 500);
    return next(error);
  }

  //old debugging code
  const reportPath = createdPatient.report;
  console.log(reportPath);

  //send a response with the createdpatient object
  res.status(201).json(createdPatient);
};

//Function to update a patient
const updatePatient = async (req, res, next) => {
  //Get values from the request body
  const { name, age, status } = req.body;
  //Get id from url parameter
  const patientId = req.params.pid;

  let patient;

  //try catch as these can fail
  try {
    //find patient by id
    patient = await Patient.findById(patientId);
  } catch (err) {
    //throw error if no patient found
    const error = new HttpError("Could not update patient ", 500);
    return next(error);
  }

  //Update values
  patient.name = name;
  patient.age = age;
  patient.status = status;

  //save new patient
  try {
    patient.save();
  } catch (err) {
    //throw error if fails
    const error = new HttpError("Could not update patient ", 500);
    return next(error);
  }

  //Send response
  res.status(200).json({ patient: patient.toObject({ getters: true }) });
};

//Function to delete patients
const deletePatient = async (req, res, next) => {
  //get id from url parameter
  const patientId = req.params.pid;

  let patient;
  //try catch as these can fail
  try {
    //find patient by id
    patient = await Patient.findById(patientId);
  } catch (err) {
    //throw error if this fails
    const error = new HttpError("Could not delete patient ", 500);
    return next(error);
  }

  //old debugging variable and console log
  const reportPath = patient.report;

  //attempt to delete patient from database
  try {
    await patient.remove();
  } catch (err) {
    //throw error if fails
    const error = new HttpError("Could not delete patient ", 500);
    return next(error);
  }
  console.log(reportPath);

  //This deletes the report from the server
  fs.unlink(reportPath, (err) => {
    console.log(err);
  });

  //send response
  res.status(200).json({ message: "Deleted place" });
};

//exports
exports.getPatients = getPatients;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
