const express = require("express");
const { rules: RegisterRules } = require("../util/validators/register");
const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.route("/").get(usersController.getUsers);

router.route("/signup").post(RegisterRules, usersController.signup);

router.route("/login").post(usersController.login);

module.exports = router;
