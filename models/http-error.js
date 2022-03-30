class HttpError extends Error {
  constructor(message, errorCode) {
    super(); // Call constructor of parent error class
    this.message = message; // Adds message property
    this.code = errorCode; // Adds code property
  }
}

module.exports = HttpError;
