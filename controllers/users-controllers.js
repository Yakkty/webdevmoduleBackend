//This section is centered around logging users in primarily

//imports
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

//production code thats now irrelevant
const getUsers = (req, res, next) => {
  const user = DUMMY_USERS;
  res.json({ user: user });
};

//Login function, async as interactions with the database are typically asynchronous
const login = async (req, res, next) => {
  //Retrieve the username and password from the request body
  const { username, password } = req.body;

  let existingUser;

  //try catch to find a user with a username from the request body matching a username in the database
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    //if fails, create new error with status code of 500, which stands for internal server error
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    //return the error
    return next(error);
  }

  //if the user doesnt exist, or the users password does not match the request bodys password, then an error is returned displaying invalid credentials
  //status code of 401 signals unauthorized
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }

  //try catch for creating a token, and attaching information to the token payload

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        username: existingUser.username,
      },
      //encryption key and expiration date
      "token_login_key",
      { expiresIn: "1h" }
    );
  } catch (err) {
    //if failes throw error with internal server error status code
    const error = new HttpError("Logging in failed credentials", 500);
    return next(error);
  }

  //if this succeeds, a response is sent with the userId, the username and the token
  //access to the token allows for a user to be authorized
  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token,
  });
};

//exports
exports.login = login;
exports.getUsers = getUsers;
