const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

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

const getProviders = (req, res, next) => {
  const provider = DUMMY_PROVIDERS;
  res.json({ provder: provider });
};

const getProviderById = (req, res, next) => {
  const providerId = req.params.prid;
  const provider = DUMMY_PROVIDERS.find((p) => {
    return p.id === providerId;
  });

  if (!provider) {
    return next(new HttpError("Could not find provider", 404));
  }

  res.json({ provider: provider });
};

const createProvider = (req, res, next) => {
  //const name = req.body.name
  const { name, role, description } = req.body;

  const createdProvider = {
    id: uuidv4(),
    name: name,
    role: role,
    description: description,
  };

  DUMMY_PROVIDERS.push(createdProvider);

  res.status(201).json(createdProvider);
};

exports.getProviders = getProviders;
exports.getProviderById = getProviderById;
exports.createProvider = createProvider;
