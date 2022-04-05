//This is a REST Api backend made using Node.js, Express.js, mongoDB, Mongoose and multer
//Rest apis faciliate HTTP requests like GET, POST, PATCH etc

//imports
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const providersRoutes = require("./routes/providers-routes");
const patientsRoutes = require("./routes/patients-routes");
const roomsRoutes = require("./routes/rooms-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

//Creates express application
const app = express();

//Allows for json parsing
app.use(express.json());

//This statically serves files in the path of /uploads/*, this allows for the frontend to always display images and files stored in the server
app.use("/uploads/", express.static(path.join("uploads")));

//Fix CORS errors, allows any domain to send requests
//This sets the headers that will be accepted on requests, and then proceeds to the rest of the application
//Custom authorization header set to protect http requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//API endpoints - all areas of our website
app.use("/api/providers", providersRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/users", usersRoutes);

//if no endpoint reached, error thrown
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

//Further error handling
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

//Start the application on localhost 5000, and connect to mongo db atlas

mongoose
  .connect(
    "mongodb+srv://jack:jackpassword123@uniwork.lbg0m.mongodb.net/covidclinic?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
