const HttpError = require("../models/http-error");
const Provider = require("../models/provider");


const getProviders = async (req, res, next) => {
  let providers;

  try {
    providers = await Provider.find();
  } catch (err) {
    const error = new HttpError("Could not find providers", 500);
    return next(error);
  }
  res.json({
    providers: providers.map((provider) =>
      provider.toObject({ getters: true })
    ),
  });
};

const getProviderById = async (req, res, next) => {
  const providerId = req.params.prid;

  let provider;

  try {
    provider = await Provider.findById(providerId);
  } catch (err) {
    const error = new HttpError("Could not find provider", 500);
    return next(error);
  }

  if (!provider) {
    return next(new HttpError("Could not find provider", 404));
  }

  res.json({ provider: provider });
};

const createProvider = async (req, res, next) => {
  //const name = req.body.name
  const { name, role, description } = req.body;

  const createdProvider = new Provider({
    name: name,
    role: role,
    description: description,
    image:
      "https://i.ytimg.com/vi/vvvvcpwFw5o/maxresdefault.jpg",
  });

  try {
    await createdProvider.save();
  } catch {
    const error = new HttpError("Creating provider failed", 500);
    return next(error);
  }

  res.status(201).json(createdProvider);
};

const updateProvider = async (req, res, next) => {
  //Get values from request body
  const { name, role, description } = req.body;

  //get id from url parameters
  const providerId = req.params.prid;
  let provider;

  try {
    provider = await Provider.findById(providerId);
  } catch (err) {
    const error = new HttpError("Could not update provider ", 500);
    return next(error);
  }

  //update values
  provider.name = name;
  provider.role = role;
  provider.description = description;

  try {
    await provider.save();
  } catch (err) {
    const error = new HttpError("Could not update provider", 500);
    return next(error);
  }

  //Send response
  res.status(200).json({ provider: provider.toObject({ getters: true }) });
};

const deleteProvider = async (req, res, next) => {
  const providerId = req.params.prid;

  let provider;

  try {
    provider = await Provider.findById(providerId);
  } catch (err) {
    const error = new HttpError("Could not delete provider ", 500);
    return next(error);
  }

  try {
    provider.remove();
  } catch (err) {
    const error = new HttpError("Could not delete provider ", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted place" });
};

exports.getProviders = getProviders;
exports.getProviderById = getProviderById;
exports.createProvider = createProvider;
exports.updateProvider = updateProvider;
exports.deleteProvider = deleteProvider;
