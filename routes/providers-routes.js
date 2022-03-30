const express = require("express");

const providersControllers = require("../controllers/providers-controllers");
const router = express.Router();

const DUMMY_PROVIDERS = [
  {
    id: "pv1",
    name: "Tom",
    role: "Doctor",
    description: "desc 1",
  },
  {
    id: "pv2",
    name: "Thomas",
    role: "Nurse",
    description: "desc 2",
  },
  {
    id: "pv3",
    name: "Baz",
    role: "Surgeon",
    description: "desc 3",
  },
  {
    id: "pv4",
    name: "Bazo",
    role: "Doctor",
    description: "desc 4",
  },
  {
    id: "pv5",
    name: "Bazo",
    role: "Doctor",
    description: "desc 5",
  },
  {
    id: "pv6",
    name: "Bazo",
    role: "Doctor",
    description: "desc 6",
  },
];

router.get("/", providersControllers.getProviders);

router.get("/:prid", providersControllers.getProviderById);

router.post("/", providersControllers.createProvider);

module.exports = router;
