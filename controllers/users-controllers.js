const HttpError = require("../models/http-error");
const User = require("../models/user");


const getUsers = (req, res, next) => {
  const user = DUMMY_USERS;
  res.json({ user: user });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }

  res.json({ message: "Logged in" });
};

exports.login = login;
exports.getUsers = getUsers;
