const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const Patient = require("../models/patient");

let DUMMY_PATIENTS = [
  {
    id: "p1",
    name: "Rafael",
    age: "25",
    status: "Current Patient",
  },
  {
    id: "p2",
    name: "Lisa",
    age: "22",
    status: "Recovered",
  },
  {
    id: "p3",
    name: "Tom",
    age: "19",
    status: "Current Patient",
  },
  {
    id: "p4",
    name: "Tom",
    age: "19",
    status: "Current Patient",
  },
  {
    id: "p5",
    name: "Tom",
    age: "19",
    status: "Current Patient",
  },
  {
    id: "p6",
    name: "Tom",
    age: "19",
    status: "Current Patient",
  },
];

const getPatients = async (req, res, next) => {
  let patients;

  try {
    patients = await Patient.find();
  } catch (err) {
    const error = new HttpError("Could not find patients", 500);
    return next(error);
  }
  res.json({
    patients: patients.map((patient) => patient.toObject({ getters: true })),
  });
};

const getPatientById = async (req, res, next) => {
  const patientId = req.params.pid;

  let patient;

  try {
    patient = await Patient.findById(patientId);
  } catch (err) {
    const error = new HttpError("Could not find patient", 500);
    return next(error);
  }

  if (!patient) {
    return next(new HttpError("Could not find patient", 404));
  }

  //getters:true removes _ from id
  //turn patient from a mongoose object to a default js object for easier management
  res.json({ patient: patient.toObject({ getters: true }) });
};

const createPatient = async (req, res, next) => {
  //const name = req.body.name
  const { name, age, status } = req.body;

  const createdPatient = new Patient({
    name: name,
    age: age,
    status: status,
    image:
      "https://i.ytimg.com/vi/vvvvcpwFw5o/maxresdefault.jpg",
    report:
      "https://i.ytimg.com/vi/vvvvcpwFw5o/maxresdefault.jpg",
  });

  try {
    await createdPatient.save();
  } catch {
    const error = new HttpError("Creating patient failed", 500);
    return next(error);
  }

  res.status(201).json(createdPatient);
};

const updatePatient = async (req, res, next) => {
  //Get values from the request body
  const { name, age, status } = req.body;
  //Get id from url parameter
  const patientId = req.params.pid;

  let patient;

  try {
    patient = await Patient.findById(patientId);
  } catch (err) {
    const error = new HttpError("Could not update patient ", 500);
    return next(error);
  }
  //Update values
  patient.name = name;
  patient.age = age;
  patient.status = status;

  //Store new patient in appropriate index, replacing old patient

  try {
    patient.save();
  } catch (err) {
    const error = new HttpError("Could not update patient ", 500);
    return next(error);
  }

  //Send response
  res.status(200).json({ patient: patient.toObject({ getters: true }) });
};

const deletePatient = async (req, res, next) => {
  const patientId = req.params.pid;

  let place;
  try {
    place = await Patient.findById(patientId);
  } catch (err) {
    const error = new HttpError("Could not delete patient ", 500);
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError("Could not delete patient ", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted place" });
};

exports.getPatients = getPatients;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
