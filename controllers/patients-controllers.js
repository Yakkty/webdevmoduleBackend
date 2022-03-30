const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_PATIENTS = [
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

const getPatients = (req, res, next) => {
  const patient = DUMMY_PATIENTS;
  res.json({ patient: patient });
};

const getPatientById = (req, res, next) => {
  const patientId = req.params.pid;
  const patient = DUMMY_PATIENTS.find((p) => {
    return p.id === patientId;
  });

  if (!patient) {
    return next(new HttpError("Could not find patient", 404));
  }

  res.json({ patient: patient });
};

const createPatient = (req, res, next) => {
  //const name = req.body.name
  const { name, age, status } = req.body;

  const createdPatient = {
    id: uuidv4(),
    name: name,
    age: age,
    status: status,
  };

  DUMMY_PATIENTS.push(createdPatient);

  res.status(201).json(createdPatient);
};

exports.getPatients = getPatients;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
