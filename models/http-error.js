//Custom http error class to make error messages more informative
//Allowing for a message and a http status code

class HttpError extends Error {
  constructor(message, errorCode) {
    super(); // Call constructor of parent error class
    this.message = message; // Adds message property
    this.code = errorCode; // Adds code property
  }
}

module.exports = HttpError;
