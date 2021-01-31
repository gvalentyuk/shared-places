const asyncHandler = require("../util/asyncHandler");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const HttpError = require("../models/http-error");

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  return res.json({ users });
});

const signup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError("User whith this email already exist.", 422);
  }

  const createdUser = await User.create({
    name,
    email,
    password,
  });

  const token = createdUser.signJWToken();
  return res.status(201).json({ token });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("password");
  if (!user) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  const token = user.signJWToken();

  return res.json({ token });
});

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
