//Middleware for facilitating uploading of medical reports using multer

//imports
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//mime type map
const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

//function to faciliate uploading reports
const reportUpload = multer({
  //set file size limit
  limits: 50000,
  //set the storage to diskstorage, with its destination being uploads/reports
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/reports");
    },
    //set filename to be a randomly generated id with uuid, a . and the extension which is obtained from the mimetype of the file
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
});

//exports
module.exports = reportUpload;
