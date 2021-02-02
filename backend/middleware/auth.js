const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../util/asyncHandler");
const HttpError = require("../models/http-error");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new HttpError("No authorization token.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id );
    next();
  } catch (e) {
    throw new HttpError("No authorization token.", 401);
  }
});

module.exports = auth;
