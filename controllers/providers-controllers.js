//This module is responsible for functionality for patients
//I.e CRUD operations

//Imports
const fs = require("fs");

const HttpError = require("../models/http-error");
const Provider = require("../models/provider");

//Function to get providers
const getProviders = async (req, res, next) => {
  let providers;

  //try catch as these can fail
  try {
    //find all providers in the provider document
    providers = await Provider.find();
  } catch (err) {
    //throw error if this fails
    const error = new HttpError("Could not find providers", 500);
    return next(error);
  }
  //if this succeeds, send response mapping each provider to a default js object
  res.json({
    providers: providers.map((provider) =>
      provider.toObject({ getters: true })
    ),
  });
};

//Function to get a provider by its id
const getProviderById = async (req, res, next) => {
  //get id from url parameter
  const providerId = req.params.prid;

  let provider;

  //try catch as these can fail
  try {
    //find provider by its id
    provider = await Provider.findById(providerId);
  } catch (err) {
    //throw error if it fails
    const error = new HttpError("Could not find provider", 500);
    return next(error);
  }

  //if no providers are found, return error
  if (!provider) {
    return next(new HttpError("Could not find provider", 404));
  }

  //send response with the provider object
  res.json({ provider: provider });
};

//function to create a new provider
const createProvider = async (req, res, next) => {
  //const name = req.body.name
  const { name, role, description } = req.body;

  //Create a new createdprovider object from the provider model
  //Values are mapped to the request body values
  const createdProvider = new Provider({
    name: name,
    role: role,
    description: description,
    image: req.file.path,
  });

  //attempt to save to the database
  try {
    await createdProvider.save();
  } catch {
    //return error if fails
    const error = new HttpError("Creating provider failed", 500);
    return next(error);
  }

  //old debugging variable + log
  const imagePath = createdProvider.image;
  console.log(imagePath);

  //send response with the created provider
  res.status(201).json(createdProvider);
};

//Function to update provider
const updateProvider = async (req, res, next) => {
  //Get values from request body
  const { name, role, description } = req.body;

  //get id from url parameters
  const providerId = req.params.prid;
  let provider;

  //try catch as these can fail
  try {
    //find provider by provider id
    provider = await Provider.findById(providerId);
  } catch (err) {
    const error = new HttpError("Could not update provider ", 500);
    return next(error);
  }

  //update values
  provider.name = name;
  provider.role = role;
  provider.description = description;

  //attempt to save
  try {
    await provider.save();
  } catch (err) {
    //return error if fails
    const error = new HttpError("Could not update provider", 500);
    return next(error);
  }

  //Send response
  res.status(200).json({ provider: provider.toObject({ getters: true }) });
};

//Function to delete a provider
const deleteProvider = async (req, res, next) => {
  //get id from url parameters
  const providerId = req.params.prid;

  let provider;

  //try catch as these can fail
  try {
    //find provider by id
    provider = await Provider.findById(providerId);
  } catch (err) {
    //return error if fails
    const error = new HttpError("Could not delete provider ", 500);
    return next(error);
  }

  //old debugging variable + log
  const imagePath = provider.image;

  //attempt to delete provider from db
  try {
    provider.remove();
  } catch (err) {
    //return error if fails
    const error = new HttpError("Could not delete provider ", 500);
    return next(error);
  }
  //Delete image from the server
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  //send response
  res.status(200).json({ message: "Deleted place" });
};

//exports
exports.getProviders = getProviders;
exports.getProviderById = getProviderById;
exports.createProvider = createProvider;
exports.updateProvider = updateProvider;
exports.deleteProvider = deleteProvider;
