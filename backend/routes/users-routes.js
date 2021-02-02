const express = require("express");
const { rules: RegisterRules } = require("../util/validators/register");
const usersController = require("../controllers/users-controllers");
const fileUpload = require('../middleware/fileUpload');

const router = express.Router();

router.route("/").get(usersController.getUsers);

router.route("/signup").post(fileUpload.single('image'),RegisterRules, usersController.signup);

router.route("/login").post(usersController.login);

module.exports = router;
