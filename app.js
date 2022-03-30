const express = require("express");
// const https = require("https");

const providersRoutes = require("./routes/providers-routes");
const patientsRoutes = require("./routes/patients-routes");
const roomsRoutes = require("./routes/rooms-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/providers", providersRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/providers", usersRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

app.listen(5000);
