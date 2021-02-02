const asyncHandler = require("../util/asyncHandler");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const HttpError = require("../models/http-error");

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().populate("places");
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
    image: req.file.path,
  });
  const token = createdUser.signJWToken();
  return res
    .status(201)
    .json({ name: createdUser.name, id: createdUser.id, token });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
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
  return res.json({ name: user.name, id: user.id, token });
});

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
